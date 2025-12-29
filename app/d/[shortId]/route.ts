import { redirect } from 'next/navigation'
import { urlMap } from '@/app/api/upload/route'

export async function GET(
    request: Request,
    { params }: { params: { shortId: string } }
) {
    const shortId = params.shortId

    // Get the actual blob URL from our map
    const blobUrl = urlMap.get(shortId)

    if (blobUrl) {
        // Redirect to the actual Vercel Blob URL
        redirect(blobUrl)
    } else {
        // If not found, redirect to home
        redirect('/')
    }
}
