'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DownloadPage({ params }: { params: { key: string } }) {
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Decode the filename from the URL
    const decodedFileName = decodeURIComponent(params.key);
    setFileName(decodedFileName);
  }, [params.key]);

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
    } catch (err) {
      setError('Failed to download the file. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Download Your File</h1>
        
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
            </svg>
          </div>
          <p className="text-gray-600 break-all font-medium">{fileName}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`w-full py-3 px-4 ${
            downloading
              ? 'bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-lg transition-colors flex items-center justify-center gap-2`}
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
            'Download File'
          )}
        </button>
      </motion.div>
    </div>
  );
} 