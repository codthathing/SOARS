import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { db } from "@/src/lib/db/api";
import type { File, Resource } from "@/src/lib/db/types";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromSession();
    const { id } = await params;

    const fileDetails = await db.get<File>(`/files/${encodeURIComponent(id)}`);

    if (!fileDetails) {
      return NextResponse.json({ error: "PDF not found." }, { status: 404 });
    }

    const uploadDirectory = path.resolve(process.cwd(), "uploads", user.id);

    const filePath = path.resolve(process.cwd(), fileDetails.storage_key);

    if (!filePath.startsWith(uploadDirectory + path.sep)) {
      return NextResponse.json({ error: "Invalid file location." }, { status: 403 });
    }

    const file = await readFile(filePath);

    const download = request.nextUrl.searchParams.get("download") === "1";

    const filename = `${fileDetails.original_filename || "document"}`.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").replace(/[\r\n]/g, "_");

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(file.length),
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("PDF access error:", error);

    return NextResponse.json({ error: "Unable to access this PDF." }, { status: 500 });
  }
}
