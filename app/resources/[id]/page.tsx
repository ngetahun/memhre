'use client'

import { useEffect, useState } from 'react'
import ResourceTimeline from '@/components/ResourceTimeline'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

export default function ResourcesPage() {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const loadResources = async () => {
      const storedResources = localStorage.getItem('userResources')
      if (storedResources) {
        setResources(JSON.parse(storedResources))
      } else {
        const response = await fetch('/api/resources')
        const data = await response.json()
        setResources(data)
        localStorage.setItem('userResources', JSON.stringify(data))
      }
    }

    loadResources()
  }, [])

  return (
    <Sheet>
      <SheetHeader>
        <h1>Resources</h1>
      </SheetHeader>
      <SheetContent>
        <ResourceTimeline resources={resources} userId="someUserId" />
      </SheetContent>
    </Sheet>
  )
}
