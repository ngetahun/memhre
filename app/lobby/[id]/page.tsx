"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClientComponentClient, User } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { Button } from '@/components/ui/button'
import UserProfile from '@/components/user-profile'

export default function LobbyPage({ params }: { params: { id: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        setIsAuthenticated(false)
        router.push('/login')
      } else {
        setUser(data.user)
      }
    }
    checkAuth()
  }, [router, supabase])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <UserProfile userId={params.id} />
    </div>
  )
}
