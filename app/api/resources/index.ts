import { NextApiRequest, NextApiResponse } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/db_types'
import { cookies } from 'next/headers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerComponentClient<Database>({ cookies: () => cookies() })

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('resources').select('*')
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json(data)
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
