"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { ShareDisplay } from "@/components/share-display"
import { Send, Download, ArrowRight, RefreshCw, Upload, File as FileIcon } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { getFilesBySession, downloadFile, type StoredFile } from "@/lib/storage"

export default function Home() {
  // Send State
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)

  // Receive State
  const [receiveSessionId, setReceiveSessionId] = useState<string | null>(null)
  const [receivedFiles, setReceivedFiles] = useState<StoredFile[]>([])
  const [loading, setLoading] = useState(false)
  const [previousFileCount, setPreviousFileCount] = useState(0)

  // Handlers
  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      // Create a unique session ID for this file
      const shareId = Math.random().toString(36).substring(2, 10)

      // Store file in IndexedDB using the storage library
      const { saveFile } = await import('@/lib/storage')
      await saveFile(shareId, file)

      // Create shareable link
      const origin = window.location.origin
      setShareUrl(`${origin}/u/${shareId}`)

      toast.success("File ready to share!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to prepare file.")
    } finally {
      setUploading(false)
    }
  }

  const handleCreateReceiveSession = () => {
    const sessionId = Math.random().toString(36).substring(2, 10)
    setReceiveSessionId(sessionId)
    // Store session in localStorage
    localStorage.setItem('current-receive-session', sessionId)
    toast.success("Receive link created!")
  }

  const fetchReceivedFiles = async (sessionId: string) => {
    setLoading(true)
    try {
      const files = await getFilesBySession(sessionId)

      // Check for new files and show notification
      if (files.length > previousFileCount && previousFileCount > 0) {
        const newFilesCount = files.length - previousFileCount
        toast.success(`${newFilesCount} new file${newFilesCount > 1 ? 's' : ''} received!`)
      }

      setPreviousFileCount(files.length)
      setReceivedFiles(files)
    } catch (error) {
      console.error("Failed to fetch files:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (file: StoredFile) => {
    try {
      await downloadFile(file)
      toast.success("Download started!")
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download file")
    }
  }

  useEffect(() => {
    if (receiveSessionId) {
      fetchReceivedFiles(receiveSessionId)
      // Poll for new files every 2 seconds
      const interval = setInterval(() => {
        fetchReceivedFiles(receiveSessionId)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [receiveSessionId])

  // Check for existing receive session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('current-receive-session')
    if (savedSession) {
      setReceiveSessionId(savedSession)
    }
  }, [])

  const resetSend = () => {
    setFile(null)
    setShareUrl(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      {/* Compact Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">FileSwift</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Share Files Instantly</h1>
          <p className="text-sm text-muted-foreground">
            Send and receive files directly in your browser
          </p>
        </div>

        <Tabs defaultValue="send" className="w-full" onValueChange={() => {
          // Reset send state
          setFile(null)
          setShareUrl(null)
          // Reset receive state
          setReceiveSessionId(null)
          setReceivedFiles([])
          setPreviousFileCount(0)
          localStorage.removeItem('current-receive-session')
        }}>
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50">
            <TabsTrigger
              value="send"
              className="text-sm data-[state=active]:bg-muted/80 data-[state=active]:font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </TabsTrigger>
            <TabsTrigger
              value="receive"
              className="text-sm data-[state=active]:bg-muted/80 data-[state=active]:font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Receive
            </TabsTrigger>
          </TabsList>

          {/* SEND TAB */}
          <TabsContent value="send">
            <Card>
              <CardContent className="p-4">

                {!shareUrl ? (
                  <div className="space-y-4">
                    <FileDropzone
                      onFileSelect={setFile}
                      selectedFile={file}
                      onClear={() => setFile(null)}
                    />

                    <Button
                      size="default"
                      className="w-full"
                      disabled={!file || uploading}
                      onClick={handleUpload}
                    >
                      {uploading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Preparing...
                        </>
                      ) : (
                        <>
                          Generate Share Link
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ShareDisplay
                      url={shareUrl}
                      title="Ready to Share"
                      description="Scan QR or share link"
                    />
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-center">
                      <p className="text-orange-600 font-medium">⚠️ Keep this tab open</p>
                      <p className="text-orange-600/80 mt-1">File is stored in your browser. Closing this tab will remove the file.</p>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full" onClick={resetSend}>
                      Send another file
                    </Button>
                  </div>
                )}

              </CardContent>
            </Card>
          </TabsContent>

          {/* RECEIVE TAB */}
          <TabsContent value="receive">
            <Card>
              <CardContent className="p-4">
                {!receiveSessionId ? (
                  <div className="text-center space-y-4 py-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold">Receive Files</h2>
                      <p className="text-sm text-muted-foreground">Create a link for others to send you files</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <Download className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    <Button
                      size="default"
                      className="w-full mt-4"
                      onClick={handleCreateReceiveSession}
                    >
                      Start Receiving Files
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Show QR/Link first if no files, otherwise show files first */}
                    {receivedFiles.length === 0 ? (
                      <>
                        {/* Share Link & QR - Show prominently when no files */}
                        <ShareDisplay
                          url={`${window.location.origin}/u/${receiveSessionId}`}
                          title="Receive Link Ready"
                          description="Share this link to receive files"
                        />

                        {/* Empty state for files */}
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold">Received Files (0)</h3>
                          <div className="text-center py-8 space-y-3 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                            <div className="flex justify-center">
                              <div className="bg-muted/50 p-4 rounded-full">
                                <Download className="w-8 h-8 text-muted-foreground" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Waiting for files...</p>
                              <p className="text-xs text-muted-foreground mt-1">Files will appear here automatically</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Received Files List - Show First when files exist */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold">Received Files ({receivedFiles.length})</h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchReceivedFiles(receiveSessionId)}
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                  Refreshing...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Refresh
                                </>
                              )}
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {receivedFiles.map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="p-2 rounded-md bg-primary/10">
                                    <FileIcon className="w-4 h-4 text-primary flex-shrink-0" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <Button size="sm" variant="default" onClick={() => handleDownload(file)}>
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Share Link - Collapsible when files exist */}
                        <details className="group">
                          <summary className="cursor-pointer list-none">
                            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                              <span className="text-sm font-medium">View Share Link & QR Code</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                            </div>
                          </summary>
                          <div className="mt-3 p-4 rounded-lg border bg-card">
                            <ShareDisplay
                              url={`${window.location.origin}/u/${receiveSessionId}`}
                              title="Your Receive Link"
                              description="Share this to receive files"
                            />
                          </div>
                        </details>
                      </>
                    )}

                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-center text-blue-600">
                      Files are stored in your browser until you close this tab
                    </div>

                    <Button variant="ghost" size="sm" className="w-full" onClick={() => {
                      setReceiveSessionId(null)
                      setReceivedFiles([])
                      setPreviousFileCount(0)
                      localStorage.removeItem('current-receive-session')
                    }}>
                      Create new session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
