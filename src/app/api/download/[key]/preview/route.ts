import { NextRequest, NextResponse } from 'next/server';
import { getTempFile } from '@/utils/tempStorage';
import path from 'path';

// List of previewable file extensions
const PREVIEWABLE_IMAGES = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico', '.tiff', '.tif'];
const PREVIEWABLE_DOCUMENTS = [
  '.pdf', '.ppt', '.pptx', '.doc', '.docx', '.rtf', '.xls', '.xlsx', '.csv',
  '.odt', '.ods', '.odp', '.odg', '.odf'  // Open Document formats
];
const PREVIEWABLE_TEXT = ['.txt', '.md', '.html', '.htm', '.css', '.json', '.xml', '.csv', '.log'];
const PREVIEWABLE_CODE = [
  '.js', '.jsx', '.ts', '.tsx', '.html', '.htm', '.css', '.json', '.xml', '.md', 
  '.py', '.rb', '.java', '.c', '.cpp', '.cs', '.go', '.php', '.swift', '.yaml', '.yml'
];
const PREVIEWABLE_VIDEO = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv'];
const PREVIEWABLE_AUDIO = ['.mp3', '.wav', '.ogg', '.aac', '.flac'];
const PREVIEWABLE_ARCHIVES = ['.zip', '.rar', '.7z', '.tar', '.gz'];

// Combine all previewable file types
const ALL_PREVIEWABLE = [
  ...PREVIEWABLE_IMAGES,
  ...PREVIEWABLE_DOCUMENTS,
  ...PREVIEWABLE_TEXT,
  ...PREVIEWABLE_CODE,
  ...PREVIEWABLE_VIDEO,
  ...PREVIEWABLE_AUDIO,
  ...PREVIEWABLE_ARCHIVES
];

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const { buffer, originalName } = await getTempFile(key);
    
    // Determine content type based on file extension
    const ext = path.extname(originalName).toLowerCase();
    
    // Set the appropriate content type for the preview
    let contentType = 'application/octet-stream';
    
    // Image types
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.webp') {
      contentType = 'image/webp';
    } else if (ext === '.svg') {
      contentType = 'image/svg+xml';
    } else if (ext === '.bmp') {
      contentType = 'image/bmp';
    } else if (ext === '.ico') {
      contentType = 'image/x-icon';
    } else if (ext === '.tiff' || ext === '.tif') {
      contentType = 'image/tiff';
    }
    // Document types
    else if (ext === '.pdf') {
      contentType = 'application/pdf';
    } else if (ext === '.ppt' || ext === '.pptx') {
      contentType = 'application/vnd.ms-powerpoint';
    } else if (ext === '.doc') {
      contentType = 'application/msword';
    } else if (ext === '.docx') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (ext === '.rtf') {
      contentType = 'application/rtf';
    } else if (ext === '.xls') {
      contentType = 'application/vnd.ms-excel';
    } else if (ext === '.xlsx') {
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (ext === '.odt') {
      contentType = 'application/vnd.oasis.opendocument.text';
    } else if (ext === '.ods') {
      contentType = 'application/vnd.oasis.opendocument.spreadsheet';
    } else if (ext === '.odp') {
      contentType = 'application/vnd.oasis.opendocument.presentation';
    } else if (ext === '.odg') {
      contentType = 'application/vnd.oasis.opendocument.graphics';
    } else if (ext === '.odf') {
      contentType = 'application/vnd.oasis.opendocument.formula';
    }
    // Text types
    else if (ext === '.txt') {
      contentType = 'text/plain';
    } else if (ext === '.csv') {
      contentType = 'text/csv';
    } else if (ext === '.html') {
      contentType = 'text/html';
    } else if (ext === '.css') {
      contentType = 'text/css';
    } else if (ext === '.json') {
      contentType = 'application/json';
    } else if (ext === '.xml') {
      contentType = 'application/xml';
    } else if (ext === '.md') {
      contentType = 'text/markdown';
    } else if (ext === '.log') {
      contentType = 'text/plain';
    } else if (ext === '.htm') {
      contentType = 'text/html';
    }
    // Code types (for those not covered above)
    else if (PREVIEWABLE_CODE.includes(ext)) {
      contentType = 'text/plain';
    }
    // Video types
    else if (ext === '.mp4') {
      contentType = 'video/mp4';
    } else if (ext === '.webm') {
      contentType = 'video/webm';
    } else if (ext === '.mov') {
      contentType = 'video/quicktime';
    } else if (ext === '.avi') {
      contentType = 'video/x-msvideo';
    } else if (ext === '.mkv') {
      contentType = 'video/x-matroska';
    } else if (ext === '.flv') {
      contentType = 'video/x-flv';
    }
    // Audio types
    else if (ext === '.mp3') {
      contentType = 'audio/mpeg';
    } else if (ext === '.wav') {
      contentType = 'audio/wav';
    } else if (ext === '.ogg') {
      contentType = 'audio/ogg';
    } else if (ext === '.aac') {
      contentType = 'audio/aac';
    } else if (ext === '.flac') {
      contentType = 'audio/flac';
    }
    // Archive types
    else if (ext === '.zip') {
      contentType = 'application/zip';
    } else if (ext === '.rar') {
      contentType = 'application/vnd.rar';
    } else if (ext === '.7z') {
      contentType = 'application/x-7z-compressed';
    } else if (ext === '.tar') {
      contentType = 'application/x-tar';
    } else if (ext === '.gz') {
      contentType = 'application/gzip';
    }

    // Add appropriate headers based on file type
    let headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
      // Add CORS headers to support preview in browser
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // For previewable content like PDFs and images, use inline disposition
    if (PREVIEWABLE_IMAGES.includes(ext) || ext === '.pdf' || PREVIEWABLE_TEXT.includes(ext) || PREVIEWABLE_CODE.includes(ext)) {
      headers['Content-Disposition'] = 'inline';
    } 
    // For video and audio, use inline disposition
    else if (PREVIEWABLE_VIDEO.includes(ext) || PREVIEWABLE_AUDIO.includes(ext)) {
      headers['Content-Disposition'] = 'inline';
    }
    // For office documents, suggest download but don't force it
    else if (PREVIEWABLE_DOCUMENTS.includes(ext)) {
      headers['Content-Disposition'] = `attachment; filename="${encodeURIComponent(originalName)}"`;
    }

    return new NextResponse(buffer, {
      headers,
    });
  } catch (error: any) {
    console.error('Preview error:', error);
    if (error.message === 'File not found') {
      return NextResponse.json(
        { error: 'File not found or has expired' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to preview file' },
      { status: 500 }
    );
  }
} 