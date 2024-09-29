"use client"
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ResourcePage({ params }: { params: { id: string } }) {
  const [resource, setResource] = useState(null)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const fetchResource = async () => {
      const { data, error } = await supabase.from('resources').select('*').eq('id', params.id).single()
      if (error) {
        console.error(error)
      } else {
        setResource(data)
      }
    }
    fetchResource()
  }, [supabase, params.id])

  if (!resource) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">{resource.title}</h2>
        <p>{resource.description}</p>
        {resource.type === 'chat' && (
          <Button onClick={() => router.push(`/chat/${resource.content}`)}>
            View Chat
          </Button>
        )}
        {resource.type === 'file' && (
          <a href={resource.content} target="_blank" rel="noopener noreferrer">
            <Button>Download File</Button>
          </a>
        )}
        {resource.type === 'link' && (
          <a href={resource.content} target="_blank" rel="noopener noreferrer">
            <Button>Visit Link</Button>
          </a>
        )}
      </div>
    </div>
  )
}
