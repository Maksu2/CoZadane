import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // fetch tasks using Supabase client
    const { data, error } = await supabase.from('tasks').select('*').order('id', { ascending: false })
    if (error) throw error
    res.status(200).json(data)
  } catch (err:any) {
    res.status(500).json({ error: err.message })
  }
}
