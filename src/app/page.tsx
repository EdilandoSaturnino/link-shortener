'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Toaster, toast } from 'react-hot-toast'
import { ClipboardIcon, LinkIcon } from 'lucide-react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      if (response.ok) {
        setShortUrl(`${window.location.origin}/${data.shortCode}`)
        toast.success('URL shortened successfully!')
      } else {
        toast.error(data.error || 'Failed to shorten URL')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>URL Shortener</CardTitle>
          <CardDescription className='text-center'>Shorten your long URLs with ease</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='url'>Enter your long URL</Label>
              <div className='flex space-x-2'>
                <Input id='url' type='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='https://google.com.br' required className='flex-grow outline-none border-none bg-gray-100' />
                <Button type='submit' className='text-white bg-black'>
                  Shorten
                </Button>
              </div>
            </div>
          </form>
          {shortUrl && (
            <div className='mt-6 space-y-2'>
              <Label>Your shortened URL</Label>
              <div className='flex items-center space-x-2 bg-gray-100 p-2 rounded-md'>
                <LinkIcon className='text-gray-500' size={20} />
                <Input value={shortUrl} readOnly className='flex-grow bg-transparent border-none focus:outline-none' />
                <Button onClick={copyToClipboard}>
                  <ClipboardIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-sm text-gray-500'>Click the shortened URL to visit the original link</p>
        </CardFooter>
      </Card>
      <Toaster position='bottom-center' />
    </div>
  )
}
