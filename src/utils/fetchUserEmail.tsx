export const fetchUserEmail = async (email: string, password: string) => {
  const res = await fetch("/api/users/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);
}