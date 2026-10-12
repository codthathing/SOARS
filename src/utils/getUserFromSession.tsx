import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById, toPublicUser } from "@/src/lib/users";

export const getUserFromSession = async () => {
  const userId = (await cookies()).get("USER_ID")?.value;
  if (!userId) redirect("/auth/sign-in");

  const user = await findUserById(userId);
  if (!user) redirect("/api/auth/clear");

  return toPublicUser(user);
};