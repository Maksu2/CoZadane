import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { subject, description, dueDate } = req.body
  if (!subject || !description || !dueDate) return res.status(400).json({ error: 'Brak danych' })

  // Pobranie IP użytkownika
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'

  console.log('BODY:', req.body)
  console.log('IP:', ip)

  try {
    const { data, error } = await supabase.from('tasks').insert([{
      subject,
      description,
      due_date: dueDate,
      creator_ip: typeof ip === 'string' ? ip : ip?.[0] || 'unknown',
      created_at: new Date().toISOString()
    }]).select()

    if (error) throw error

    res.status(200).json(data[0])
  } catch (err:any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}