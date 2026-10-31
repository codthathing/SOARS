import "server-only";

import { askGemmaJson } from "@/src/lib/ai/gemma";
import type { Collection } from "@/src/lib/db/types";

export interface FileAnalysis {
  summary: string;
  tags: string[];
  collection: {
    type: "existing" | "new";
    collectionId: string | null;
    title: string;
  };
}

export async function analyzeFile(
  fileName: string,
  extractedText: string,
  collections: Collection[]
): Promise<FileAnalysis> {
  const prompt = `
You are SOARS AI, an intelligent personal library assistant.

Analyse this uploaded PDF and return valid JSON.

FILE NAME:
${fileName}

PDF CONTENT:
${extractedText.slice(0, 30000)}

USER'S EXISTING COLLECTIONS:
${JSON.stringify(
  collections.map(({ id, title }) => ({ id, title }))
)}

Return this exact JSON structure:
{
  "summary": "A concise summary of the document in 1-3 sentences.",
  "tags": ["tag1", "tag2", "tag3"],
  "collection": {
    "type": "existing or new",
    "collectionId": "existing collection ID or null",
    "title": "The selected or suggested collection title"
  }
}

Rules:
- Generate 3-5 relevant lowercase tags.
- Prefer an existing collection when it is relevant.
- If no existing collection fits, suggest a short new collection title.
- If using an existing collection, use its exact ID and title.
- Do not invent collection IDs.
- Return JSON only.
`;

  const result = await askGemmaJson<FileAnalysis>(prompt);

  if (
    typeof result.summary !== "string" ||
    !Array.isArray(result.tags) ||
    !result.collection ||
    !["existing", "new"].includes(result.collection.type) ||
    typeof result.collection.title !== "string"
  ) {
    throw new Error("Gemma returned an invalid PDF analysis.");
  }

  const selectedCollection =
    result.collection.type === "existing"
      ? collections.find(
          (collection) => collection.id === result.collection.collectionId
        )
      : undefined;

  if (result.collection.type === "existing" && !selectedCollection) {
    throw new Error("Gemma selected an invalid collection.");
  }

  return {
    summary: result.summary,
    tags: [...new Set(
      result.tags
        .filter((tag): tag is string => typeof tag === "string")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    )].slice(0, 5),
    collection: selectedCollection
      ? {
          type: "existing",
          collectionId: selectedCollection.id,
          title: selectedCollection.title,
        }
      : {
          type: "new",
          collectionId: null,
          title: result.collection.title.trim(),
        },
  };
}