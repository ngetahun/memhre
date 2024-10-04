'use server'
import { createServerActionClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { redirect } from 'next/navigation'
import { Chat, UserProfile, Resource } from '@/lib/types'


export async function createSupabaseProvider() {
  return new SupabaseProvider();
}

class SupabaseProvider {
  private supabase!: ReturnType<typeof createClientComponentClient<Database, 'public', any>>

  constructor() {
    // Client-side initialization
    this.supabase = createClientComponentClient<Database, 'public', any>({
      cookieOptions: { name: 'supabase-auth-token' }
    })
  }

  async getUser() {
    const { data: { user } } = await this.supabase.auth.getUser()
    return user
  }

  async getChats(userId?: string | null): Promise<Chat[]> {
    if (!userId) return []
    const { data } = await this.supabase
      .from('chats')
      .select('payload')
      .order('payload->createdAt', { ascending: false })
      .eq('user_id', userId)
      .throwOnError()
    return (data?.map(entry => entry.payload) as Chat[]) ?? []
  }

  async getChat(id: string): Promise<Chat | null> {
    const { data } = await this.supabase
      .from('chats')
      .select('payload')
      .eq('id', id)
      .maybeSingle()
    return (data?.payload as Chat) ?? null
  }

  async removeChat(id: string, path: string): Promise<void> {
    await this.supabase.from('chats').delete().eq('id', id).throwOnError()
    return redirect(path)
  }

  async clearChats(): Promise<void> {
    await this.supabase.from('chats').delete().throwOnError()
    return redirect('/')
  }

  async getSharedChat(id: string): Promise<Chat | null> {
    const { data } = await this.supabase
      .from('chats')
      .select('payload')
      .eq('id', id)
      .not('payload->sharePath', 'is', null)
      .maybeSingle()
    return (data?.payload as Chat) ?? null
  }

  async shareChat(chat: Chat): Promise<Chat> {
    const payload = { ...chat, sharePath: `/share/${chat.id}` }
    await this.supabase
      .from('chats')
      .update({ payload: payload as any })
      .eq('id', chat.id)
      .throwOnError()
    return payload
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut()
    return redirect('/sign-in')
  }

  async getResources(userId: string): Promise<Resource[]> {
    const { data } = await this.supabase
      .from('resources')
      .select('*')
      .eq('user_id', userId)
      .throwOnError()
    return data ?? []
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
      .throwOnError()
    return data ?? null
  }
}
