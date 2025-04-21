import { NextRequest, NextResponse } from 'next/server';
import { activeSessions, removeSession, sessionExists } from '@/utils/receiveSessionStorage';
import { clearReceivedFiles } from '@/utils/receiveStorage';

export async function POST(
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
    
    // Close the session
    removeSession(sessionId);
    
    // Clear stored files
    clearReceivedFiles(sessionId);
    
    // Add cache control headers to prevent caching
    const headers = new Headers();
    headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    
    return NextResponse.json({ 
      success: true,
      message: 'Receive session closed'
    }, { headers });
  } catch (error) {
    console.error('Close session error:', error);
    return NextResponse.json(
      { error: 'Failed to close receive session' },
      { status: 500 }
    );
  }
} 