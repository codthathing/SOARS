import { resetPassword } from "@/src/lib/auth/api";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  try {
    const id = request.cookies.get("RESET_PASSWORD_USER_ID")?.value;
    const { password } = await request.json();

    if (!id) return NextResponse.json({error: "User does not exist"}, {status: 401});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await resetPassword(id, hashedPassword);

    const response = NextResponse.json({success: true, message: "Password updated!", user}, {status: 200});
    
    response.cookies.delete("RESET_PASSWORD_USER_ID");
    return response;
  } catch (error) {
    return NextResponse.json({error: error instanceof Error ? error.message : "Something went wrong, kindly try again!"}, {status: 409})
  }
}