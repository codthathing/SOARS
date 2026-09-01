import { headers } from "next/headers";

export const getUserFromSession = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/users/me`, {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") ?? "",
    },
  });
  const data = await res.json();

  if (!res.ok) throw new Error(`Error: ${(data as {error: string}).error}`);

  return data as {id: string; email: string};
}