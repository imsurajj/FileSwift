"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { RefreshCw, CheckCircle, Upload } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export default function UploadPage() {
    const params = useParams()
    const sessionId = params?.sessionId as string

    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

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
            setDownloadUrl(data.downloadUrl)
            toast.success("File uploaded successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to upload file")
        } finally {
            setUploading(false)
        }
    }

    const copyLink = () => {
        if (downloadUrl) {
            navigator.clipboard.writeText(downloadUrl)
            toast.success("Download link copied!")
        }
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
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">
                            {downloadUrl ? "Upload Complete!" : "Upload a File"}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                            Session: {sessionId}
                        </p>
                    </div>

                    {!downloadUrl ? (
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
                                        Uploading...
                                    </>
                                ) : (
                                    "Upload File"
                                )}
                            </Button>

                            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-center text-blue-600">
                                Your file will be uploaded to secure cloud storage
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-center py-6 space-y-3">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <p className="text-sm font-medium">File Uploaded Successfully!</p>
                                <p className="text-xs text-muted-foreground text-center px-4">
                                    Share this download link with the receiver
                                </p>
                            </div>

                            <div className="p-3 rounded-lg bg-muted border">
                                <p className="text-xs font-mono break-all">{downloadUrl}</p>
                            </div>

                            <Button
                                size="default"
                                variant="default"
                                className="w-full"
                                onClick={copyLink}
                            >
                                Copy Download Link
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full"
                                onClick={() => { setFile(null); setDownloadUrl(null); }}
                            >
                                Upload Another
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <p className="mt-6 text-xs text-muted-foreground">Powered by FileSwift</p>
        </div>
    )
}
