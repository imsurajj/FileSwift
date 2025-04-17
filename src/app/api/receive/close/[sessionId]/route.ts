import { NextRequest, NextResponse } from 'next/server';
import { activeSessions } from '../../route';
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
    
    // Close the session by removing it from active sessions
    delete activeSessions[sessionId];
    
    // In a production app, you might want to keep the files
    // But for demo purposes, we'll clear them
    // clearReceivedFiles(sessionId);
    
    return NextResponse.json({ 
      success: true,
      message: 'Receive session closed successfully'
    });
  } catch (error) {
    console.error('Close session error:', error);
    return NextResponse.json(
      { error: 'Failed to close receive session' },
      { status: 500 }
    );
  }
} 