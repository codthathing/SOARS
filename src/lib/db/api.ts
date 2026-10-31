
import "server-only";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function api<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Database request failed: ${response.status}`
    );
  }

  return response.json();
}

export const db = {
  get: <T>(path: string) => api<T>(path),

  post: <T>(path: string, data: unknown) =>
    api<T>(path, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  patch: <T>(path: string, data: unknown) =>
    api<T>(path, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(path: string) =>
    api<T>(path, {
      method: "DELETE",
    }),
};
