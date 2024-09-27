import { useEffect, useState } from 'react'
import { supabase, isUserLoggedIn } from '../supabaseClient'
import { useRouter } from 'next/router'

export default function Lobby() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const loggedIn = await isUserLoggedIn()
      if (loggedIn) {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session.user)
        // Redirect to the lobby after sign-in
        router.push('/lobby')
      } else {
        // Redirect to login page if not authenticated
        router.push('/sign-in')
      }
    }

    checkUser()
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }
}
