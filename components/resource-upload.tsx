"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-hot-toast'

export default function ResourceUpload() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('file')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleUpload = async () => {
    if (type === 'file' && file) {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/resources/upload', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.error) {
        toast.error(data.error)
        return
      }
      setContent(data.url)
    }

    const response = await fetch('/api/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, type, content })
    })

    if (response.ok) {
      toast.success('Resource uploaded successfully')
      router.push('/resources')
    } else {
      toast.error('Failed to upload resource')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Upload Resource</h2>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="file">File</option>
            <option value="link">Link</option>
            <option value="chat">Chat</option>
          </select>
          {type === 'file' && (
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          )}
          {type !== 'file' && (
            <Input
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </div>
    </div>
  )
}
