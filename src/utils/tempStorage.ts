import fs from 'fs';
import path from 'path';
import os from 'os';
import { nanoid } from 'nanoid';

const TEMP_DIR = path.join(os.tmpdir(), 'quickshare-temp');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Clean up old files (older than 1 hour)
const cleanupOldFiles = () => {
  const files = fs.readdirSync(TEMP_DIR);
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;

  files.forEach(file => {
    const filePath = path.join(TEMP_DIR, file);
    if (file.endsWith('.json')) return; // Skip metadata files
    const metadataPath = filePath + '.json';
    
    try {
      const stats = fs.statSync(filePath);
      if (now - stats.ctimeMs > ONE_HOUR) {
        fs.unlinkSync(filePath);
        if (fs.existsSync(metadataPath)) {
          fs.unlinkSync(metadataPath);
        }
      }
    } catch (error) {
      console.error('Error cleaning up file:', error);
    }
  });
};

// Run cleanup every hour, but only on the server - not during prerendering
if (typeof window === 'undefined') {
  setInterval(cleanupOldFiles, 60 * 60 * 1000);
}

// List of all previewable file extensions
const ALL_PREVIEWABLE = [
  // Images
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico', '.tiff', '.tif',
  // Documents
  '.pdf', '.ppt', '.pptx', '.doc', '.docx', '.rtf', '.xls', '.xlsx', '.csv',
  '.odt', '.ods', '.odp', '.odg', '.odf', // Open Document formats
  // Text and code
  '.txt', '.md', '.html', '.htm', '.css', '.json', '.xml', '.csv', '.log',
  '.js', '.jsx', '.ts', '.tsx', '.py', '.rb', '.java', '.c', '.cpp', '.cs', '.go', '.php', '.swift', '.yaml', '.yml',
  // Media
  '.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv', 
  '.mp3', '.wav', '.ogg', '.aac', '.flac',
  // Other common formats
  '.zip', '.rar', '.7z', '.tar', '.gz'
];

export const saveTempFile = async (file: Buffer, originalName: string): Promise<string> => {
  const fileId = nanoid();
  const fileExtension = path.extname(originalName);
  const fileName = `${fileId}${fileExtension}`;
  const filePath = path.join(TEMP_DIR, fileName);
  
  // Save the file
  await fs.promises.writeFile(filePath, file);
  
  // Save metadata including original filename
  const metadata = {
    originalName,
    uploadedAt: new Date().toISOString()
  };
  await fs.promises.writeFile(
    filePath + '.json',
    JSON.stringify(metadata)
  );
  
  return fileName;
};

export const getTempFile = async (fileName: string): Promise<{ buffer: Buffer; originalName: string; filePath: string }> => {
  const filePath = path.join(TEMP_DIR, fileName);
  const metadataPath = filePath + '.json';
  
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }
  
  // Read metadata
  let originalName = fileName;
  try {
    const metadata = JSON.parse(await fs.promises.readFile(metadataPath, 'utf-8'));
    originalName = metadata.originalName;
  } catch (error) {
    console.error('Error reading metadata:', error);
  }
  
  const buffer = await fs.promises.readFile(filePath);
  return { buffer, originalName, filePath };
};

export const getTempFileInfo = async (fileName: string): Promise<{ originalName: string; size: number; previewable: boolean }> => {
  const filePath = path.join(TEMP_DIR, fileName);
  const metadataPath = filePath + '.json';
  
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }
  
  // Read metadata
  let originalName = fileName;
  try {
    const metadata = JSON.parse(await fs.promises.readFile(metadataPath, 'utf-8'));
    originalName = metadata.originalName;
  } catch (error) {
    console.error('Error reading metadata:', error);
  }
  
  // Get file stats for size
  const stats = await fs.promises.stat(filePath);
  const size = stats.size;
  
  // Check if the file is previewable based on extension
  const extension = path.extname(originalName).toLowerCase();
  const previewable = ALL_PREVIEWABLE.includes(extension);
  
  return { originalName, size, previewable };
};

export const deleteTempFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(TEMP_DIR, fileName);
  const metadataPath = filePath + '.json';
  
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
    if (fs.existsSync(metadataPath)) {
      await fs.promises.unlink(metadataPath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}; 