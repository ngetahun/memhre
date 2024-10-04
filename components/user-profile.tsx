"use client"
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { Button } from '@/components/ui/button'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Link from 'next/link'

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface UserProfileContent {
	id: string
	user_id: string
	created_at: string
	content: {
		name: string;
		email: string;
		phone: string;
		joined: string;
		location: string;
		company: string;
	}
}

export default function UserProfile({ userId }: { userId: string }) {
  const [userProfile, setUserProfile] = useState<UserProfileContent>()
  const [error, setError] = useState<string | null>(null)
  const hasError = () => { return error !== null }
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
      let userProfile
      userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      if (!userProfile) {
        let user = JSON.parse(localStorage.getItem('user') || '{}');
        let { data: profile, error: error } = await supabase.from('user_profiles').select('*').eq('user_id', user.id).single()
        if (profile) {
          userProfile = profile
        }
        else if (error) {
          setError(error.message)
          console.log(error)
        }
      }

      setUserProfile(userProfile as UserProfileContent)
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

  const { name, email, phone, location, company } = userProfile?.content || {}
  return (
    hasError() ? (<div>{error}</div>) : (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
          <div className="w-full max-w-4xl p-8 space-y-8 rounded bg-gray-900 shadow-md">
            <div className="flex items-center justify-between">
              <div>
								<h2 className="text-2xl font-bold text-gray-200">{name}</h2>
								<p className="text-sm text-gray-400">{company}</p>
          		</div>
							<div className="flex space-x-2">
								<Button className="bg-gray-700 text-gray-200">Send Message</Button>
								<Button className="bg-gray-700 text-gray-200">Edit</Button>
								<Button className="bg-gray-700 text-gray-200">Share</Button>
								<Button className="bg-gray-700 text-gray-200">Delete</Button>
							</div>
        		</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-gray-400">Email</p>
								<p className="text-gray-200">{email}</p>
							</div>
							<div>
								<p className="text-gray-400">Phone</p>
								<p className="text-gray-200">{phone}</p>
							</div>
							<div>
								<p className="text-gray-400">Joined</p>
								<p className="text-gray-200">{userProfile ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}</p>
							</div>
							<div>
								<p className="text-gray-400">Location</p>
								<p className="text-gray-200">{location || 'N/A'}</p>
							</div>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
							<div>
								<p className="text-gray-400">Total Orders</p>
								<p className="text-2xl font-bold text-gray-200">{metrics.totalOrders}</p>
							</div>
							<div>
								<p className="text-gray-400">Lifetime Value</p>
								<p className="text-2xl font-bold text-gray-200">${metrics.lifetimeValue.toFixed(2)}</p>
							</div>
							<div>
								<p className="text-gray-400">Tasks Completed</p>
								<p className="text-2xl font-bold text-gray-200">{metrics.tasksCompleted}</p>
							</div>
							<div>
								<p className="text-gray-400">Total Projects</p>
								<p className="text-2xl font-bold text-gray-200">{metrics.totalProjects}</p>
							</div>
						</div>
						<div>
							<Line data={data} />
						</div>
						<div>
							<h3 className="text-xl font-bold text-gray-200">Activity</h3>
							<p className="text-gray-200">Robert Fox moved Dark mode date picker for review</p>
							<p className="text-gray-200">Robert Fox commented: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
							<p className="text-gray-200">Robert Fox invited Wade Warren to Mesh Gradient Pack</p>
						</div>
						<div>
							<Link href={`/resources/${userProfile?.id}`} legacyBehavior>
								<a className="text-blue-500">View Resources</a>
							</Link>
						</div>
					</div>
				</div>
			</>
		)
	)
}
