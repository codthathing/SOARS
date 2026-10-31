
import "server-only";

import { askGemmaJson } from "@/src/lib/ai/gemma";
import type { Collection } from "@/src/lib/db/types";
import type { LinkMetadata } from "./link-preview";

export interface LinkAnalysis {
  summary: string;
  tags: string[];
  collection: {
    type: "existing" | "new";
    collectionId: string | null;
    title: string;
  };
}

export async function analyzeLink(
  metadata: LinkMetadata,
  collections: Collection[]
): Promise<LinkAnalysis> {
  const collectionList = collections.map((collection) => ({
    id: collection.id,
    title: collection.title,
  }));

  const prompt = `
You are SOARS AI, an assistant that organizes a user's digital library.

Analyze this webpage and return a JSON object.

WEBPAGE INFORMATION:
Title: ${metadata.title}
Description: ${metadata.description}
URL: ${metadata.url}
Hostname: ${metadata.hostname}

USER'S EXISTING COLLECTIONS:
${JSON.stringify(collectionList)}

YOUR TASKS:

1. Write a concise summary of the webpage in 1-3 sentences.
2. Suggest 3-5 relevant, lowercase tags.
3. Choose the most appropriate collection from the user's existing collections.

COLLECTION RULES:
- If an existing collection is suitable, use its exact ID and title.
- Do not invent or modify an existing collection ID.
- If none of the existing collections is suitable, suggest a new collection title.
- New collection titles should be short and reusable, not simply the webpage title.
- Do not create a new collection if an existing one is reasonably suitable.

Return ONLY valid JSON using this structure:

{
  "summary": "A concise summary",
  "tags": ["tag1", "tag2", "tag3"],
  "collection": {
    "type": "existing",
    "collectionId": "existing-collection-id",
    "title": "Existing collection title"
  }
}

For a new collection, use:

{
  "summary": "A concise summary",
  "tags": ["tag1", "tag2", "tag3"],
  "collection": {
    "type": "new",
    "collectionId": null,
    "title": "Suggested collection title"
  }
}
`;

  const result = await askGemmaJson<LinkAnalysis>(prompt);

  if (
    typeof result.summary !== "string" ||
    !Array.isArray(result.tags) ||
    !result.collection ||
    !["existing", "new"].includes(result.collection.type) ||
    typeof result.collection.title !== "string"
  ) {
    throw new Error("Gemma returned an invalid link analysis.");
  }

  const tags = result.tags
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 5);

  if (result.collection.type === "existing") {
    const matchedCollection = collections.find(
      (collection) =>
        collection.id === result.collection.collectionId
    );

    if (!matchedCollection) {
      throw new Error("Gemma selected an invalid collection.");
    }

    return {
      summary: result.summary.trim(),
      tags,
      collection: {
        type: "existing",
        collectionId: matchedCollection.id,
        title: matchedCollection.title,
      },
    };
  }

  return {
    summary: result.summary.trim(),
    tags,
    collection: {
      type: "new",
      collectionId: null,
      title: result.collection.title.trim(),
    },
  };
}
