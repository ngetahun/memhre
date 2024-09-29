import { type Message } from 'ai'

// TODO refactor and remove unneccessary duplicate data.
export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string // Refactor to use RLS
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface UserProfileContent {
  name: string;
  email: string;
  phone: string;
  joined: string;
  location: string;
  company: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  content: UserProfileContent;
  created_at: string;
}
