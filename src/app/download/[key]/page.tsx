'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PreviewModal from '@/app/components/PreviewModal';

export default function DownloadPage({ params }: { params: { key: string } }) {
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [originalFileName, setOriginalFileName] = useState<string>('');
  const [isPreviewable, setIsPreviewable] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Get file info including original filename
    fetchFileInfo();
  }, [params.key]);
  
  const fetchFileInfo = async () => {
    try {
      const response = await fetch(`/api/download/${params.key}/info`);
      if (response.ok) {
        const data = await response.json();
        
        // Set original filename if available
        if (data.originalName) {
          setOriginalFileName(data.originalName);
        } else {
          // Fallback to key if no original name
          setOriginalFileName(decodeURIComponent(params.key));
        }
        
        // Set key as internal filename
        setFileName(decodeURIComponent(params.key));
        
        // Set file size if available
        if (data.size) {
          const sizeInMB = (data.size / (1024 * 1024)).toFixed(2);
          setFileSize(`${sizeInMB} MB`);
        }
        
        // Check if file is previewable
        if (data.previewable) {
          setIsPreviewable(true);
          setPreviewUrl(`/api/download/${params.key}/preview`);
        }
      }
    } catch (err) {
      console.error('Failed to fetch file info:', err);
      // Fallback to key if fetch fails
      setOriginalFileName(decodeURIComponent(params.key));
      setFileName(decodeURIComponent(params.key));
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(`/api/download/${params.key}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Get the original filename from the Content-Disposition header if available
      const contentDisposition = response.headers.get('Content-Disposition');
      const match = contentDisposition?.match(/filename="(.+)"/);
      const downloadFileName = match ? match[1] : fileName;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Show success state
      setSuccess(true);
      
    } catch (err) {
      setError('Failed to download the file. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4 sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-gray-900">
                File<span className="text-purple-600">Swift</span>
              </span>
            </Link>
          </div>
        </motion.header>
        
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl sm:p-6 p-4 md:p-8 max-w-md w-full border border-white/20"
          >
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Download Failed</h1>
                  <p className="text-gray-600 mb-4 sm:mb-6">{error}</p>
                  <button
                    onClick={() => setError('')}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium text-base"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Download Complete</h1>
                  <p className="text-gray-600 mb-6 sm:mb-8">Your file has been downloaded successfully.</p>
                  <Link
                    href="/"
                    className="w-full sm:w-auto inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium text-base"
                  >
                    Share Another File
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="download"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to Download</h1>
                  
                  <div className="mb-5 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                      </svg>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-gray-900 font-medium break-all mb-1 text-sm sm:text-base">{originalFileName}</p>
                      {fileSize && <p className="text-gray-500 text-xs sm:text-sm">{fileSize}</p>}
                      
                      {isPreviewable && (
                        <button 
                          onClick={() => setShowPreview(true)}
                          className="mt-3 px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors w-full flex items-center justify-center gap-2 text-xs sm:text-sm"
                        >
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview File
                        </button>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    disabled={downloading}
                    className={`w-full py-3 sm:py-4 px-4 ${
                      downloading
                        ? 'bg-purple-400'
                        : 'bg-purple-600 hover:bg-purple-700'
                    } text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-base sm:text-lg font-medium`}
                  >
                    {downloading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download File</span>
                      </>
                    )}
                  </motion.button>
                  
                  <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                    <p className="text-gray-500 text-xs sm:text-sm">
                      This file is temporary and will be deleted after download.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-4 sm:py-6 px-4 text-center text-xs sm:text-sm text-gray-500 bg-white/50 backdrop-blur-sm border-t border-gray-100 mt-auto"
        >
          <div className="container mx-auto">
            <Link href="/" className="text-purple-600 hover:text-purple-700 transition-colors">
              FileSwift
            </Link>{' '}
            • Built with <span className="text-red-500">♥</span> using Next.js
          </div>
        </motion.footer>
      </div>

      {/* File Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        fileName={originalFileName}
        url={previewUrl}
      />
    </>
  );
} 