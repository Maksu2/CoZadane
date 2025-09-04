import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { GlobalStyle } from '../styles/GlobalStyle'
import { supabase } from '../lib/supabaseClient'
import DarkModeToggle from '../components/DarkModeToggle'
import AddButton from '../components/AddButton'
import AddTaskModal from '../components/AddTaskModal'
import TaskCard from '../components/TaskCard'

const Shell = styled.main`
  max-width: 1200px; margin: 0 auto; padding-bottom: 120px;
`

const HeaderRow = styled.header`
  display:flex; justify-content:space-between; align-items:center;
  margin-bottom: 18px;
`

const Title = styled.h1`
  font-size: 1.6rem; margin:0; font-weight:700;
`

const appear = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

const Grid = styled.section`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  align-items: start;
  width: 100%;
  animation: ${appear} .24s ease;
`

const BannedOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: #1C1C1E;
  color: #FF3B30;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  font-family: -apple-system, system-ui, sans-serif;
  z-index: 9999;
`

export default function Home() {
  const [dark, setDark] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [banned, setBanned] = useState<boolean | null>(null)

  useEffect(() => {
    const s = localStorage.getItem('dark')
    if (s) setDark(s === '1')
    checkBan()
  }, [])

  const checkBan = async () => {
    try {
      const res = await fetch('/api/checkBan')
      const data = await res.json()
      if (data.banned) setBanned(true)
      else {
        setBanned(false)
        fetchTasks()
      }
    } catch {
      setBanned(false)
      fetchTasks()
    }
  }

  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*').order('due_date', { ascending: true })
    if (data) setTasks(data)
  }

  const addTaskToUI = (task: any) => {
    setTasks(prev => [task, ...prev])
  }

  const toggleDark = () => {
    const n = !dark
    setDark(n)
    localStorage.setItem('dark', n ? '1' : '0')
  }

  if (banned) {
    return <BannedOverlay>Zostałeś zbanowany</BannedOverlay>
  }

  return (
    <>
      <GlobalStyle dark={dark} />
      <DarkModeToggle dark={dark} toggle={toggleDark} />

      <Shell>
        <HeaderRow>
          <Title>Prace domowe</Title>
        </HeaderRow>

        <Grid>
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} dark={dark} />
          ))}
        </Grid>
      </Shell>

      <AddButton dark={dark} onClick={() => setOpen(true)} />
      {open && <AddTaskModal dark={dark} onClose={() => setOpen(false)} onTaskAdded={(t) => { addTaskToUI(t); setOpen(false) }} />}
    </>
  )
}