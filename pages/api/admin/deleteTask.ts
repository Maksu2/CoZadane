import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { id } = req.body
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) throw error
    res.status(200).json({ success: true })
  } catch (err:any) {
    res.status(500).json({ error: err.message })
  }
}