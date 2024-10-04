"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClientComponentClient, User } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { Button } from '@/components/ui/button'
import UserProfile from '@/components/user-profile'

export default function LobbyPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <UserProfile userId={params.id} />
    </div>
  )
}
