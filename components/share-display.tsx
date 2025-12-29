"use client"

import QRCode from "react-qr-code"
import { Copy, Check, ExternalLink, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

interface ShareDisplayProps {
    url: string
    title: string
    description?: string
}

export function ShareDisplay({ url, title, description }: ShareDisplayProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        toast.success("Link copied!")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'FileSwift',
                    text: 'Share files with me',
                    url: url,
                })
            } catch (err) {
                console.log('Share cancelled')
            }
        } else {
            handleCopy()
        }
    }

    return (
        <div className="flex flex-col w-full space-y-4">
            <div className="text-center space-y-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>

            {/* Desktop: Side by side, Mobile: Stacked */}
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                {/* QR Code */}
                <div className="flex-shrink-0 p-3 bg-white rounded-lg border md:w-1/2">
                    <QRCode value={url} size={162} className="w-full h-auto" />
                </div>

                {/* Link and Actions */}
                <div className="w-full space-y-3 flex-1">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Share Link</label>
                        <Input value={url} readOnly className="text-xs font-mono" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            className="w-auto"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2 text-green-500" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Link
                                </>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            className="w-auto"
                            onClick={handleShare}
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>

                        <Button
                            variant="outline"
                            className="w-auto"
                            asChild
                        >
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open
                            </a>
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        Scan QR code or use the link above
                    </p>
                </div>
            </div>
        </div>
    )
}
