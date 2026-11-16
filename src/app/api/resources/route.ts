import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { db } from "@/src/lib/db/api";
import type { Collection, File, Link, Note, Resource, ResourceTag, Tag } from "@/src/lib/db/types";
import { stat } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { getUserDetails } from "@/src/utils/getUserDetails";

export const runtime = "nodejs";

interface SaveResourceBody {
  type: "link" | "file" | "note";
  title: string;
  summary: string;
  tags: string[];
  collection?: {
    type: "existing" | "new" | "default";
    collectionId: string | null;
    title: string;
  };
  collectionId?: string | null;
  metadata?: {
    hostname: string;
    description: string;
    image: string;
    favicon: string;
    url: string;
  };
  file?: {
    id: string;
    original_filename: string;
    mime_type: string;
    checksum: string;
    size_bytes: number;
    text: string;
  };
  note?: {
    content: string;
    slug: string;
  }
}


export async function POST(request: NextRequest) {
  let created: string[] = [];

  try {
    const user = await getUserFromSession();
    const body = (await request.json()) as SaveResourceBody;

    if (!["link", "file", "note"].includes(body.type) || typeof body.title !== "string" || !body.title.trim() || typeof body.summary !== "string" || !Array.isArray(body.tags)) {
      return NextResponse.json({ error: "Please provide valid resource details." }, { status: 400 });
    }

    if (body.type === "link" && (typeof body.metadata?.url !== "string" || !body.metadata?.hostname)) {
      return NextResponse.json({ error: "Please provide valid link details." }, { status: 400 });
    }

    if (body.type === "note" && (typeof body.note?.content !== "string" || !body.note?.content.trim())) {
      return NextResponse.json({ error: "Please provide valid note content." }, { status: 400 });
    }


    let storagePath: string | undefined;

    if (body.type === "file") {
      if (!body.file || typeof body.file.id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(body.file.id) || typeof body.file.original_filename !== "string" || typeof body.file.size_bytes !== "number" || typeof body.file.text !== "string") {
        return NextResponse.json({ error: "Please provide valid PDF details." }, { status: 400 });
      }

      const absolutePath = path.resolve(process.cwd(), "uploads", user.id, `${body.file.id}.pdf`);

      const uploadDirectory = path.resolve(process.cwd(), "uploads", user.id);

      if (!absolutePath.startsWith(uploadDirectory + path.sep)) return NextResponse.json({ error: "Invalid file location." }, { status: 400 });

      const fileStats = await stat(absolutePath);

      if (!fileStats.isFile() || fileStats.size !== body.file.size_bytes) return NextResponse.json({ error: "The uploaded PDF could not be verified." }, { status: 400 });

      storagePath = `uploads/${user.id}/${body.file.id}.pdf`;
    }


    const [collections, existingTags] = await Promise.all([db.get<Collection[]>(`/collections?u_id=${encodeURIComponent(user.id)}`), db.get<Tag[]>(`/tags?u_id=${encodeURIComponent(user.id)}`)]);
    let collection: Collection | undefined;
    let newCollection: Collection | undefined;

    if (body.collection?.type === "existing") {
      collection = collections.find((item) => item.id === body.collection?.collectionId);

      if (!collection) return NextResponse.json({ error: "The selected collection does not exist." }, { status: 400 });
    } else if (body.collectionId) {
      collection = collections.find((item) => item.id === body.collectionId);
 
      if (!collection)  return NextResponse.json({ error: "The selected collection does not exist." }, { status: 400 });
    } else {
      const collectionTitle = body.collection?.type === "new" ? body.collection.title.trim() : "All resources";

      if (!collectionTitle) return NextResponse.json({ error: "Please provide a collection name." }, { status: 400 });

      // Reuse an existing collection with the same name.
      collection = collections.find((item) => item.title.toLowerCase() === collectionTitle.toLowerCase());

      if (!collection) {
        collection = await db.post<Collection>("/collections", {
          id: crypto.randomUUID(),
          u_id: user.id,
          title: collectionTitle,
          created_at: new Date().toISOString(),
        });
        created.push(`/collections/${collection.id}`);

        newCollection = collection;
      }
    }


    const resourceId: string = crypto.randomUUID();
    const now: string = new Date().toISOString();  

    const resourceData = { id: resourceId, u_id: user.id, collection_id: collection.id, type: body.type, title: body.title.trim(), summary: body.summary, created_at: now, updated_at: now } as Resource;
    const resource = await db.post<Resource>("/resources", resourceData);
    created.push(`/resources/${resource.id}`);


    let resourceType: File | Note | Link;

    if (body.type === "file") {      
      resourceType = { id: resourceId, original_filename: body.file?.original_filename, storage_key: storagePath, mime_type: body.file?.mime_type, size_bytes: body.file?.size_bytes, checksum: body.file?.checksum, text: body.file?.text } as File;
  
      await db.post<File>("/files", resourceType);
      created.push(`/files/${resourceType.id}`);
    } else if (body.type === "link") {      
      resourceType = { id: resourceId, url: body.metadata?.url, hostname: body.metadata?.hostname, description: body.metadata?.description, image: body.metadata?.image, favicon: body.metadata?.favicon } as Link;
  
      await db.post<Link>("/links", resourceType);
      created.push(`/links/${resourceType.id}`);
    } else if (body.type === "note") {      
      resourceType = { id: resourceId, slug: body.note?.slug, content: body.note?.content } as Note;
  
      await db.post<Note>("/notes", resourceType);
      created.push(`/notes/${resourceType.id}`);
    } else {
        return NextResponse.json({ success: false, message: "Invalid resource type." }, { status: 400 });
    }


    const uniqueTagNames = [...new Set(body.tags.filter((tag) => typeof tag === "string").map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
    const newTags: Tag[] = [];

    for (const tagName of uniqueTagNames) {
      let tag = existingTags.find((item) => item.text.toLowerCase() === tagName.toLowerCase());

      if (!tag) {
        tag = await db.post<Tag>("/tags", { id: crypto.randomUUID(), u_id: user.id, text: tagName, created_at: new Date().toISOString() });

        newTags.push(tag);
      }

      const resourceTag = await db.post<ResourceTag>("/resource_tags", { id: crypto.randomUUID(), resource_id: resourceId, tag_id: tag.id });
      created.push(`/resource_tags/${resourceTag.id}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Resource saved successfully.",
        resource: {
          ...resource,
          ...resourceType,
          tags: uniqueTagNames,
        },
        newTags,
        newCollection,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Save resource error:", error);

    for (const path of created.reverse()) {
      try {
        await db.delete(path);
      } catch (cleanupError) {
        console.error("Rollback failed for", path, cleanupError);
      }
    }

    return NextResponse.json({error: error instanceof Error ? error.message : "Unable to save resource."}, { status: 500 });
  } finally {
    created = [];
  }
}
