"use client"

import { useState, useCallback } from "react"
import { UploadCloud, File, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
    onFileSelect: (file: File) => void
    selectedFile: File | null
    onClear: () => void
}

export function FileDropzone({ onFileSelect, selectedFile, onClear }: FileDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0])
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0])
        }
    }

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!selectedFile ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="dropzone"
                    >
                        <label
                            htmlFor="file-upload"
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all bg-muted/30 hover:bg-muted/50",
                                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center text-center px-4">
                                <UploadCloud className={cn("w-10 h-10 mb-3", isDragging ? "text-primary" : "text-muted-foreground")} />
                                <p className="mb-1 text-sm font-medium">
                                    Click or drag file here
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Any file format
                                </p>
                            </div>
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileInput}
                            />
                        </label>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="file-preview"
                        className="relative w-full h-48 rounded-lg border bg-card p-4 flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={onClear}
                            className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                            <File className="w-8 h-8" />
                        </div>
                        <h3 className="text-sm font-medium max-w-[90%] truncate">
                            {selectedFile.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
