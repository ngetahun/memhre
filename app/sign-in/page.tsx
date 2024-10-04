import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { LoginForm } from '@/components/login-form'
import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  // const cookieStore = cookies()
  // let session
  // try {
  //   session = await auth({ cookieStore })
  // } catch (error) {
  //   console.log('Error during sign-in:', error) // Add this line
  // }
  // redirect to home if user is already logged in
  // if (session) {
  //   redirect('/')
  // }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center py-10">
      <div className="w-full max-w-sm">
        <LoginForm action="sign-in" />
        <Separator className="my-4" />
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  )
}
