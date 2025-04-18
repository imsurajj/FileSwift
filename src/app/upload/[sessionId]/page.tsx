'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LoadingSpinner from '@/app/components/LoadingSpinner';

function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-6 px-4 text-center text-sm text-gray-500 bg-white/50 backdrop-blur-sm border-t border-gray-100 mt-auto"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center gap-1"
        >
          <Link href="/" className="text-purple-600 hover:text-purple-700 transition-colors">FileSwift</Link> • Built with <span className="text-red-500">♥</span> By Suraj
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default function UploadToReceiver({ params }: { params: { sessionId: string } }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [sentFiles, setSentFiles] = useState<Array<{name: string, url: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/receive/${params.sessionId}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const data = await response.json();
      
      // Add file to sent files list
      setSentFiles(prev => [...prev, {
        name: file.name,
        url: data.url
      }]);
      
      setDownloadUrl(data.url);
      setFileName(data.originalName);
      setSuccess(true);
      
      // Clear file selection to prepare for another upload
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      setError(error.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const sendAnotherFile = () => {
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <motion.h1 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-4xl font-bold text-gray-900 mb-4 tracking-tight"
              >
                File<span className="text-purple-600">Swift</span>
              </motion.h1>
            </Link>
            <p className="text-lg text-gray-600">
              Send files to the waiting recipient
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div
                  className="w-full h-52 border-2 border-dashed border-purple-400/50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-600/50 hover:bg-purple-50/50 transition-all duration-300"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="*/*"
                  />

                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                      </svg>
                    </div>
                    
                    {file ? (
                      <span className="text-xl text-gray-700 font-medium break-all">
                        {file.name}
                      </span>
                    ) : (
                      <>
                        <span className="text-xl text-gray-600">
                          Click to select or drag a file
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                          Your file will be sent securely
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-medium transition-all ${
                    !file
                      ? 'bg-gray-400 cursor-not-allowed'
                      : uploading
                      ? 'bg-purple-400 cursor-wait'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } flex items-center justify-center gap-2`}
                >
                  {uploading ? (
                    <>
                      <LoadingSpinner size={20} color="#FFFFFF" />
                      <span>Sending file...</span>
                    </>
                  ) : (
                    'Send File'
                  )}
                </button>
                
                {sentFiles.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      {sentFiles.length} {sentFiles.length === 1 ? 'File' : 'Files'} Sent
                    </h3>
                    <div className="max-h-40 overflow-y-auto">
                      {sentFiles.map((sentFile, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded mb-2 text-sm">
                          <span className="truncate max-w-[70%]" title={sentFile.name}>
                            {sentFile.name}
                          </span>
                          <a 
                            href={sentFile.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 text-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">File Sent Successfully!</h2>
                <p className="text-gray-600 mb-4 break-all">{fileName}</p>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
                  Your file has been successfully sent to the recipient
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={sendAnotherFile}
                    className="py-3 px-4 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Send Another File
                  </button>
                  <Link 
                    href="/"
                    className="py-3 px-4 bg-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
                    </svg>
                    Back to Home
                  </Link>
                </div>
                
                {sentFiles.length > 1 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      All Files Sent ({sentFiles.length})
                    </h3>
                    <div className="max-h-40 overflow-y-auto">
                      {sentFiles.map((sentFile, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded mb-2 text-sm">
                          <span className="truncate max-w-[70%]" title={sentFile.name}>
                            {sentFile.name}
                          </span>
                          <a 
                            href={sentFile.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
} 