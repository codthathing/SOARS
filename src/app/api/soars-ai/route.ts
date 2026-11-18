import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { fetchResources } from "@/src/lib/services/fetch-resources";
import { ai } from "@/src/lib/ai";

export const runtime = "nodejs";

interface AIResult {
  answer: string;
  matches: {
    resourceId: string;
    reason: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession();
    const body = await request.json();

    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt)  return NextResponse.json({ error: "Please enter a question." }, { status: 400 });

    if (prompt.length > 2000) return NextResponse.json({ error: "Your prompt is too long." }, { status: 400 });

    const {resources, collections, tags} = await fetchResources(user.id);

    const resourceContext = resources.map((resource) => {
      const collection = collections.find((item) => item.id === resource.collection_id);

      return {
        id: resource.id,
        type: resource.type,
        title: resource.title,
        summary: resource.summary,
        tags: resource.tags,
        collection: collection?.title || "All resources",

        // Link-specific field details
        url: resource.type === "link" ? resource.url : undefined,
        description: resource?.description || "",

        // File-specific field details
        text: resource?.text || "",

        // Note-specific field details
        content: resource?.content || "",
      };
    });

    if (resourceContext.length === 0) {
      return NextResponse.json({ success: true, answer: "You haven't saved any resources yet. Start adding links, files and notes to your SOARS library, and I'll help you find them.", resources: [] });
    }

    const aiPrompt = `
      You are SOARS AI, an intelligent assistant for a user's personal digital library.

      Your job is to understand the user's question and find relevant resources from their library.

      USER QUESTION:
      ${prompt}

      USER'S COLLECTIONS:
      ${JSON.stringify(collections.map((item) => item.title))}

      AVAILABLE RESOURCES:
      ${JSON.stringify(resourceContext)}

      Return valid JSON using exactly this structure:
      {
        "answer": "A natural, concise response to the user's question.",
        "matches": [
          {
            "resourceId": "exact resource ID from the available resources",
            "reason": "A short explanation of why this resource is relevant."
          }
        ]
      }

      IMPORTANT RULES:
      - Only select resources that genuinely match the user's question.
      - Use exact resource IDs from the provided resources.
      - Never invent resource IDs, titles, links, or content.
      - Consider titles, summaries, tags, collection names and available content.
      - Return the most relevant resources first.
      - Return a maximum of 10 matches.
      - If nothing matches, return an empty matches array and explain that no relevant resources were found.
      - Do not include resources simply because they share one unrelated keyword.
      - Return JSON only.
    `;

    const aiResult = await ai.generateJSON<AIResult>(aiPrompt);

    if (!aiResult || typeof aiResult.answer !== "string" || !Array.isArray(aiResult.matches)) {
      throw new Error("SOARS AI returned an invalid response.");
    }

    const matchedResources = aiResult.matches.filter((match) => match && typeof match.resourceId === "string" && typeof match.reason === "string").slice(0, 10).map((match) => {
      const resource = resources.find((item) => item.id === match.resourceId);

      if (!resource) return null;

      const collection = collections.find((item) => item.id === resource.collection_id);

      return {
        id: resource.id,
        type: resource.type,
        title: resource.title,
        summary: resource.summary,
        tags: resource.tags,
        collection: collection?.title || "All resources",
        reason: match.reason,
        url: resource.type === "link" ? resource.url : undefined,
        viewUrl: resource.type === "file" ? `/api/resources/${resource.id}/file` : resource.type === "note" ? `/resources/${resource.id}` : undefined,
        downloadUrl: resource.type === "file" ? `/api/resources/${resource.id}/file?download=1` : undefined,
      };
    }).filter((resource) => resource !== null);

    return NextResponse.json({ success: true, answer: aiResult.answer, resources: matchedResources });
  } catch (error) {
    console.error("SOARS AI error:", error);

    return NextResponse.json({ error: error instanceof Error ? error.message : "SOARS AI could not process your request." }, { status: 500 });
  }
}
