import styled from 'styled-components'

const Fab = styled.button<{ dark: boolean }>`
  position: fixed; right: 22px; bottom: 22px;
  width: 62px; height: 62px; border-radius: 50%; border: none;
  display:flex; align-items:center; justify-content:center;
  font-size: 28px; color: white; cursor:pointer;
  background: ${({ dark }) => (dark
    ? 'linear-gradient(135deg,#3A3F4B,#272B34)'
    : 'linear-gradient(135deg,#6B7280,#4B5563)')};
  box-shadow: ${({ dark }) =>
    dark ? '0 18px 40px rgba(0,0,0,0.35)'
         : '0 14px 36px rgba(15,23,42,0.18)'};
  transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
  &:hover { transform: translateY(-4px) scale(1.02); filter: brightness(1.02); }
  &:active { transform: translateY(-1px) scale(.98); }
`

export default function AddButton({ dark, onClick }: { dark: boolean; onClick: () => void }) {
  return <Fab dark={dark} onClick={onClick} aria-label="Dodaj">+</Fab>
}