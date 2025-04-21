import { NextRequest, NextResponse } from 'next/server';
import { saveTempFile } from '@/utils/tempStorage';
import { activeSessions, sessionExists } from '@/utils/receiveSessionStorage';
import { storeReceivedFile } from '@/utils/receiveStorage';

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
    
    // Add cache control headers to prevent caching
    const headers = new Headers();
    headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    
    return NextResponse.json({ 
      url: fileUrl,
      originalName: file.name,
      receivedBy: sessionId
    }, { headers });
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