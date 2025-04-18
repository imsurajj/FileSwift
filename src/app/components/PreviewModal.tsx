'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  url: string;
}

export default function PreviewModal({ isOpen, onClose, fileName, url }: PreviewModalProps) {
  const [loading, setLoading] = useState(true);
  const [fileType, setFileType] = useState<'image' | 'pdf' | 'ppt' | 'doc' | 'excel' | 'txt' | 'code' | 'video' | 'audio' | 'archive' | 'unknown'>('unknown');
  const [error, setError] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Function to determine file type based on extension
  const getFileType = (extension: string) => {
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'tif'].includes(extension)) {
      return 'image';
    } else if (['pdf'].includes(extension)) {
      return 'pdf';
    } else if (['ppt', 'pptx'].includes(extension)) {
      return 'ppt';
    } else if (['doc', 'docx', 'rtf', 'odt'].includes(extension)) {
      return 'doc';
    } else if (['xls', 'xlsx', 'csv', 'ods'].includes(extension)) {
      return 'excel';
    } else if (['txt', 'log'].includes(extension)) {
      return 'txt';
    } else if (['js', 'jsx', 'ts', 'tsx', 'html', 'htm', 'css', 'json', 'xml', 'md', 'py', 'rb', 'java', 'c', 'cpp', 'cs', 'go', 'php', 'swift', 'yaml', 'yml'].includes(extension)) {
      return 'code';
    } else if (['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'].includes(extension)) {
      return 'video';
    } else if (['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(extension)) {
      return 'audio';
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return 'archive';
    } else {
      return 'unknown';
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setLoading(true);
      setError('');
      
      // Determine file type based on the extension
      const extension = fileName.split('.').pop()?.toLowerCase() || '';
      const type = getFileType(extension);
      setFileType(type);
      
      // Set loading to false for non-streaming content types after a delay
      if (['doc', 'excel', 'ppt', 'archive', 'unknown'].includes(type)) {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, fileName]);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Handle iframe loads
  const handleIframeLoad = () => {
    setLoading(false);
  };

  // Handle iframe errors
  const handleIframeError = (fileType: string) => {
    setLoading(false);
    setError(`Failed to load ${fileType} preview`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] z-10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate pr-2">
                {fileName}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-auto bg-gray-50 p-3 sm:p-4 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
              {/* Loading indicator */}
              {loading && (
                <div className="flex flex-col items-center justify-center">
                  <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-purple-600 mb-3 sm:mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-500 text-sm sm:text-base">Loading preview...</p>
                </div>
              )}
              
              {/* Error message */}
              {error && (
                <div className="text-center max-w-md mx-auto p-4 sm:p-6 bg-red-50 rounded-xl border border-red-100">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-base sm:text-lg font-medium text-red-700 mb-2">Error Loading Preview</p>
                  <p className="text-sm sm:text-base text-red-600 mb-4">{error}</p>
                  <a 
                    href={url} 
                    download={fileName}
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download File Instead
                  </a>
                </div>
              )}
              
              {/* Image preview */}
              {fileType === 'image' && (
                <div className={`relative max-w-full max-h-[50vh] sm:max-h-[70vh] ${loading || error ? 'hidden' : ''}`}>
                  <img
                    src={url}
                    alt={fileName}
                    className="max-w-full max-h-[50vh] sm:max-h-[70vh] object-contain rounded shadow"
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setError('Failed to load image preview');
                    }}
                  />
                </div>
              )}
              
              {/* PDF preview */}
              {fileType === 'pdf' && (
                <div className={`w-full h-[50vh] sm:h-[70vh] ${loading || error ? 'hidden' : ''}`}>
                  <object
                    data={url}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className="rounded shadow"
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setError('Failed to load PDF preview');
                    }}
                  >
                    <p className="text-sm sm:text-base">Your browser does not support PDF previews. <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Click here to download</a> instead.</p>
                  </object>
                </div>
              )}
              
              {/* Video preview */}
              {fileType === 'video' && (
                <div className={`w-full max-w-2xl ${loading || error ? 'hidden' : ''}`}>
                  <video 
                    controls 
                    className="w-full rounded shadow"
                    onCanPlay={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setError('Failed to load video preview');
                    }}
                  >
                    <source src={url} />
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
              
              {/* Audio preview */}
              {fileType === 'audio' && (
                <div className={`w-full max-w-md p-4 bg-white rounded-lg shadow ${loading || error ? 'hidden' : ''}`}>
                  <div className="text-center mb-3">
                    <svg className="w-12 h-12 text-purple-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    <p className="mt-2 font-medium">{fileName}</p>
                  </div>
                  <audio 
                    controls 
                    className="w-full" 
                    onCanPlay={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setError('Failed to load audio preview');
                    }}
                  >
                    <source src={url} />
                    Your browser does not support audio playback.
                  </audio>
                </div>
              )}
              
              {/* Text preview for plain text files */}
              {fileType === 'txt' && (
                <div className={`w-full max-w-3xl p-4 bg-white rounded-lg shadow h-[50vh] sm:h-[70vh] overflow-auto ${loading || error ? 'hidden' : ''}`}>
                  {typeof window !== 'undefined' && (
                    <iframe 
                      ref={iframeRef}
                      src={url} 
                      className="w-full h-full border-0"
                      onLoad={handleIframeLoad}
                      onError={() => handleIframeError('text')}
                    ></iframe>
                  )}
                </div>
              )}
              
              {/* Code preview */}
              {fileType === 'code' && (
                <div className={`w-full max-w-3xl p-4 bg-white rounded-lg shadow h-[50vh] sm:h-[70vh] overflow-auto ${loading || error ? 'hidden' : ''}`}>
                  {typeof window !== 'undefined' && (
                    <iframe 
                      ref={iframeRef}
                      src={url} 
                      className="w-full h-full border-0"
                      onLoad={handleIframeLoad}
                      onError={() => handleIframeError('code')}
                    ></iframe>
                  )}
                </div>
              )}
              
              {/* PowerPoint files */}
              {!loading && !error && fileType === 'ppt' && (
                <div className="text-center max-w-md mx-auto p-2 sm:p-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 4V20H22V4H2ZM20 18H4V6H20V18ZM10 9H18V10H10V9ZM10 11H18V12H10V11ZM10 13H18V14H10V13ZM6 9H9V14H6V9Z"/>
                  </svg>
                  <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">PowerPoint Preview</p>
                  <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">PowerPoint files can't be previewed directly in the browser.</p>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PowerPoint
                  </a>
                </div>
              )}
              
              {/* Word documents */}
              {!loading && !error && fileType === 'doc' && (
                <div className="text-center max-w-md mx-auto p-2 sm:p-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M9.04 11.39C9.17 11.42 9.31 11.43 9.45 11.43C9.7 11.43 9.87 11.39 10 11.32L10.1 12.3C10 12.37 9.86 12.42 9.7 12.45C9.53 12.5 9.36 12.5 9.19 12.5C8.26 12.5 7.8 12.05 7.8 11.16C7.8 10.28 8.38 9.85 9.24 9.85C9.41 9.85 9.59 9.87 9.78 9.9C9.93 9.95 10.05 10 10.1 10L9.85 10.93C9.74 10.87 9.41 10.78 9.12 10.78C8.71 10.78 8.53 11.05 8.53 11.25C8.53 11.71 8.86 11.86 9.04 11.39M11.42 12.45H10.67V9.89H11.42V12.45M12.93 9.89H13.71C14.57 9.89 15.08 10.4 15.08 11.2C15.08 12 14.55 12.45 13.72 12.45H12.93V9.89M13.65 11.73C14.05 11.73 14.3 11.5 14.3 11.18C14.3 10.88 14.03 10.62 13.64 10.62H13.67V11.73H13.65Z"/>
                  </svg>
                  <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Word Document</p>
                  <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">Word documents can't be previewed directly in the browser.</p>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Document
                  </a>
                </div>
              )}
              
              {/* Excel files */}
              {!loading && !error && fileType === 'excel' && (
                <div className="text-center max-w-md mx-auto p-2 sm:p-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M12.9 14.5L15.8 19H14L12 15.6L10 19H8.2L11.1 14.5L8.2 10H10L12 13.4L14 10H15.8L12.9 14.5Z" />
                  </svg>
                  <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Spreadsheet</p>
                  <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">Spreadsheet files can't be previewed directly in the browser.</p>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Spreadsheet
                  </a>
                </div>
              )}
              
              {/* Archive files */}
              {!loading && !error && fileType === 'archive' && (
                <div className="text-center max-w-md mx-auto p-2 sm:p-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-amber-600 mx-auto mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 8h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2-2h2v2h-2V10zm-2-2h2v2h-2V8zm8 4h2v2h-2v-2zm0-4h2v2h-2V8z" />
                  </svg>
                  <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Archive File</p>
                  <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">Archive files can't be previewed directly in the browser.</p>
                  <a 
                    href={url} 
                    download={fileName}
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Archive
                  </a>
                </div>
              )}
              
              {/* Unknown files */}
              {!loading && !error && fileType === 'unknown' && (
                <div className="text-center max-w-md mx-auto p-2 sm:p-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M13 13H11V15H13V13M13 9H11V12H13V9Z" />
                  </svg>
                  <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">File Preview</p>
                  <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">This file type cannot be previewed. Please download it to view its contents.</p>
                  <a 
                    href={url} 
                    download={fileName}
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download File
                  </a>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-3 sm:p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-2">
              <a
                href={url}
                download={fileName}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 