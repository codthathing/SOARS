import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { getLinkMetadata } from "@/src/lib/services/link-preview";
import { analyzeLink } from "@/src/lib/services/analyze-link";
import { db } from "@/src/lib/db/api";
import type { Collection } from "@/src/lib/db/types";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession();

    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Please provide a valid URL." }, { status: 400 });
    }

    const normalizedUrl = /^https?:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`;

    // 1. Fetch actual webpage metadata.
    const metadata = await getLinkMetadata(normalizedUrl);

    // 2. Fetch only this user's collections.
    const collections = await db.get<Collection[]>(`/collections?u_id=${encodeURIComponent(user.id)}`);

    // 3. Let Gemma analyse the webpage.
    const analysis = await analyzeLink(metadata, collections);

    // return NextResponse.json({
    //   success: true,
    //   metadata,
    //   analysis,
    // });

    return NextResponse.json({
      success: true,
      metadata,
      analysis,
      collections,
    });
  } catch (error) {
    console.error("Link preview error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to generate link preview.",
      },
      { status: 500 },
    );
  }
}
