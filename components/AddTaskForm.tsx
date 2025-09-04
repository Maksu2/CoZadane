import { useState } from 'react'
import styled from 'styled-components'
import { supabase } from '../lib/supabaseClient'

const Form = styled.form<{dark:boolean}>`
  display:flex; flex-wrap:wrap; gap:.6rem; margin-bottom:1.2rem;
  background:${({dark})=> dark ? '#2C2C2E' : '#FFFFFF'};
  padding: .9rem; border-radius: 18px;
  box-shadow:${({dark})=> dark ? '0 4px 14px rgba(0,0,0,.5)' : '0 4px 14px rgba(0,0,0,.08)'};
`

const Input = styled.input<{dark:boolean}>`
  flex: 1 1 220px;
  padding: .65rem .9rem; border-radius: 12px; border: 1px solid #D1D1D6;
  background:${({dark})=> dark ? '#3A3A3C' : '#F9F9FB'};
  color:${({dark})=> dark ? '#FFFFFF' : '#111114'};
  &:focus { outline:none; border-color:#0A84FF; box-shadow:0 0 0 3px rgba(10,132,255,.2); }
`

const Button = styled.button`
  padding:.65rem 1.2rem; border-radius:12px; border:none;
  background:#0A84FF; color:#fff; cursor:pointer; font-weight:600;
  transition:.2s; &:hover{ filter:brightness(.95); }
`

export default function AddTaskForm({ onTaskAdded, dark }:{ onTaskAdded:(t:any)=>void, dark:boolean }){
  const [subject,setSubject]=useState('')
  const [description,setDescription]=useState('')
  const [due,setDue]=useState('')

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()
    if(!subject||!description||!due) return
    const {data,error}=await supabase.from('tasks').insert([{subject,description,due_date:due}]).select()
    if(!error && data) onTaskAdded(data[0])
    setSubject(''); setDescription(''); setDue('')
  }

  return (
    <Form dark={dark} onSubmit={handleSubmit}>
      <Input dark={dark} placeholder="Przedmiot" value={subject} onChange={e=>setSubject(e.target.value)} />
      <Input dark={dark} placeholder="Opis" value={description} onChange={e=>setDescription(e.target.value)} />
      <Input dark={dark} type="date" value={due} onChange={e=>setDue(e.target.value)} />
      <Button type="submit">Dodaj</Button>
    </Form>
  )
}