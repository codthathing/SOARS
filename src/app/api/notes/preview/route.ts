import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { db } from "@/src/lib/db/api";
import type { Collection } from "@/src/lib/db/types";
import { ai } from "@/src/lib/ai";

export const runtime = "nodejs";

interface NoteAnalysis {
  summary: string;
  title: string;
  tags: string[];
  collection: {
    type: "existing" | "new";
    collectionId: string | null;
    title: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession();
    const body = await request.json();

    const title = typeof body.title === "string" ? body.title.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";

    if (!content) {
      return NextResponse.json({ error: "Please provide note content." }, { status: 400 });
    }

    if (content.length > 30000) {
      return NextResponse.json({ error: "Your note is too long. Please keep it under 30,000 characters." }, { status: 400 });
    }

    const collections = await db.get<Collection[]>(`/collections?u_id=${encodeURIComponent(user.id)}`);

    const prompt = `
      You are SOARS AI, an intelligent personal library assistant.

      Analyse the user's note and return valid JSON.

      NOTE TITLE: ${title || "Untitled Note"}

      NOTE CONTENT:
      ${content}

      USER'S EXISTING COLLECTIONS:
      ${JSON.stringify(collections.map(({ id, title }) => ({ id, title })))}

      Return exactly this JSON structure:
      {
        "summary": "A concise summary of the note in 1-3 sentences.",
        "title": "A concise, descriptive title that captures the main subject of the note.",
        "tags": ["tag1", "tag2", "tag3"],
        "collection": {
          "type": "existing or new",
          "collectionId": "an existing collection ID or null",
          "title": "the selected or suggested collection title"
        }
      }

      TITLE:
      - Generate a title based on the actual content of the note.
      - If a meaningful title is already provided, retain it unless it is misleading or too vague.
      - If the title is empty, generic, or "Untitled Note", generate a suitable title from the content.
      - Keep the title concise, descriptive, and easy to recognize.
      - Do not use generic titles such as "Personal Note" or "My Thoughts" unless they accurately describe the content.

      Rules:
      - Generate 3-5 relevant lowercase tags.
      - Prefer an existing collection when it is relevant.
      - If selecting an existing collection, use its exact ID and title.
      - Never invent a collection ID.
      - If no existing collection is suitable, suggest a new collection.
      - Return JSON only.
    `;

    const analysis = await ai.generateJSON<NoteAnalysis>(prompt);

    if (!analysis || typeof analysis.summary !== "string" || !Array.isArray(analysis.tags) || !analysis.collection || !["existing", "new"].includes(analysis.collection.type) || typeof analysis.collection.title !== "string") {
      throw new Error("Gemma returned an invalid note analysis.");
    }

    const selectedCollection = analysis.collection.type === "existing" ? collections.find((collection) => collection.id === analysis.collection.collectionId) : undefined;

    if (analysis.collection.type === "existing" && !selectedCollection) {
      throw new Error("Gemma selected a collection that does not exist.");
    }

    const cleanedTags = [...new Set(analysis.tags.filter((tag): tag is string => typeof tag === "string").map((tag) => tag.trim().toLowerCase()).filter(Boolean))].slice(0, 5);

    const slug = (title || analysis.title.trim()).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

    return NextResponse.json({
      success: true,
      analysis: {
        summary: analysis.summary.trim(),
        tags: cleanedTags,
        collection: selectedCollection ? { type: "existing", collectionId: selectedCollection.id, title: selectedCollection.title } : { type: "new", collectionId: null, title: analysis.collection.title.trim() },
      },
      userTitle: title,
      note: { content, title: analysis.title.trim(), slug },
    });
  } catch (error) {
    console.error("Note preview error:", error);

    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to analyse your note." }, { status: 500 });
  }
}
