import styled from 'styled-components'

const Wrap = styled.button`
  position: fixed; top: 20px; right: 20px;
  width: 66px; height: 34px; padding: 4px;
  border: none; border-radius: 999px;
  background: transparent; cursor: pointer; z-index: 1200;
`

const Track = styled.div<{ dark: boolean }>`
  width: 100%; height: 100%; border-radius: 999px; padding: 3px;
  background: ${({ dark }) => (dark ? '#23262E' : '#E9EDF5')};
  box-shadow: inset 0 0 0 1px ${({ dark }) => (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)')};
  transition: background .25s ease;
  display: flex; align-items: center;
`

const Knob = styled.div<{ dark: boolean }>`
  width: 26px; height: 26px; border-radius: 50%;
  background: #fff; box-shadow: 0 6px 18px rgba(2,6,23,0.16);
  transform: ${({ dark }) => (dark ? 'translateX(32px)' : 'translateX(0)')};
  transition: transform .28s cubic-bezier(.2,.9,.2,1);
  display:flex; align-items:center; justify-content:center;
`

const Sun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="4" stroke="#9AA4B2" strokeWidth="1.6" />
    <g stroke="#9AA4B2" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2v2.6"/><path d="M12 19.4V22"/><path d="M2 12h2.6"/><path d="M19.4 12H22"/>
      <path d="M4.5 4.5l1.8 1.8"/><path d="M17.7 17.7l1.8 1.8"/>
      <path d="M17.7 6.3l1.8-1.8"/><path d="M4.5 19.5l1.8-1.8"/>
    </g>
  </svg>
)
const Moon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 12.3A8.3 8.3 0 1 1 11.7 2 6.3 6.3 0 0 0 21 12.3z" fill="#C4CAD5" />
  </svg>
)

export default function DarkModeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <Wrap aria-label="Przełącz tryb" onClick={toggle}>
      <Track dark={dark}><Knob dark={dark}>{dark ? <Moon/> : <Sun/>}</Knob></Track>
    </Wrap>
  )
}