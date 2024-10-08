'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Database } from '@/lib/db_types'

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> {
  action: 'sign-in' | 'sign-up'
}

export function LoginForm({
  className,
  action = 'sign-in',
  ...props
}: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient<Database>({
		cookieOptions: { name: 'supabase-auth-token' }
	})


  const [formState, setFormState] = React.useState<{
    email: string
    password: string
  }>({
    email: '',
    password: ''
  })

  const signIn = async () => {
    const { email, password } = formState;
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message)
      return { data: null, error }
    }
    return { data: data.session, error: null }
  };

  const signUp = async () => {
    const { email, password } = formState
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/api/auth/callback` }
    })

    if (!error && !data.session)
      toast.success('Check your inbox to confirm your email address!')
    return {data: data, error: error}
  }

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    setIsLoading(true)

    const result = action === 'sign-in' ? await signIn() : await signUp()

    if (result.error) {
      setIsLoading(false)
      toast.error(result.error.message)
      return
    }

    if (result.data && result.data.user) {
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    setIsLoading(false)
    router.push('/')
  }

  return (
    <div {...props}>
      <form onSubmit={handleOnSubmit}>
        <fieldset className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              value={formState.email}
              onChange={e =>
                setFormState(prev => ({
                  ...prev,
                  email: e.target.value
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={e =>
                setFormState(prev => ({
                  ...prev,
                  password: e.target.value
                }))
              }
            />
          </div>
        </fieldset>

        <div className="mt-4 flex items-center">
          <Button disabled={isLoading}>
            {isLoading && <IconSpinner className="mr-2 animate-spin" />}
            {action === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </Button>
          <p className="ml-4">
            {action === 'sign-in' ? (
              <>
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="font-medium">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/sign-in" className="font-medium">
                  Sign In
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  )
}
