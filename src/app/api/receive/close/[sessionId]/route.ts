import { NextRequest, NextResponse } from 'next/server';
import { activeSessions, removeSession } from '@/utils/receiveSessionStorage';
import { clearReceivedFiles } from '@/utils/receiveStorage';

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    
    // Check if the session exists
    if (!activeSessions[sessionId]) {
      return NextResponse.json(
        { error: 'Invalid or expired receive session' },
        { status: 404 }
      );
    }
    
    // Close the session
    removeSession(sessionId);
    
    // Clear stored files
    clearReceivedFiles(sessionId);
    
    return NextResponse.json({ 
      success: true,
      message: 'Receive session closed'
    });
  } catch (error) {
    console.error('Close session error:', error);
    return NextResponse.json(
      { error: 'Failed to close receive session' },
      { status: 500 }
    );
  }
} 