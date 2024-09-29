import { NextApiRequest, NextApiResponse } from 'next'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerActionClient<Database>({ req, res })

  if (req.method === 'POST') {
    const { title, description, type, content } = req.body
    const { error } = await supabase.from('resources').insert([{ title, description, type, content }])
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json({ message: 'Resource created successfully' })
  }

  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
