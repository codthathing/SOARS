// import { NextRequest } from "next/server";
// import bcrypt from "bcrypt";
// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const GET = async () => {
//   const cookieStore = await cookies();
//   let userID = cookieStore.get("USER_ID")?.value;

//   if (!userID) return Response.json({ error: "Not signed in" }, { status: 401 });

//   const res = await fetch(`${BASE_URL}/users/${userID}`);

//   if (!res.ok) return Response.json({ error: "User not found" }, { status: 404 });

//   const user = await res.json();
//   const { password: _, ...safeUser } = user;

//   return Response.json(safeUser);
// };

// export const POST = async (request: NextRequest) => {
//   const { email, password } = await request.json();

//   const userResponse = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`);
//   const userObj = await userResponse.json();

//   if (!userObj.length) return Response.json({ error: "User not found! Create an account" }, { status: 404 });

//   const user = userObj[0];

//   if (password !== undefined) {
//     const isValid = await bcrypt.compare(password, user["password"]);
//     if (!isValid) return Response.json({ error: "Wrong password!" }, { status: 401 });

//     const cookieStore = await cookies();
//     cookieStore.set("USER_ID", user["id"], {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });
//   }

//   return Response.json({ "success": "User exists!" });
// }

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
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email) return Response.json({ error: "Email is required" }, { status: 400 });

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