import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const POST = async () => {}

export const PATCH = async (request: NextRequest) => {
  const { id, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const userResponse = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password: hashedPassword })
  })
  
  const user = await userResponse.json();

  const { password: _, ...safeUser } = user;

  return Response.json(safeUser);
}