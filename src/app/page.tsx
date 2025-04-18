'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'react-qr-code'
import LoadingSpinner from './components/LoadingSpinner'
import Notification from './components/Notification'
import FileItem from './components/FileItem'
import LoadingOverlay from './components/LoadingOverlay'
import Navbar from './components/Navbar'
import ToggleSwitch from './components/ToggleSwitch'
import PreviewModal from './components/PreviewModal'
import { useSearchParams, useRouter } from 'next/navigation'

// List of all previewable file extensions
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

// Define types for received files
interface ReceivedFile {
  fileName: string;
  url: string;
  timestamp: string;
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500 border-r-2 border-purple-500 border-b-2 border-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <FileTransfer />
    </Suspense>
  )
}

function FileTransfer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get('tab')
  
  const [file, setFile] = useState<File | null>(null)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [originalName, setOriginalName] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>(tab === 'receive' ? 'receive' : 'send')
  const [receiveSession, setReceiveSession] = useState<string>('')
  const [receiveUrl, setReceiveUrl] = useState<string>('')
  const [receivedFiles, setReceivedFiles] = useState<ReceivedFile[]>([])
  const [loadingReceive, setLoadingReceive] = useState(false)
  const [checkingFiles, setCheckingFiles] = useState(false)
  const [sessionActive, setSessionActive] = useState(true)
  const [error, setError] = useState<string>('')
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    isVisible: boolean;
  }>({ type: 'info', message: '', isVisible: false })
  const [isPreviewable, setIsPreviewable] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Update active tab when search params change
  useEffect(() => {
    if (tab === 'receive') {
      setActiveTab('receive')
    } else if (tab === 'send') {
      setActiveTab('send')
    }
  }, [tab])

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab === 'receive') {
      router.push('/?tab=receive')
    } else {
      router.push('/?tab=send')
    }
  }, [activeTab, router])

  // Load received files from local storage on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedFiles = localStorage.getItem('receivedFiles')
      if (storedFiles) {
        setReceivedFiles(JSON.parse(storedFiles))
      }
    }
  }, [])

  // Save received files to local storage when they change
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('receivedFiles', JSON.stringify(receivedFiles))
    }
  }, [receivedFiles])

  // Poll for new files when a receive session is active
  useEffect(() => {
    if (receiveSession) {
      setSessionActive(true)
      // Initial check
      checkForNewFiles()
      
      // Set up polling every 5 seconds
      intervalRef.current = setInterval(checkForNewFiles, 5000)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [receiveSession])

  const checkForNewFiles = async () => {
    try {
      if (!receiveSession) return;
      
      setCheckingFiles(true);
      const response = await fetch(`/api/receive/check/${receiveSession}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // Session has expired or been closed
          setSessionActive(false);
        }
        console.error('Failed to check for files:', await response.text());
        return;
      }
      
      const data = await response.json();
      setSessionActive(true);
      
      if (data.files && data.files.length > 0) {
        // Convert the ISO timestamp to a localized format
        const formattedFiles = data.files.map((file: any) => ({
          ...file,
          timestamp: new Date(file.timestamp).toLocaleString()
        }));
        
        // Only update if we have new files
        if (formattedFiles.length !== receivedFiles.length) {
          setReceivedFiles(formattedFiles);
          
          // Show notification if we received a new file (comparing lengths is a simple approach)
          if (formattedFiles.length > receivedFiles.length) {
            const newFilesCount = formattedFiles.length - receivedFiles.length;
            showNotification(
              'success',
              `Received ${newFilesCount} new ${newFilesCount === 1 ? 'file' : 'files'}!`
            );
          }
        }
      }
    } catch (error) {
      console.error('Error checking for files:', error);
    } finally {
      setCheckingFiles(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      const formData = new FormData()
      formData.append('file', droppedFile)
      handleUpload(formData)
    }
  }

  const handleUpload = async (formData: FormData) => {
    setUploading(true)
    setError('')
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const data = await response.json()
      console.log('Upload successful, URL:', data.url)
      setShareUrl(data.url)
      const file = formData.get('file') as File
      setOriginalName(data.originalName || file.name)
      
      // Check if file is previewable based on extension
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const previewable = PREVIEWABLE_EXTENSIONS.some(ext => 
        `.${extension}` === ext || extension === ext.substring(1)
      )
      setIsPreviewable(previewable)
      
      // Set the preview URL (convert from download URL to preview URL)
      if (previewable) {
        // Extract the key from the share URL
        const urlParts = data.url.split('/')
        const key = urlParts[urlParts.length - 1]
        setPreviewUrl(`/api/download/${key}/preview`)
      }
      
      showNotification('success', 'File uploaded successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Upload failed. Please try again.')
      showNotification('error', 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const formData = new FormData()
      formData.append('file', selectedFile)
      handleUpload(formData)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetShare = () => {
    setShareUrl('')
    setFile(null)
  }
  
  const startReceiveSession = async () => {
    setLoadingReceive(true)
    try {
      const response = await fetch('/api/receive', {
        method: 'POST',
      })
      
      if (!response.ok) {
        throw new Error('Failed to create receive session')
      }
      
      const data = await response.json()
      setReceiveSession(data.sessionId)
      setReceiveUrl(data.url)
      showNotification('success', 'Receive session created! Waiting for files...')
    } catch (error) {
      console.error('Failed to create receive session:', error)
      showNotification('error', 'Failed to create receive session. Please try again.')
    } finally {
      setLoadingReceive(false)
    }
  }
  
  const endReceiveSession = async () => {
    if (!receiveSession) return;
    
    try {
      // Set loading state to indicate closing process
      setLoadingReceive(true);
      
      // Call the API to close the session
      const response = await fetch(`/api/receive/close/${receiveSession}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error('Failed to close receive session');
      }
      
      // Clear the local state
      setReceiveSession('');
      setReceiveUrl('');
      setSessionActive(false);
      showNotification('success', 'Receive session closed successfully!');
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (error) {
      console.error('Failed to close receive session:', error);
      
      // Even if the API call fails, reset the local state to allow user to start a new session
      setReceiveSession('');
      setReceiveUrl('');
      setSessionActive(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      showNotification('error', 'Failed to close receive session on server, but local state has been reset.');
    } finally {
      setLoadingReceive(false);
    }
  };
  
  const addReceivedFile = (fileName: string, url: string) => {
    const newFile = {
      fileName,
      url,
      timestamp: new Date().toLocaleString()
    }
    setReceivedFiles(prev => [newFile, ...prev])
  }
  
  const removeReceivedFile = (index: number) => {
    setReceivedFiles(prev => prev.filter((_, i) => i !== index))
  }
  
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({
      type,
      message,
      isVisible: true
    })
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }))
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <Notification 
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
      
      <LoadingOverlay 
        isVisible={loadingReceive} 
        message="Creating receive session..." 
      />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              File<span className="text-purple-600">Swift</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Share files instantly, anywhere. No sign-up needed.
            </motion.p>
          </motion.div>

          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('send')}
                className={`px-6 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'send'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                } transition-colors`}
              >
                Send
              </button>
              <button
                onClick={() => setActiveTab('receive')}
                className={`px-6 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'receive'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                } transition-colors`}
              >
                Receive
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'send' && (
              <motion.div
                key="send"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
          <motion.div
                  className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-white/20"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
                  <div className="flex justify-center">
                    <div className="w-full max-w-md">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="*/*"
              capture="environment"
            />
            <div
                        className="w-full h-64 border-2 border-dashed border-purple-400/50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-600/50 hover:bg-purple-50/50 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
              onTouchEnd={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                          className="text-center p-4"
                        >
                          {uploading ? (
                            <div className="flex flex-col items-center justify-center">
                              <LoadingSpinner text="Uploading file..." />
                            </div>
                          ) : (
                            <>
                              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                  </svg>
                </div>
                              <span className="text-xl text-gray-600 font-medium">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
                {!file && (
                  <p className="text-sm text-gray-500 mt-2">
                    Your files are automatically deleted after download
                  </p>
                )}
                            </>
                          )}
                        </motion.div>
                      </div>

                      {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (file) {
                            const formData = new FormData();
                            formData.append('file', file);
                            handleUpload(formData);
                          }
                        }}
                        disabled={!file || uploading}
                        className={`w-full mt-6 py-4 px-4 rounded-xl text-white font-medium transition-all text-lg ${
                          !file
                            ? 'bg-gray-400 cursor-not-allowed'
                            : uploading
                            ? 'bg-purple-400 cursor-wait'
                            : 'bg-purple-600 hover:bg-purple-700'
                        } flex items-center justify-center gap-2 shadow-md hover:shadow-lg`}
                      >
                        {uploading ? (
                          <>
                            <LoadingSpinner size={20} color="#FFFFFF" />
                            <span>Sending file...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <span>Send File</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'receive' && (
              <motion.div
                key="receive"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <motion.div
                  className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-white/20"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Ready to Receive Files</h2>
                    {receiveSession && sessionActive && (
                      <button
                        onClick={endReceiveSession}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Stop Receiving
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="p-6 bg-white rounded-xl shadow-sm mx-auto w-full relative">
                        <div className={`${!receiveSession ? 'blur-[2px] filter' : ''} transition-all duration-300`}>
                          <QRCode value={receiveUrl || 'https://example.com'} size={192} className="mx-auto" />
            </div>

                        {!receiveSession && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-blue-50/60 backdrop-blur-[2px] rounded-xl w-full h-full"></div>
                          </div>
                        )}
                        
                        <div className={`flex items-center gap-2 mt-4 bg-gray-50 p-3 rounded-lg ${!receiveSession ? 'blur-[2px]' : ''}`}>
                          <input
                            type="text"
                            value={receiveUrl || 'https://fileswift.app/receive/...'}
                            readOnly
                            className="w-full p-2 bg-white border border-gray-200 rounded text-gray-600 text-sm"
                          />
                          <button
                            onClick={() => {
                              if (receiveUrl) {
                                navigator.clipboard.writeText(receiveUrl);
                                showNotification('success', 'Link copied to clipboard!');
                              }
                            }}
                            disabled={!receiveSession}
                            className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex-shrink-0 disabled:opacity-50"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      {!receiveSession ? (
                        <div className="bg-purple-50 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center h-full">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-purple-800 mb-3">Start Receiving</h3>
                          <p className="text-sm text-gray-600 text-center mb-6">
                            Click the button below to generate a QR code and start receiving files
                          </p>
                          <button
                            onClick={startReceiveSession}
                            disabled={loadingReceive}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-md font-medium disabled:bg-purple-400"
                          >
                            {loadingReceive ? (
                              <>
                                <LoadingSpinner size={20} color="#FFFFFF" />
                                <span>Creating session...</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Activate Receiving
                              </>
                            )}
                          </button>
                        </div>
                      ) : receivedFiles.length > 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-4 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-medium text-gray-800">Received Files</h3>
                            <span className="text-sm font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                              {receivedFiles.length} {receivedFiles.length === 1 ? 'file' : 'files'}
                            </span>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto max-h-64 pr-1">
                            {receivedFiles.map((file, index) => (
                              <div 
                                key={index} 
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 shadow-sm transition-all hover:shadow-md"
                              >
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{file.fileName}</p>
                                    <p className="text-xs text-gray-500">{file.timestamp}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <a 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-purple-600 hover:text-purple-800 p-1"
                                    title="Download"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                  </a>
                                  <button 
                                    onClick={() => removeReceivedFile(index)}
                                    className="text-gray-400 hover:text-red-600 p-1"
                                    title="Delete"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-purple-50 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center h-full">
                          <div className="mb-4">
                            <LoadingSpinner size={40} text="" />
                          </div>
                          <h3 className="text-lg font-medium text-purple-800 mb-2">
                            {sessionActive ? 'Waiting for files...' : 'Session inactive'}
                          </h3>
                          {sessionActive ? (
                            <div className="flex items-center justify-center space-x-1">
                              <motion.span 
                                animate={{ 
                                  opacity: [0, 1, 0],
                                  transition: { duration: 1.2, repeat: Infinity }
                                }}
                                className="text-purple-600 text-2xl"
                              >•</motion.span>
                              <motion.span 
                                animate={{ 
                                  opacity: [0, 1, 0],
                                  transition: { duration: 1.2, repeat: Infinity, delay: 0.4 }
                                }}
                                className="text-purple-600 text-2xl"
                              >•</motion.span>
                              <motion.span 
                                animate={{ 
                                  opacity: [0, 1, 0],
                                  transition: { duration: 1.2, repeat: Infinity, delay: 0.8 }
                                }}
                                className="text-purple-600 text-2xl"
                              >•</motion.span>
                            </div>
                          ) : (
                            <div className="text-red-500 text-sm font-medium">
                              Session may have expired or been closed
                            </div>
                          )}
                          <p className="text-sm text-gray-600 text-center mt-4">
                            {sessionActive 
                              ? 'Your files will appear here as they\'re received' 
                              : 'Please create a new session to receive files'}
                          </p>
                          
                          {checkingFiles && (
                            <div className="mt-4 text-xs text-purple-600 animate-pulse">
                              Checking for new files...
                            </div>
                          )}
                        </div>
                      )}
                </div>
              </div>
                  
                  <p className="text-gray-600 mt-6 text-center">
                    {!receiveSession 
                      ? 'Start a receiving session to get files directly from others'
                      : 'Have someone scan this QR code or visit the link to send you files'}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

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
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-md w-full relative border border-white/20"
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your file is ready to share!
                </h3>
                <p className="text-gray-600 mb-4 break-all text-sm">
                  {originalName}
                </p>
                
                <div className="mb-4 p-4 bg-white rounded-xl shadow-sm">
                  <QRCode value={shareUrl} size={160} className="mx-auto mb-4" />
                  <p className="text-sm text-gray-500">Scan to download</p>
                  
                  {isPreviewable && (
                    <button 
                      onClick={() => setShowPreview(true)}
                      className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors w-full flex items-center justify-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview File
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-white p-2 rounded-lg mb-4 shadow-sm">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-purple-600 font-medium text-sm"
                  />
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2 ${copied ? 'bg-green-500' : 'bg-purple-600'} text-white rounded-lg hover:opacity-90 active:opacity-100 transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center shadow-sm`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center shadow-sm flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="whitespace-nowrap">Open Page</span>
                  </a>
                  <button
                    onClick={resetShare}
                    className="py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center shadow-sm flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="whitespace-nowrap">Share Another</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Preview Modal */}
      {isPreviewable && (
        <PreviewModal 
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          fileName={originalName}
          url={previewUrl}
        />
      )}
    </div>
  )
}

