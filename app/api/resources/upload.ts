import { NextApiRequest, NextApiResponse } from 'next'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { nanoid } from 'nanoid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerActionClient<Database>({ req, res })
  const { file } = req.body

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  const fileName = `${nanoid()}-${file.name}`
  const { data, error } = await supabase.storage.from('resources').upload(fileName, file)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const fileUrl = data?.Key ? supabase.storage.from('resources').getPublicUrl(data.Key).publicURL : null

  if (!fileUrl) {
    return res.status(500).json({ error: 'Failed to get file URL' })
  }

  res.status(200).json({ url: fileUrl })
}
