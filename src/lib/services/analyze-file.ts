import "server-only";
import { askGemmaJson } from "@/src/lib/ai/gemma";
import type { Collection } from "@/src/lib/db/types";

export interface FileAnalysis {
  summary: string;
  tags: string[];
  title: string;
  collection: {
    type: "existing" | "new";
    collectionId: string | null;
    title: string;
  };
}

export async function analyzeFile(fileName: string, extractedText: string, collections: Collection[]): Promise<FileAnalysis> {
  const prompt = `
    You are SOARS AI, an intelligent personal library assistant.

    Analyse the uploaded PDF document and return a valid JSON response.

    FILE NAME:
    ${fileName}

    PDF CONTENT:
    ${extractedText.slice(0, 30000)}

    USER'S EXISTING COLLECTIONS:
    ${JSON.stringify(collections.map(({ id, title }) => ({ id, title })))}

    Return exactly this JSON structure:
    {
      "summary": "A concise summary of the document in 1-3 sentences.",
      "title": "A clear, concise, human-readable title for the document.",
      "tags": ["tag1", "tag2", "tag3"],
      "collection": {
        "type": "existing or new",
        "collectionId": "Existing collection ID or null",
        "title": "The selected or suggested collection title"
      }
    }

    RULES:

    TITLE:
    - Use the original filename as the starting point for the title.
    - Remove the file extension.
    - Replace underscores, hyphens, and unnecessary special characters with spaces.
    - Capitalize the title appropriately.
    - Use the PDF content to understand what the document is about.
    - If the cleaned filename accurately describes the document, retain it.
    - Otherwise, make minor adjustments to better reflect the document's actual content.
    - Keep the title concise, descriptive, and easy to recognize.
    - Do not use generic titles such as "PDF Document" or "Uploaded File".

    SUMMARY:
    - Summarize the document's main subject and key information.
    - Keep it concise and informative, using 1-3 sentences.
    - Do not include information that is not supported by the document.

    TAGS:
    - Generate 3-5 relevant tags.
    - Use lowercase text.
    - Prefer short, descriptive keywords.
    - Avoid duplicate or overly generic tags.

    COLLECTION:
    - Examine the user's existing collections before suggesting a new one.
    - Prefer an existing collection if its purpose is relevant to the document.
    - If using an existing collection, return its exact ID and title.
    - If no existing collection is suitable, suggest a short, meaningful collection title.
    - When suggesting a new collection, set "type" to "new" and "collectionId" to null.
    - When selecting an existing collection, set "type" to "existing".
    - Never invent collection IDs.

    OUTPUT:
    - Return valid JSON only.
    - Do not include Markdown code fences, explanations, or additional text.
    - Ensure all required properties are present.
  `;


  const result = await askGemmaJson<FileAnalysis>(prompt);

  if (typeof result.summary !== "string" || !Array.isArray(result.tags) || !result.collection || !["existing", "new"].includes(result.collection.type) || typeof result.collection.title !== "string") {
    throw new Error("Gemma returned an invalid PDF analysis.");
  }

  const selectedCollection = result.collection.type === "existing" ? collections.find((collection) => collection.id === result.collection.collectionId) : undefined;

  if (result.collection.type === "existing" && !selectedCollection) {
    throw new Error("Gemma selected an invalid collection.");
  }

  return {
    summary: result.summary,
    title: result.title,
    tags: [...new Set(
      result.tags
        .filter((tag): tag is string => typeof tag === "string")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
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
