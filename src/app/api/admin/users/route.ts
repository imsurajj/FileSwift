import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/options";

// This is a helper to determine if we're running in a server context
// This avoids errors during static build when prisma tries to connect
const isServerContext = () => {
  return typeof window === 'undefined' && process.env.NODE_ENV !== 'test';
};

// Add dynamic export to force Next.js to recognize this as a fully dynamic route
// This prevents the route from being included in the build process
export const dynamic = 'force-dynamic';

// GET endpoint to fetch all users
export async function GET(req: Request) {
  // During static build/analysis at build time, return empty response
  if (!isServerContext()) {
    console.log("Build-time execution detected - returning empty response");
    return NextResponse.json([]);
  }
  
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all users (in a real app, you'd implement pagination)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
} 