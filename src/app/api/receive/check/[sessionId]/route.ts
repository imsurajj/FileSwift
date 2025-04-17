import { NextRequest, NextResponse } from 'next/server';
import { activeSessions } from '../../route';
import { getReceivedFiles } from '@/utils/receiveStorage';

export async function GET(
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
    
    // Get all files received for this session
    const files = getReceivedFiles(sessionId);
    
    return NextResponse.json({ 
      files,
      sessionId
    });
  } catch (error) {
    console.error('Check received files error:', error);
    return NextResponse.json(
      { error: 'Failed to check received files' },
      { status: 500 }
    );
  }
}