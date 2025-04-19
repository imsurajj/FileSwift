import { NextResponse } from "next/server";

// Force route to be dynamic and skip static generation
export const dynamic = 'force-dynamic';

// Dummy response that doesn't require database access
export async function GET() {
  return NextResponse.json(
    { message: "Admin functionality is disabled" },
    { status: 403 }
  );
} 