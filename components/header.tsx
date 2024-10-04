"use client"
import * as React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { clearChats, logout } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import SidebarList from '@/components/sidebar-list'
import {
  IconSeparator,
	IconSun
} from '@/components/ui/icons'
import { Session } from '@supabase/auth-helpers-nextjs'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClearHistory } from '@/components/clear-history'
import { UserMenu } from '@/components/user-menu'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const [session, setSession] = React.useState<Session | null>(null)
  const [authError, setAuthError] = React.useState(false)

  React.useEffect(() => {
    const getSession = async () => {
      try {
        const user = await auth({ cookieStore: {} })
        setSession({ user } as Session)
      } catch (error) {
        if (error instanceof Error && error.message.includes('AuthSessionMissingError')) {
          setAuthError(true)
          router.push('/sign-in') // Redirect to login page if session is missing
        } else {
          throw error
        }
      }
    }
    getSession()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/sign-in')
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {authError ? (
          <Link href="/">
						<IconSun className="mr-2 size-6 dark:hidden"/>
          </Link>
        ) : session ? (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <SidebarList userId={session.user.id} />
            </React.Suspense>
            <SidebarFooter>
              <ThemeToggle />
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
          </Sidebar>
        ) : (
          <Link href="/">
						<IconSun className="mr-2 size-6 dark:hidden"/>
          </Link>
        )}
        <div className="flex items-center">
          <IconSeparator className="size-6 text-muted-foreground/50" />
          {authError || !session ? (
            <Button variant="link" asChild className="-ml-2">
              <Link href="/sign-in">Login</Link>
            </Button>
          ) : (
            <UserMenu user={session.user} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
