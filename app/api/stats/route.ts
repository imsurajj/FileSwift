import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Get all blobs
        const { blobs } = await list()

        // Calculate total size
        const totalBytes = blobs.reduce((sum, blob) => sum + blob.size, 0)
        const totalMB = (totalBytes / 1024 / 1024).toFixed(2)
        const totalGB = (totalBytes / 1024 / 1024 / 1024).toFixed(3)

        // Calculate percentage of 100GB limit
        const limitGB = 100
        const percentageUsed = ((parseFloat(totalGB) / limitGB) * 100).toFixed(2)

        return NextResponse.json({
            totalFiles: blobs.length,
            totalBytes,
            totalMB: `${totalMB} MB`,
            totalGB: `${totalGB} GB`,
            limit: `${limitGB} GB`,
            percentageUsed: `${percentageUsed}%`,
            remainingGB: `${(limitGB - parseFloat(totalGB)).toFixed(3)} GB`
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
