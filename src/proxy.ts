import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/landing", "/home"];
const AUTH_ROUTES = ["/auth", "/onboarding"];

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userId = request.cookies.get("USER_ID");

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (isAuthRoute && userId) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path", "/onboarding/:path", "/landing", "/home"]
}