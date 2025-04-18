import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // Function that will be executed on protected routes
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run this middleware on the dashboard route
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
          return false;
        }
        return true;
      },
    },
  }
);

// Apply middleware to dashboard and any future protected routes
export const config = {
  matcher: ["/dashboard/:path*"],
}; 