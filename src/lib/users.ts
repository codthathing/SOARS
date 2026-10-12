// src/lib/users.ts
import "server-only"; // npm i server-only: stops this file ever being bundled for the browser

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type User = { id: string; email: string; password: string; [key: string]: unknown };

async function api<T>(path: string, retries = 2): Promise<T | null> {
  if (!API_URL) throw new Error("API_URL is not set");

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return api<T>(path, retries - 1);
    }
    throw error;
  }

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`User API failed (${res.status}) for ${path}`);

  return res.json();
}

export const findUserById = (id: string) =>
  api<User>(`/users/${encodeURIComponent(id)}`);

export const findUserByEmail = async (email: string) => {
  const users = await api<User[]>(`/users?email=${encodeURIComponent(email)}`);
  return users?.[0] ?? null;
};

export const toPublicUser = ({ password: _password, ...rest }: User) => rest;