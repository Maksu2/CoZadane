import styled, { keyframes } from 'styled-components'
import { useState } from 'react'

const pop = keyframes`
  0% { opacity: 0; transform: translateY(12px) scale(.96); }
  60% { opacity: 1; transform: translateY(-2px) scale(1.015); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 1400;
  background: rgba(0,0,0,0.36); backdrop-filter: blur(4px);
  display: grid; place-items: center;
`

const Modal = styled.div<{ dark: boolean }>`
  width: min(520px, 92vw);
  border-radius: 18px;
  padding: 22px;
  background: ${({ dark }) => (dark ? '#15171B' : '#FFFFFF')};
  color: ${({ dark }) => (dark ? '#E7E9EE' : '#0F172A')};
  box-shadow: 0 24px 60px rgba(2,6,23,0.38);
  animation: ${pop} .34s cubic-bezier(.2,.9,.2,1);
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  row-gap: 14px;
`

const Title = styled.h3` margin:0; font-size:1.24rem; font-weight:700;`
const Field = styled.div` display: grid; row-gap: 8px; `
const Label = styled.label<{ dark: boolean }>`
  font-size: .9rem; color: ${({ dark }) => (dark ? '#A6AEBA' : '#6B7280')};
`
const baseInput = `
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #D1D5DB;
  background: var(--bg);
  color: var(--fg);
  font-size: 1rem;
  transition: box-shadow .18s ease, border-color .18s ease, background .18s ease;
  outline: none;
`
const Input = styled.input<{ dark: boolean }>`
  --bg: ${({ dark }) => (dark ? '#1E2127' : '#F8FAFC')};
  --fg: ${({ dark }) => (dark ? '#FFFFFF' : '#0F172A')};
  ${baseInput}
  &:focus { border-color: #7C82A0; box-shadow: 0 0 0 4px rgba(124,130,160,.18); }
`
const Textarea = styled.textarea<{ dark: boolean }>`
  --bg: ${({ dark }) => (dark ? '#1E2127' : '#F8FAFC')};
  --fg: ${({ dark }) => (dark ? '#FFFFFF' : '#0F172A')};
  ${baseInput}
  resize: vertical; min-height: 96px;
  &:focus { border-color: #7C82A0; box-shadow: 0 0 0 4px rgba(124,130,160,.18); }
`
const Row = styled.div` display:flex; gap:10px; justify-content:flex-end; margin-top: 4px; `
const Button = styled.button<{ tone?: 'primary' | 'ghost' | 'danger' }>`
  padding: 10px 14px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer;
  ${({ tone }) => {
    if (tone === 'danger') return 'background:#E05151;color:#fff;';
    if (tone === 'ghost') return 'background:transparent;color:#7C8697;border:1px solid rgba(124,134,151,.35);';
    return 'background: linear-gradient(135deg,#6B7280,#4B5563); color:#fff;';
  }}
  transition: filter .15s ease, transform .15s ease;
  &:hover { filter: brightness(.98); }
  &:active { transform: translateY(1px); }
`

export default function AddTaskModal({ dark, onClose, onTaskAdded }: { dark: boolean; onClose: () => void; onTaskAdded: (t: any) => void }) {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [due, setDue] = useState('')

  const submit = async () => {
    if (!subject || !description || !due) return
    try {
      const res = await fetch('/api/addTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, description, dueDate: due })
      })
      if (!res.ok) throw new Error('Błąd dodawania zadania')
      const data = await res.json()
      onTaskAdded(data)
      onClose()
      setSubject(''); setDescription(''); setDue('')
    } catch (err:any) {
      alert('Błąd dodawania zadania: ' + err.message)
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal dark={dark} onClick={e => e.stopPropagation()}>
        <Title>Dodaj zadanie</Title>

        <Field>
          <Label dark={dark} htmlFor="f-subj">Przedmiot</Label>
          <Input id="f-subj" dark={dark} value={subject} onChange={e => setSubject(e.target.value)} placeholder="Np. Matematyka" />
        </Field>

        <Field>
          <Label dark={dark} htmlFor="f-desc">Opis</Label>
          <Textarea id="f-desc" dark={dark} value={description} onChange={e => setDescription(e.target.value)} placeholder="Np. Zad. 3–7, str. 42" />
        </Field>

        <Field>
          <Label dark={dark} htmlFor="f-date">Na kiedy</Label>
          <Input id="f-date" type="date" dark={dark} value={due} onChange={e => setDue(e.target.value)} />
        </Field>

        <Row>
          <Button tone="ghost" onClick={onClose}>Anuluj</Button>
          <Button tone="primary" onClick={submit}>Dodaj</Button>
        </Row>
      </Modal>
    </Overlay>
  )
}