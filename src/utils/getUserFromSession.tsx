// import { headers } from "next/headers";

// export const getUserFromSession = async () => {
//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//   const res = await fetch(`${BASE_URL}/api/users/me`, {
//     cache: "no-store",
//     headers: {
//       cookie: (await headers()).get("cookie") ?? "",
//     },
//   });
//   const data = await res.json();

//   if (!res.ok) throw new Error(`Error: ${(data as {error: string}).error}`);

//   return data as {id: string; email: string};
// }

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById, toPublicUser } from "@/src/lib/users";

export const getUserFromSession = async () => {
  const userId = (await cookies()).get("USER_ID")?.value;
  if (!userId) redirect("/auth/sign-in");

  const user = await findUserById(userId);
  if (!user) redirect("/api/auth/clear"); // stale cookie: clear it, then sign in

  return toPublicUser(user);
};