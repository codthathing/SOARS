
import { NextResponse } from "next/server";
import { askGemma } from "@/src/lib/ai/gemma";
import { getUserFromSession } from "@/src/utils/getUserFromSession";

export const runtime = "nodejs";

export async function GET() {
  try {
    await getUserFromSession();

    const result = await askGemma(
      "You are the AI assistant for SOARS, a personal digital library. " +
      "Suggest five relevant tags for a tutorial about React hooks. " +
      "Return only the five tags, separated by commas."
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Gemma test error:", error);

    return NextResponse.json(
      { error: "Unable to communicate with Gemma." },
      { status: 500 }
    );
  }
}
