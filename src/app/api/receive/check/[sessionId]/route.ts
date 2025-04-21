import { NextRequest, NextResponse } from 'next/server';
import { activeSessions, sessionExists } from '@/utils/receiveSessionStorage';
import { getReceivedFiles } from '@/utils/receiveStorage';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    
    // Check if the session exists
    if (!sessionExists(sessionId)) {
      return NextResponse.json(
        { error: 'Invalid or expired receive session' },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }
    
    // Get all files received for this session
    const files = getReceivedFiles(sessionId);
    
    // Add cache control headers to prevent caching
    const headers = new Headers();
    headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    
    return NextResponse.json({ 
      files,
      sessionId
    }, { headers });
  } catch (error) {
    console.error('Check received files error:', error);
    return NextResponse.json(
      { error: 'Failed to check received files' },
      { status: 500 }
    );
  }
}