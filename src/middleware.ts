
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(req: NextRequest) {
  try {

    const token =
      req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value;

    const pathname = req.nextUrl.pathname;
    const isAuthRoute = pathname === "/dashboard/Admin-login/";
    const isProtectedRoute = pathname.startsWith("/dashboard") && !isAuthRoute;


    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard/", req.url));
    }

    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard/Admin-login/", req.url));
    }

 


    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    '/((?!api|_next|.*\\.).+)',
  ],
};
