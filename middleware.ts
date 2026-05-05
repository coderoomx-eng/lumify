import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  if (!isDashboard) {
    return NextResponse.next();
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const token = await getToken({
    req,
    secret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token?.sub) {
    const login = new URL("/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
