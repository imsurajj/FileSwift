import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // Function that will be executed on protected routes
  function middleware(req) {
    // Block access to all admin routes - we've removed admin functionality
    if (req.nextUrl.pathname.includes("/admin")) {
      return new NextResponse("Admin access has been disabled", { status: 403 });
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      // Run authorization check on dashboard and api routes
      authorized({ req, token }) {
        // Check dashboard access
        if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
          return false;
        }
        
        // Check API route access
        if (req.nextUrl.pathname.startsWith("/api/") && 
            !req.nextUrl.pathname.startsWith("/api/auth") && 
            !token) {
          return false;
        }
        
        return true;
      },
    },
  }
);

// Apply middleware to dashboard, admin routes, and API routes
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/admin/:path*",
    "/api/:path*"
  ],
}; 