import { NextResponse } from 'next/server'
import { getOriginalUrl } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { shortCode: string } }) {
  const originalUrl = getOriginalUrl(params.shortCode)

  if (originalUrl) {
    return NextResponse.redirect(originalUrl)
  } else {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
