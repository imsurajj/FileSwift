import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get('sessionId')

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
        }

        // Get all blobs
        const { blobs } = await list()

        // Filter blobs by session ID in pathname (prefix matching)
        const sessionFiles = blobs
            .filter(blob => blob.pathname.includes(`session-${sessionId}-`))
            .map(blob => ({
                url: blob.url,
                downloadUrl: blob.downloadUrl,
                pathname: blob.pathname,
                // Extract original filename
                filename: blob.pathname.replace(`session-${sessionId}-`, '').split('-').slice(0, -1).join('-') + '.' + blob.pathname.split('.').pop(),
                size: blob.size,
                uploadedAt: blob.uploadedAt
            }))

        return NextResponse.json({ files: sessionFiles })
    } catch (error) {
        console.error('Error fetching session files:', error)
        return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
    }
}
