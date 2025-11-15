import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  return;
  try {
    // Get token from cookie (store your AdminToken in cookies on login)
    const token = req.cookies.get("AdminToken")?.value;

    const pathname = req.nextUrl.pathname;
    const isAuthRoute =
      pathname === "/dashboard/Admin-login" || pathname === "/dashboard/Admin-login/";
    const isProtectedRoute = pathname.startsWith("/dashboard") && !isAuthRoute;

    // If user is logged in and visits login page, redirect to dashboard
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard/", req.url));
    }

    // If user is not logged in and tries to access protected routes
    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard/Admin-login/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // restrict only to dashboard routes
};
