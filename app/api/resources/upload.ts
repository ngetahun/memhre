import { NextApiRequest, NextApiResponse } from 'next'
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const supabase = createServerComponentClient<Database>({ cookies: () => cookies() })
  const { file } = req.body

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  const fileName = `${nanoid()}-${file.name}`
  const { data, error } = await supabase.storage.from('resources').upload(fileName, file)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const fileUrl = data?.path ? supabase.storage.from('resources').getPublicUrl(data.path).data.publicUrl : null

  if (!fileUrl) {
    return res.status(500).json({ error: 'Failed to get file URL' })
  }

  res.status(200).json({ url: fileUrl })
}
