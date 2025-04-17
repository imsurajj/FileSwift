import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { activeSessions, registerSession } from '@/utils/receiveSessionStorage';

// Clean up old sessions (older than 1 hour)
const HOUR_MS = 60 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  Object.keys(activeSessions).forEach(key => {
    if (now - activeSessions[key].createdAt > HOUR_MS) {
      delete activeSessions[key];
    }
  });
}, HOUR_MS);

export async function POST(request: NextRequest) {
  try {
    // Generate a unique session ID
    const sessionId = nanoid(10);
    
    // Record the session
    registerSession(sessionId);
    
    // Get the base URL from environment variable or construct it from the request
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const receiveUrl = `${baseUrl}/upload/${encodeURIComponent(sessionId)}`;
    
    return NextResponse.json({ 
      sessionId,
      url: receiveUrl
    });
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