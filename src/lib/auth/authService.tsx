export async function authAuthenticateUser(values: {email: string; password?: string}): Promise<void> {
  let res: Response;

  try {
    res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.error);
}


export const authResetPassword = async (password: string) => {
  let res: Response;

  try {
    res = await fetch("/api/auth/reset-password", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({password})
    })
  } catch {
    throw new Error("Network error, check your connection and try again!");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.error);
}


export const authSignUp = async (values: {name: string; email: string; password: string;}) => {
  let res: Response;
  
  try {
    res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    throw new Error("Network error, check your connection and try again!");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.error);
};
