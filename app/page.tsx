"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nanoid } from '@/lib/utils'
import { createSupabaseProvider } from '@/lib/SupabaseProvider'

export const runtime = 'edge'

export default function IndexPage() {
  const router = useRouter()
  const id = nanoid()

  useEffect(() => {
		const fetchUserData = async () => {
			const supabaseProvider = await createSupabaseProvider()
      let user = JSON.parse(localStorage.getItem('user') || '{}')

      if (!user) {
        user = await supabaseProvider.getUser()
        localStorage.setItem('user', JSON.stringify(user))
      }

      if (user) {
        // Fetch associated chats
        const chats = await supabaseProvider.getChats(user.id)
        localStorage.setItem('userChats', JSON.stringify(chats))

        // Fetch resources
        const resources = await supabaseProvider.getResources(user.id)
        localStorage.setItem('userResources', JSON.stringify(resources))

        // Fetch user profile
        const profile = await supabaseProvider.getUserProfile(user.id)
        localStorage.setItem('userProfile', JSON.stringify(profile))
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    router.push(`/lobby/${id}`)
  }, [router, id])

  return null
}
