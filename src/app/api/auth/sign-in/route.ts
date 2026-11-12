import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { authenticateUser } from "@/src/lib/auth/api";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    const user = await authenticateUser(email);

    if (!user) return NextResponse.json({ error: "Wrong user email or password!" }, { status: 404 });

    if (password) {
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) return NextResponse.json({ error: "Wrong user email or password!" }, { status: 401 });

      (await cookies()).set("USER_ID", user.id, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    } else {
      (await cookies()).set("RESET_PASSWORD_USER_ID", user.id, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    }

    return NextResponse.json({ success: true, message: "User exists!" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Something went wrong. Please try again." }, { status: 409 });
  }
};