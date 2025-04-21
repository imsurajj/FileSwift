import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { activeSessions, registerSession } from '@/utils/receiveSessionStorage';

// Clean up old sessions (older than 1 hour)
const HOUR_MS = 60 * 60 * 1000;

// Only run cleanup interval on the server - not during prerendering
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  setInterval(() => {
    const now = Date.now();
    Object.keys(activeSessions).forEach(key => {
      if (now - activeSessions[key].createdAt > HOUR_MS) {
        delete activeSessions[key];
      }
    });
  }, HOUR_MS);
}

export async function POST(request: NextRequest) {
  try {
    // Generate a unique session ID
    const sessionId = nanoid(10);
    
    // Record the session
    registerSession(sessionId);
    
    // Get the base URL from environment variable or construct it from the request
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const receiveUrl = `${baseUrl}/upload/${encodeURIComponent(sessionId)}`;
    
    // Add cache control headers to prevent caching
    const headers = new Headers();
    headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    
    return NextResponse.json({ 
      sessionId,
      url: receiveUrl
    }, { headers });
  } catch (error) {
    console.error('Receive session error:', error);
    return NextResponse.json(
      { error: 'Failed to create receive session' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response('Method not allowed', { status: 405 });
} 