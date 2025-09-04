import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
    if (Array.isArray(ip)) ip = ip[0]

    console.log('IP użytkownika:', ip)

    const { data, error } = await supabase
      .from('banned_ips')
      .select('ip')
      .eq('ip', ip) // filtrujemy od razu po IP

    if (error) throw error

    const isBanned = data && data.length > 0

    res.status(200).json({ banned: isBanned })
  } catch (err:any) {
    console.error('Błąd checkBan:', err)
    res.status(500).json({ error: err.message })
  }
}