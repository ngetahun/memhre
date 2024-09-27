import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to check if user is logged in
export const isUserLoggedIn = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session?.user
}
