import { NextRequest, NextResponse } from 'next/server';
import { saveTempFile } from '@/utils/tempStorage';
import { activeSessions } from '@/utils/receiveSessionStorage';
import { storeReceivedFile } from '@/utils/receiveStorage';

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
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await saveTempFile(buffer, file.name);
    
    // Get the base URL from environment variable or construct it from the request
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const fileUrl = `${baseUrl}/download/${encodeURIComponent(fileName)}`;
    
    // Store the file in the receiver's session
    storeReceivedFile(sessionId, file.name, fileUrl);
    
    return NextResponse.json({ 
      url: fileUrl,
      originalName: file.name,
      receivedBy: sessionId
    });
  } catch (error) {
    console.error('Upload to receiver error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response('Method not allowed', { status: 405 });
} 