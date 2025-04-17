import { NextRequest, NextResponse } from 'next/server';
import { getTempFileInfo } from '@/utils/tempStorage';

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const fileInfo = await getTempFileInfo(key);

    return NextResponse.json(fileInfo);
  } catch (error: any) {
    console.error('File info error:', error);
    if (error.message === 'File not found') {
      return NextResponse.json(
        { error: 'File not found or has expired' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to get file info' },
      { status: 500 }
    );
  }
} 