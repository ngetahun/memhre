"use client"
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database, UserProfile } from '@/lib/db_types'
import { Button } from '@/components/ui/button'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

export default function UserProfile({ userId }: { userId: string }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [metrics, setMetrics] = useState({
    totalOrders: 9,
    lifetimeValue: 49.00,
    tasksCompleted: 23,
    totalProjects: 5,
    interactionData: [12, 19, 3, 5, 2, 3]
  })
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data, error } = await supabase.from('user_profiles').select('*').eq('user_id', userId).single()
      if (error) {
        console.error(error)
      } else {
        setUserProfile(data)
      }
    }
    fetchUserProfile()
  }, [supabase, userId])

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Interactions',
        data: metrics.interactionData,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  }

  if (!userProfile) {
    return <div>Loading...</div>
  }

  const { name, email, phone, joined, location, company } = userProfile.content

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{company}</p>
          </div>
          <div className="flex space-x-2">
            <Button>Send Message</Button>
            <Button>Edit</Button>
            <Button>Share</Button>
            <Button>Delete</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Email</p>
            <p className="text-gray-700">{email}</p>
          </div>
          <div>
            <p>Phone</p>
            <p className="text-gray-700">{phone}</p>
          </div>
          <div>
            <p>Joined</p>
            <p className="text-gray-700">{new Date(joined).toLocaleDateString()}</p>
          </div>
          <div>
            <p>Location</p>
            <p className="text-gray-700">{location}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p>Total Orders</p>
            <p className="text-2xl font-bold">{metrics.totalOrders}</p>
          </div>
          <div>
            <p>Lifetime Value</p>
            <p className="text-2xl font-bold">${metrics.lifetimeValue.toFixed(2)}</p>
          </div>
          <div>
            <p>Tasks Completed</p>
            <p className="text-2xl font-bold">{metrics.tasksCompleted}</p>
          </div>
          <div>
            <p>Total Projects</p>
            <p className="text-2xl font-bold">{metrics.totalProjects}</p>
          </div>
        </div>
        <div>
          <Line data={data} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Activity</h3>
          <p>Robert Fox moved Dark mode date picker for review</p>
          <p>Robert Fox commented: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
          <p>Robert Fox invited Wade Warren to Mesh Gradient Pack</p>
        </div>
      </div>
    </div>
  )
}
