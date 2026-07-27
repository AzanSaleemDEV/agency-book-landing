import { NextRequest, NextResponse } from "next/server";

// Vercel's edge network adds this header automatically based on the
// visitor's IP — no external geolocation service needed. Locally (or on
// any non-Vercel host) it will be empty, which falls back to the
// international price.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country") ?? "";

  if (country) {
    response.cookies.set("country", country, {
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
}

export const config = {
  matcher: "/",
};
