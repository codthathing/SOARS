import { NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { ai } from "@/src/lib/ai";

export const runtime = "nodejs";

export async function GET() {
  try {
    await getUserFromSession();

    const result = await ai.generateText("You are the AI assistant for SOARS, a personal digital library. " + "Suggest five relevant tags for a tutorial about React hooks. " + "Return only the five tags, separated by commas.");

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("AI provider test error: ", error);

    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to communicate with AI provider." }, { status: 500 });
  }
}
