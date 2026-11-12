import "server-only";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type User = { id: string; name: string; email: string; password: string; };

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  if (!BASE_URL) throw new Error("BASE_URL is not set");

  try {
    const res = await fetch(`${BASE_URL}${path}`, { ...options });

    if (!res.ok) throw new Error(`User API failed (${res.status}) for ${path}`);

    return res.json();
  } catch (error) {
    console.error(`Error: ${error}`);

    throw error;
  }
}


export const findUserById = (id: string) => api<User>(`/users/${encodeURIComponent(id)}`);


export const authenticateUser = async (email: string) => {
  const users = await api<User[]>(`/users?email=${encodeURIComponent(email)}`);

  return users[0] ?? null;
};


export const resetPassword = async (id: string, password: string) => {
  const user = await api<User>(`/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  })

  return toPublicUser(user);
}


export const createUser = async (name: string, email: string, password: string) => {
  const users = await api<User[]>("/users", { cache: "no-store" });

  const existingUser = users.some((user: { email: string }) => user.email === email.toLowerCase());

  if (existingUser) throw new Error("An account with this email already exists.");

  const user = await api<User>("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: crypto.randomUUID(), name, email: email.toLowerCase(), password, created_at: new Date().toISOString() }),
  })

  return toPublicUser(user);
}


export const toPublicUser = ({ password: _password, ...rest }: User) => rest;