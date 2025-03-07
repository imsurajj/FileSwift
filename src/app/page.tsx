'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'react-qr-code'
import Image from 'next/image'

function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [originalName, setOriginalName] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      const formData = new FormData();
      formData.append('file', droppedFile);
      handleUpload(formData);
    }
  };

  const handleUpload = async (formData: FormData) => {
    setUploading(true);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      console.log('Upload successful, URL:', data.url);
      setShareUrl(data.url);
      const file = formData.get('file') as File;
      setOriginalName(data.originalName || file.name);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);
      handleUpload(formData);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetShare = () => {
    setShareUrl('')
    setFile(null)
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl font-bold text-gray-900 mb-4 tracking-tight"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              File<span className="text-blue-600">Swift</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Share files instantly with anyone, anywhere. No sign-up required. 
              Files are automatically deleted after download for your privacy.
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-white/20"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="*/*"
              capture="environment"
            />
            <div
              className="w-full h-64 border-2 border-dashed border-blue-400/50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-600/50 hover:bg-blue-50/50 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
              onTouchEnd={() => fileInputRef.current?.click()}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                  </svg>
                </div>
                <span className="text-xl text-gray-600">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
                {!file && (
                  <p className="text-sm text-gray-500 mt-2">
                    Your files are automatically deleted after download
                  </p>
                )}
              </motion.div>
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Share Popup */}
      <AnimatePresence>
        {shareUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full relative border border-white/20"
            >
              <button
                onClick={resetShare}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your file is ready to share!
                </h3>
                <p className="text-gray-600 mb-6 break-all">
                  {originalName}
                </p>
                
                <div className="mb-6 p-4 bg-white rounded-xl shadow-sm">
                  <QRCode value={shareUrl} size={160} className="mx-auto mb-4" />
                  <p className="text-sm text-gray-500">Scan to download</p>
                </div>

                <div className="flex items-center gap-2 bg-white p-2 rounded-lg mb-4 shadow-sm">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-blue-600 font-medium text-sm"
                  />
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2 ${copied ? 'bg-green-500' : 'bg-blue-600'} text-white rounded-lg hover:opacity-90 active:opacity-100 transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center shadow-sm"
                >
                  Open Download Page
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-6 text-center text-sm text-gray-500 bg-white/50 backdrop-blur-sm border-t border-gray-100"
    >
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="inline-flex items-center gap-1"
      >
        Built with{' '}
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          className="text-red-500"
        >
          ❤️
        </motion.span>
        {' '}by{' '}
        <motion.a 
          href="https://github.com/suraj" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 transition-colors font-medium relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Suraj
          <motion.span
            className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full"
            transition={{ duration: 0.2 }}
            whileHover={{ width: "100%" }}
          />
        </motion.a>
      </motion.div>
    </motion.footer>
  )
}

export default function Home() {
  return (
    <main>
      <FileUpload />
    </main>
  )
}
