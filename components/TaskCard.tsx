import styled from 'styled-components'

const Card = styled.article<{ dark: boolean }>`
  background: ${({ dark }) => (dark ? '#15171B' : '#FFFFFF')};
  border-radius: 14px;
  padding: 14px;
  box-shadow: ${({ dark }) => (dark ? '0 8px 26px rgba(0,0,0,0.55)' : '0 8px 26px rgba(2,6,23,0.06)')};
  display:flex; flex-direction:column; gap:8px;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ dark }) => (dark ? '0 12px 34px rgba(0,0,0,0.6)' : '0 12px 34px rgba(2,6,23,0.12)')};
  }
`

const Subject = styled.h3<{ dark: boolean }>`
  margin: 0; font-size: 1.06rem; font-weight: 700;
  color: ${({ dark }) => (dark ? '#F5F7FB' : '#0B1220')};
`

const Desc = styled.p<{ dark: boolean }>`
  margin: 0; color: ${({ dark }) => (dark ? '#C9CED7' : '#4B5563')}; font-size: .98rem; line-height: 1.4;
`

const Meta = styled.div` margin-top:8px; font-size:.86rem; color:#8B93A7;`

function formatEU(iso?: string) {
  if (!iso) return ''
  const [y,m,d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export default function TaskCard({ task, dark }: { task: any; dark: boolean }) {
  const display = task.due_date_display || (task.due_date ? formatEU(task.due_date) : '')
  return (
    <Card dark={dark}>
      <Subject dark={dark}>{task.subject}</Subject>
      <Desc dark={dark}>{task.description}</Desc>
      <Meta>Na: {display}</Meta>
    </Card>
  )
}