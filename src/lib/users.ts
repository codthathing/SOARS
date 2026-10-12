import "server-only";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type User = { id: string; email: string; password: string; };

async function api<T>(path: string): Promise<T | null> {
  if (!BASE_URL) throw new Error("BASE_URL is not set");

  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });

    if (!res.ok) throw new Error(`User API failed (${res.status}) for ${path}`);

    return res.json();
  } catch (error) {
    console.error(`Error: ${error}`);

    throw error;
  }
}

export const findUserById = (id: string) => api<User>(`/users/${encodeURIComponent(id)}`);

export const findUserByEmail = async (email: string) => {
  const users = await api<User[]>(`/users?email=${encodeURIComponent(email)}`);
  return users?.[0] ?? null;
};

export const toPublicUser = ({ password: _password, ...rest }: User) => rest;