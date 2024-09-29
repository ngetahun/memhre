"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

export default function IndexPage() {
  const router = useRouter()
  const id = nanoid()

  useEffect(() => {
    router.push(`/lobby/${id}`)
  }, [router, id])

  return null
}
