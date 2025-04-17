'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function DownloadPage({ params }: { params: { key: string } }) {
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [originalFileName, setOriginalFileName] = useState<string>('');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col">
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4"
      >
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              File<span className="text-purple-600">Swift</span>
            </span>
          </Link>
        </div>
      </motion.header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full border border-white/20"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Download Complete!</h2>
                <p className="text-gray-600 mb-6">Your file has been successfully downloaded.</p>
                <div className="flex flex-col gap-3">
                  <Link href="/" 
                    className="py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-center flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="download"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Ready to Download</h1>
                
                <div className="mb-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                    </svg>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-900 font-medium break-all mb-1">{originalFileName}</p>
                    {fileSize && <p className="text-gray-500 text-sm">{fileSize}</p>}
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  disabled={downloading}
                  className={`w-full py-4 px-4 ${
                    downloading
                      ? 'bg-purple-400'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-lg font-medium`}
                >
                  {downloading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download File
                    </>
                  )}
                </motion.button>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-sm">
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
        className="py-6 px-4 text-center text-sm text-gray-500 bg-white/50 backdrop-blur-sm border-t border-gray-100 mt-auto"
      >
        <div className="container mx-auto">
          <Link href="/" className="text-purple-600 hover:text-purple-700 transition-colors">
            FileSwift
          </Link>{' '}
          • Built with <span className="text-red-500">♥</span> using Next.js
        </div>
      </motion.footer>
    </div>
  );
} 