import { NextResponse } from 'next/server'
import { saveUrl } from '@/lib/db'

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8)
}

export async function POST(request: Request) {
  const { url } = await request.json()

  if (!url) {
    return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 })
  }

  const shortCode = generateShortCode()
  saveUrl(shortCode, url)

  return NextResponse.json({ shortCode })
}
