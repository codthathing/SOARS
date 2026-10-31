import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { extractPdfText } from "@/src/lib/services/pdf-extractor";
import { analyzeFile } from "@/src/lib/services/analyze-file";
import { db } from "@/src/lib/db/api";
import type { Collection } from "@/src/lib/db/types";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  let filePath: string | undefined;

  try {
    const user = await getUserFromSession();
    const formData = await request.formData();

    const file = formData.get("file");
    const userTitle = formData.get("title");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select a PDF file." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "PDF must be between 1 byte and 5MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.subarray(0, 5).toString() !== "%PDF-") {
      return NextResponse.json(
        { error: "Invalid PDF file." },
        { status: 400 }
      );
    }

    const fileId = crypto.randomUUID();
    const directory = path.join(process.cwd(), "uploads", user.id);

    await mkdir(directory, { recursive: true });

    filePath = path.join(directory, `${fileId}.pdf`);

    await writeFile(filePath, buffer, { flag: "wx" });

    const extractedText = await extractPdfText(buffer);

    const collections = await db.get<Collection[]>(
      `/collections?u_id=${encodeURIComponent(user.id)}`
    );

    const analysis = await analyzeFile(
      file.name,
      extractedText,
      collections
    );

    return NextResponse.json({
      success: true,
      file: {
        id: fileId,
        name: file.name,
        size: file.size,
        storagePath: `uploads/${user.id}/${fileId}.pdf`,
        text: extractedText.slice(0, 60000),
        extractedTextLength: extractedText.length,
      },
      analysis,
      collections,
      userTitle:
        typeof userTitle === "string" ? userTitle.trim() : "",
    });
  } catch (error) {
    if (filePath) {
      await unlink(filePath).catch(() => {});
    }

    console.error("PDF upload error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to process PDF.",
      },
      { status: 500 }
    );
  }
}