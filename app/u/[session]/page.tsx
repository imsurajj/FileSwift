"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { RefreshCw, CheckCircle, Upload, Download, File as FileIcon } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { saveFile, getFilesBySession, downloadFile, type StoredFile } from "@/lib/storage"

export default function GuestUploadPage() {
  const params = useParams()
  const session = params?.session as string

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Download mode state
  const [existingFiles, setExistingFiles] = useState<StoredFile[]>([])
  const [loading, setLoading] = useState(true)
  const [isDownloadMode, setIsDownloadMode] = useState(false)

  // Check if files exist for this session
  useEffect(() => {
    const checkForFiles = async () => {
      setLoading(true)
      try {
        const files = await getFilesBySession(session)
        if (files.length > 0) {
          setExistingFiles(files)
          setIsDownloadMode(true)
        }
      } catch (error) {
        console.error("Failed to check for files:", error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      checkForFiles()
    }
  }, [session])

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      // Save to IndexedDB
      await saveFile(session, file)
      setSuccess(true)
      toast.success("File sent successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to send file.")
    } finally {
      setUploading(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Toaster />

      <div className="mb-6 flex items-center gap-2">
        <Upload className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold">FileSwift</span>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="p-4 space-y-4">
          {isDownloadMode ? (
            // DOWNLOAD MODE - Files exist for this session
            <>
              <div className="text-center">
                <h2 className="text-lg font-semibold">Download Files</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {existingFiles.length} file{existingFiles.length > 1 ? 's' : ''} shared with you
                </p>
              </div>

              <div className="space-y-2">
                {existingFiles.map((file) => (
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
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-center text-blue-600">
                Files are stored in the sender's browser
              </div>
            </>
          ) : (
            // UPLOAD MODE - No files exist, allow sending
            <>
              <div className="text-center">
                <h2 className="text-lg font-semibold">
                  {success ? "File Sent!" : "Send a File"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {success ? "Your file has been delivered" : `Session: ${session}`}
                </p>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center py-6 space-y-3">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">Transfer Complete</p>
                  <p className="text-xs text-muted-foreground text-center px-4">
                    The receiver can download this file from their browser
                  </p>
                  <Button variant="outline" size="sm" onClick={() => { setSuccess(false); setFile(null); }}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <>
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
                        Sending...
                      </>
                    ) : (
                      "Send File"
                    )}
                  </Button>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-center text-blue-600">
                    File will be stored in the receiver's browser
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">Powered by FileSwift</p>
    </div>
  )
}
