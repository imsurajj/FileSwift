import { NextRequest, NextResponse } from 'next/server';
import { getTempFile, deleteTempFile } from '@/utils/tempStorage';

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const { buffer, originalName } = await getTempFile(key);

    // Delete the file after sending it
    setTimeout(async () => {
      try {
        await deleteTempFile(key);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }, 1000);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(originalName)}"`,
      },
    });
  } catch (error: any) {
    console.error('Download error:', error);
    if (error.message === 'File not found') {
      return NextResponse.json(
        { error: 'File not found or has expired' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
} 