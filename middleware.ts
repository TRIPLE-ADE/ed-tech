import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const authPaths = ["/auth/success", "/auth/failure"];
  const pathname = request.nextUrl.pathname;
  const referer = request.headers.get("referer");

  const cookies = request.cookies
  console.log({cookies})

  if (authPaths.includes(pathname) && !referer) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
