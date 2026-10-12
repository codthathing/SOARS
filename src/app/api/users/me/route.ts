import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { findUserByEmail, findUserById, toPublicUser } from "@/src/lib/users";

export const GET = async () => {
  const userId = (await cookies()).get("USER_ID")?.value;
  if (!userId) return Response.json({ error: "Not signed in" }, { status: 401 });

  const user = await findUserById(userId);
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  return Response.json(toPublicUser(user));
};

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  const user = await findUserByEmail(email);

  if (!user) return Response.json({ error: "User not found! Create an account" }, { status: 404 });

  if (password !== undefined) {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return Response.json({ error: "Wrong password!" }, { status: 401 });

    (await cookies()).set("USER_ID", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return Response.json({ success: "User exists!" });
};