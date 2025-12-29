import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

// Simple in-memory storage for blob URLs (for demo - in production use Vercel KV)
const urlMap = new Map<string, string>()

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const sessionId = formData.get('sessionId') as string | null

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Add session ID to filename if provided (for receive workflow)
        const filename = sessionId ? `session-${sessionId}-${file.name}` : file.name

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
            addRandomSuffix: true,
        })

        // Create short ID for cleaner URLs
        const shortId = Math.random().toString(36).substring(2, 10)

        // Store mapping (in production, use Vercel KV or database)
        urlMap.set(shortId, blob.downloadUrl)

        // Generate clean download URL using our domain
        const origin = request.headers.get('origin') || 'https://fileswift.vercel.app'
        const cleanDownloadUrl = `${origin}/d/${shortId}`

        return NextResponse.json({
            url: blob.url,
            downloadUrl: cleanDownloadUrl, // Clean short URL
            blobUrl: blob.downloadUrl, // Original blob URL as backup
            pathname: blob.pathname,
            sessionId: sessionId || null,
            filename: file.name,
            shortId
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}

// Export the map for the download route to access
export { urlMap }
