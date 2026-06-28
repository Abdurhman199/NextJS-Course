import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("__session")?.value;

  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/recipes") ||
    pathname.startsWith("/favorites");

  if (isProtectedRoute && !session) {
    const url = request.nextUrl.clone();

    url.pathname = "/auth/login";
    url.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}