import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8
    ) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and password." },
        { status: 400 }
      );
    }

    // Check whether the email already exists
    const usersResponse = await fetch(`${BASE_URL}/users`, {
      cache: "no-store",
    });

    if (!usersResponse.ok) {
      throw new Error("Unable to retrieve users.");
    }

    const users = await usersResponse.json();

    const existingUser = users.find(
      (user: { email: string }) =>
        user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const userResponse = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        created_at: new Date().toISOString(),
      }),
    });

    if (!userResponse.ok) {
      throw new Error("Unable to create your account.");
    }

    const user = await userResponse.json();

    // Never return the hashed password
    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}