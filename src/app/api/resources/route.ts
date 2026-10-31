
import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { db } from "@/src/lib/db/api";
import type { Collection, Resource, Tag } from "@/src/lib/db/types";
import { stat } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";

interface SaveResourceBody {
  type: "link" | "file" | "note";
  url?: string;
  title: string;
  summary: string;
  text?: string;
  tags: string[];
  collection?: {
    type: "existing" | "new" | "default";
    collectionId: string | null;
    title: string;
  };
  collectionId?: string | null;
  metadata?: {
    hostname?: string;
    description?: string;
    image?: string;
    favicon?: string;
  };
  file?: {
    id: string;
    name: string;
    size: number;
    text: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession();
    const body = (await request.json()) as SaveResourceBody;

    // Validate common resource fields.
    if (
      !["link", "file", "note"].includes(body.type) ||
      typeof body.title !== "string" ||
      !body.title.trim() ||
      typeof body.summary !== "string" ||
      !Array.isArray(body.tags)
    ) {
      return NextResponse.json(
        { error: "Please provide valid resource details." },
        { status: 400 }
      );
    }

    // Validate link-specific fields.
    if (
      body.type === "link" &&
      (typeof body.url !== "string" || !body.metadata?.hostname)
    ) {
      return NextResponse.json(
        { error: "Please provide valid link details." },
        { status: 400 }
      );
    }

    // Validate note-specific fields.
    if (
      body.type === "note" &&
      (typeof body.text !== "string" || !body.text.trim())
    ) {
      return NextResponse.json(
        { error: "Please provide valid note content." },
        { status: 400 }
      );
    }

    // Validate uploaded PDF and verify its stored location.
    let storagePath: string | undefined;

    if (body.type === "file") {
      if (
        !body.file ||
        typeof body.file.id !== "string" ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          body.file.id
        ) ||
        typeof body.file.name !== "string" ||
        typeof body.file.size !== "number" ||
        typeof body.file.text !== "string"
      ) {
        return NextResponse.json(
          { error: "Please provide valid PDF details." },
          { status: 400 }
        );
      }

      const absolutePath = path.resolve(
        process.cwd(),
        "uploads",
        user.id,
        `${body.file.id}.pdf`
      );

      const uploadDirectory = path.resolve(
        process.cwd(),
        "uploads",
        user.id
      );

      if (!absolutePath.startsWith(uploadDirectory + path.sep)) {
        return NextResponse.json(
          { error: "Invalid file location." },
          { status: 400 }
        );
      }

      const fileStats = await stat(absolutePath);

      if (!fileStats.isFile() || fileStats.size !== body.file.size) {
        return NextResponse.json(
          { error: "The uploaded PDF could not be verified." },
          { status: 400 }
        );
      }

      storagePath = `uploads/${user.id}/${body.file.id}.pdf`;
    }

    // Fetch this user's collections and tags.
    const [collections, existingTags] = await Promise.all([
      db.get<Collection[]>(
        `/collections?u_id=${encodeURIComponent(user.id)}`
      ),
      db.get<Tag[]>(`/tags?u_id=${encodeURIComponent(user.id)}`),
    ]);

    // Resolve the collection selection.
    let collection: Collection | undefined;

    if (body.collection?.type === "existing") {
      collection = collections.find(
        (item) => item.id === body.collection?.collectionId
      );

      if (!collection) {
        return NextResponse.json(
          { error: "The selected collection does not exist." },
          { status: 400 }
        );
      }
    } else if (body.collectionId) {
      collection = collections.find(
        (item) => item.id === body.collectionId
      );

      if (!collection) {
        return NextResponse.json(
          { error: "The selected collection does not exist." },
          { status: 400 }
        );
      }
    } else {
      const collectionTitle =
        body.collection?.type === "new"
          ? body.collection.title.trim()
          : "All resources";

      if (!collectionTitle) {
        return NextResponse.json(
          { error: "Please provide a collection name." },
          { status: 400 }
        );
      }

      // Reuse an existing collection with the same name.
      collection = collections.find(
        (item) =>
          item.title.toLowerCase() === collectionTitle.toLowerCase()
      );

      // Create it only when necessary.
      if (!collection) {
        collection = await db.post<Collection>("/collections", {
          id: crypto.randomUUID(),
          u_id: user.id,
          title: collectionTitle,
          created_at: new Date().toISOString(),
        });
      }
    }

    // Remove duplicate and empty tags.
    const uniqueTagNames = [
      ...new Set(
        body.tags
          .filter((tag) => typeof tag === "string")
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean)
      ),
    ];

    // Reuse existing tags or create new ones.
    const savedTags: Tag[] = [];

    for (const tagName of uniqueTagNames) {
      let tag = existingTags.find(
        (item) => item.text.toLowerCase() === tagName
      );

      if (!tag) {
        tag = await db.post<Tag>("/tags", {
          id: crypto.randomUUID(),
          u_id: user.id,
          text: tagName,
          created_at: new Date().toISOString(),
        });

        existingTags.push(tag);
      }

      savedTags.push(tag);
    }

    // Save the resource.
    const now = new Date().toISOString();

    const resourceData: Omit<Resource, "id"> & { id: string } = {
      id: crypto.randomUUID(),
      u_id: user.id,
      collection_id: collection.id,
      type: body.type,
      title: body.title.trim(),
      summary: body.summary.trim(),
      tags: savedTags.map((tag) => tag.id),
      created_at: now,
      updated_at: now,

      ...(body.type === "link" && {
        url: body.url,
        hostname: body.metadata?.hostname || "",
        description: body.metadata?.description || "",
        image: body.metadata?.image || "",
        favicon: body.metadata?.favicon || "",
      }),

      ...(body.type === "file" && {
        data: storagePath,
        size: body.file?.size,
        text: body.file?.text,
      }),

      ...(body.type === "note" && {
        text: body.text,
      }),
    };

    const resource = await db.post<Resource>(
      "/resources",
      resourceData
    );

    return NextResponse.json(
      {
        success: true,
        message: "Resource saved successfully.",
        resource: {
          ...resource,
          tagNames: savedTags.map((tag) => tag.text),
        },
        collection,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save resource error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save resource.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getUserFromSession();

    const [resources, tags, collections] = await Promise.all([
      db.get<Resource[]>(
        `/resources?u_id=${encodeURIComponent(user.id)}`
      ),
      db.get<Tag[]>(`/tags?u_id=${encodeURIComponent(user.id)}`),
      db.get<Collection[]>(
        `/collections?u_id=${encodeURIComponent(user.id)}`
      ),
    ]);

    const formattedResources = resources.map((resource) => ({
      ...resource,
      tagIds: resource.tags,
      tags: resource.tags
        .map((tagId) => tags.find((tag) => tag.id === tagId)?.text)
        .filter((tag): tag is string => Boolean(tag)),
    }));

    return NextResponse.json({
      success: true,
      resources: formattedResources,
      collections,
    });
  } catch (error) {
    console.error("Fetch resources error:", error);

    return NextResponse.json(
      { error: "Unable to fetch your resources." },
      { status: 500 }
    );
  }
}
