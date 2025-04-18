'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import PreviewModal from './PreviewModal';

export interface FileItemProps {
  fileName: string;
  url: string;
  timestamp?: string;
  index: number;
  onDelete?: () => void;
}

// Array of file extensions that can be previewed
const PREVIEWABLE_EXTENSIONS = [
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

// Function to check if a file is previewable
const isFilePreviewable = (fileName: string): boolean => {
  const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return PREVIEWABLE_EXTENSIONS.includes(extension);
};

export default function FileItem({ fileName, url, timestamp, index, onDelete }: FileItemProps) {
  const [showPreview, setShowPreview] = useState(false);
  const previewable = isFilePreviewable(fileName);
  
  // Create preview URL - For download URLs, change /download/ to /api/download/{key}/preview
  const getPreviewUrl = () => {
    if (url.includes('/download/')) {
      const key = url.split('/download/')[1];
      return `/api/download/${key}/preview`;
    }
    return url;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border border-gray-100 mb-3 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            {previewable ? (
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate" title={fileName}>
              {fileName}
            </p>
            {timestamp && (
              <p className="text-xs text-gray-500">
                Received {timestamp}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          {previewable && (
            <button
              onClick={() => setShowPreview(true)}
              className="text-blue-600 hover:text-blue-800 p-2"
              title="Preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 p-2"
            title="Download"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600 p-2"
              title="Delete"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* Preview Modal */}
      <PreviewModal 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        fileName={fileName}
        url={getPreviewUrl()}
      />
    </>
  );
} 