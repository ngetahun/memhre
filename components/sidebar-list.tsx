"use client"
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createSupabaseProvider } from '@/lib/SupabaseProvider'
import { type Chat } from '@/lib/types'
export default function SidebarList({ userId }: { userId: string }) {
  const [chats, setChats] = useState<Chat[]>([])
  const router = useRouter()
  const supabase = createSupabaseProvider()

  useEffect(() => {
    const fetchChats = async () => {
      const data  = await (await supabase).getChats(userId)
      setChats(data)
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
