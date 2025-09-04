// pages/qwedfgcvb/index.tsx
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [logs, setLogs] = useState<any[]>([])

  const fetchLogs = async () => {
    const res = await fetch('/api/admin/getLogs')
    if (res.ok) setLogs(await res.json())
  }

  const deleteTask = async (id: string) => {
    await fetch('/api/admin/deleteTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchLogs()
  }

  useEffect(() => { fetchLogs() }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: '-apple-system, system-ui, sans-serif', background:'#F2F2F7', minHeight:'100vh' }}>
      <h1 style={{ textAlign:'center', color:'#1C1C1E', marginBottom:'2rem' }}>Panel admina</h1>
      <ul style={{ listStyle:'none', padding:0, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1rem' }}>
        {logs.map(task => (
          <li key={task.id} style={{ background:'#FFF', padding:'1rem', borderRadius:'16px', boxShadow:'0 4px 12px rgba(0,0,0,0.08)', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            <p style={{ fontWeight:500, fontSize:'1.1rem' }}>{task.subject}</p>
            <p style={{ color:'#3C3C43' }}>{task.description}</p>
            <p style={{ fontSize:'0.85rem', color:'#8E8E93' }}>Na: {task.due_date}</p>
            <p style={{ fontSize:'0.8rem', color:'#8E8E93' }}>IP: {task.creator_ip || 'brak'}</p>
            <button onClick={() => deleteTask(task.id)} style={{ marginTop:'auto', padding:'0.5rem 1rem', borderRadius:'8px', background:'#FF3B30', color:'#fff', border:'none', cursor:'pointer' }}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  )
}