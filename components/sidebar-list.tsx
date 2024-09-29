"use client"
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SidebarList({ userId }: { userId: string }) {
  const [chats, setChats] = useState<Database['public']['Tables']['chats']['Row'][]>([])
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase.from('chats').select('*').eq('user_id', userId)
      if (error) {
        console.error(error)
      } else {
        setChats(data)
      }
    }
    fetchChats()
  }, [supabase, userId])

  return (
    <div className="flex flex-col space-y-4">
      {chats.map(chat => (
        <Button key={chat.id} onClick={() => router.push(`/chat/${chat.id}`)}>
          {JSON.stringify(chat.payload)}
        </Button>
      ))}
    </div>
  )
}
