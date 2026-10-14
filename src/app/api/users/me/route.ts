import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { findUserByEmail } from "@/src/lib/users";

export const POST = async (request: NextRequest) => {
console.log("sign-in route hit");

  try {
    const { email, password } = await request.json();

    const user = await findUserByEmail(email);
    if (!user) return Response.json({ error: "Wrong user email or password!" }, { status: 404 });

    if (password !== undefined) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return Response.json({ error: "Wrong user email or password!" }, { status: 401 });

      (await cookies()).set("USER_ID", user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return Response.json({ success: "User exists!" });
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
};