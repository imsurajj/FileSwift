'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface FilePreviewProps {
  previewUrl: string;
  fileName: string;
  fileType?: string;
  className?: string;
  height?: string;
}

const FilePreview = ({ previewUrl, fileName, fileType, className = '', height = 'h-52 sm:h-64' }: FilePreviewProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset states when the URL changes
    setError(false);
    setLoading(true);
  }, [previewUrl]);

  // Detect if the file is an image
  const isImage = fileType?.startsWith('image/') || 
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileName);

  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {isImage ? (
        <>
          <div className={`relative ${height} w-full bg-gray-50`}>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-purple-600"></div>
              </div>
            )}
            
            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
                <svg className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500">Unable to preview image</p>
              </div>
            ) : (
              <Image 
                src={previewUrl}
                alt={fileName}
                className="object-contain"
                fill
                priority
                onLoadingComplete={() => setLoading(false)}
                onError={() => {
                  setError(true);
                  setLoading(false);
                }}
              />
            )}
          </div>
          <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center border-t border-gray-200">
            Image Preview
          </div>
        </>
      ) : (
        <div className={`flex flex-col items-center justify-center ${height} bg-gray-50 p-4`}>
          <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm text-gray-500 text-center">No preview available for this file type</p>
        </div>
      )}
    </div>
  );
};

export default FilePreview; 