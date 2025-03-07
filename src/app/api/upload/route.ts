import { NextRequest, NextResponse } from 'next/server';
import { saveTempFile } from '@/utils/tempStorage';

export async function POST(request: NextRequest) {
  try {
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
    
    return NextResponse.json({ 
      url: fileUrl,
      originalName: file.name 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response('Method not allowed', { status: 405 });
} 