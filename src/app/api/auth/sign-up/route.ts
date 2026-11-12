import { createUser } from "@/src/lib/auth/api";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(name, email, hashedPassword);

    return NextResponse.json({ success: true, message: "Account created successfully.", user: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Something went wrong. Please try again." }, { status: 409 });
  }
}
