import { db } from "@/src/lib/db/api";
import { getUserFromSession } from "@/src/utils/getUserFromSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getUserFromSession();
  const { title } = await request.json();

  if (!title) return NextResponse.json({ error: "Kindly input a valid title" }, { status: 401 });

  const collection = await db.post("/collections", { id: crypto.randomUUID(), u_id: user.id, title, created_at: new Date().toISOString() });

  return NextResponse.json({ success: true, collection }, { status: 201 });
}