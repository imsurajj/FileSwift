"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileDropzone } from "@/components/file-dropzone"
import { ShareDisplay } from "@/components/share-display"
import { Send, Download, ArrowRight, RefreshCw, Upload, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  // Send State
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)

  // Receive State
  const [receiveSessionId, setReceiveSessionId] = useState<string | null>(null)

  // Stats State
  const [totalFiles, setTotalFiles] = useState<number>(0)
  const [totalGB, setTotalGB] = useState<string>("0 GB")

  // Fetch total GB transferred
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setTotalFiles(data.totalFiles || 0)
        setTotalGB(data.totalGB || "0 GB")
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  // Fetch stats on mount
  useEffect(() => {
    fetchStats()
  }, [])

  // Upload file to Vercel Blob and get shareable link
  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setShareUrl(data.downloadUrl)

      toast.success("File uploaded! Share the link below")

      // Refresh stats after upload
      fetchStats()
    } catch (error) {
      console.error(error)
      toast.error("Failed to upload file")
    } finally {
      setUploading(false)
    }
  }

  // Create receive session
  const handleCreateReceiveSession = () => {
    const sessionId = Math.random().toString(36).substring(2, 10)
    setReceiveSessionId(sessionId)
    toast.success("Receive link created!")
  }

  const resetSend = () => {
    setFile(null)
    setShareUrl(null)
  }

  const resetReceive = () => {
    setReceiveSessionId(null)
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

          {/* Total Data Transferred Badge */}
          <Badge variant="secondary" className="flex items-center gap-1.5">
            <Send className="w-3 h-3" />
            <span className="text-xs font-medium">{totalFiles.toLocaleString()} files • {totalGB}</span>
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Send/Receive Files Instantly</h1>
          <p className="text-sm text-muted-foreground">
            Send files or create a receive link • 100% Free
          </p>
        </div>

        <Tabs defaultValue="send" className="w-full">
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
                          Uploading...
                        </>
                      ) : (
                        <>
                          Upload & Generate Link
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-center text-blue-600">
                      Files uploaded to secure cloud storage
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ShareDisplay
                      url={shareUrl}
                      title="File Ready!"
                      description="Share this link to download the file"
                    />

                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-center">
                      <p className="text-green-600 font-medium">✅ Upload Complete!</p>
                      <p className="text-green-600/80 mt-1">
                        Anyone with this link can download the file
                      </p>
                    </div>

                    <Button variant="ghost" size="sm" className="w-full" onClick={resetSend}>
                      Upload another file
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
                      <p className="text-sm text-muted-foreground">
                        Create a link for others to upload files to you
                      </p>
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
                      Create Receive Link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ShareDisplay
                      url={`${window.location.origin}/upload/${receiveSessionId}`}
                      title="Receive Link Ready"
                      description="Share this link and others can upload files to you"
                    />

                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-center">
                      <p className="text-blue-600 font-medium">📥 Ready to receive files!</p>
                      <p className="text-blue-600/80 mt-1">
                        Files will be uploaded and you'll get the download links
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-center">
                      <p className="text-orange-600 font-medium">Note: Check this page later</p>
                      <p className="text-orange-600/80 mt-1">
                        After someone uploads, they'll get a download link to share with you
                      </p>
                    </div>

                    <Button variant="ghost" size="sm" className="w-full" onClick={resetReceive}>
                      Create new session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 border text-xs space-y-2">
          <p className="font-semibold">✨ Features:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• 100% Free for User ( Adding More Features as well )</li>
            <li>• Files stored securely in the cloud</li>
            <li>• Download anytime with the link</li>
            <li>• No registration required</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
