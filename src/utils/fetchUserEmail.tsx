export async function fetchUserEmail(email: string, password: string): Promise<void> {
  let res: Response;

  try {
    res = await fetch("/api/users/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.error ?? "Something went wrong. Please try again.");
}