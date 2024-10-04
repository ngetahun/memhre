export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export type Chat = Database['public']['Tables']['chats']['Row']
export type Resources = Database['public']['Tables']['resources']['Row']
export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string
          title: string
          description: string
          type: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: string
          content?: string
          created_at?: string
        }
      },
			chats: {
				Row: {
					id: string
					user_id: string
					payload: Json
					created_at: string
				}
				Insert: {
					id?: string
					user_id: string
					payload: Json
					created_at?: string
				}
				Update: {
					id?: string
					user_id?: string
					payload?: Json
					created_at?: string
				}
			}
    }
  }
}

