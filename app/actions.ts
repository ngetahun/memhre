import { createSupabaseProvider } from '@/lib/SupabaseProvider'
import { Chat } from '@/lib/types';

export async function getChats(userId?: string | null) {
  const supabaseProvider = await createSupabaseProvider()
  return await supabaseProvider.getChats(userId)
}

export async function getChat(id: string) {
  const supabaseProvider = await createSupabaseProvider()
  return await supabaseProvider.getChat(id)
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const supabaseProvider = await createSupabaseProvider()
  return await supabaseProvider.removeChat(id, path)
}

export async function clearChats() {
  const supabaseProvider = await createSupabaseProvider()
  return await supabaseProvider.clearChats()
}

export async function getSharedChat(id: string) {
  const supabaseProvider = await createSupabaseProvider()
  return await supabaseProvider.getSharedChat(id)
}

export async function shareChat(chat: Chat, sharePath: string) {
  const supabaseProvider = await createSupabaseProvider()
  return await supabaseProvider.shareChat(chat)
}

export async function logout() {
  const supabaseProvider = await createSupabaseProvider()
  return await supabaseProvider.logout()
}
