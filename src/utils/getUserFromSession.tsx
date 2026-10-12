import { cookies } from "next/headers";

export const getUserFromSession = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const res = await fetch(`${BASE_URL}/api/users/me`, {
    cache: "no-store",
    headers: { cookie: (await cookies()).toString() },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(`Error: ${(data as {error: string}).error}`);

  return data as {id: string; email: string};
}