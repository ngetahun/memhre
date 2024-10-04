import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import type { User } from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  }),
})

// Add type declarations for the user
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string
    }
  }
}


