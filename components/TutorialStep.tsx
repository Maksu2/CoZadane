import styled from 'styled-components'

const Overlay = styled.div`
  position:fixed; inset:0; background: rgba(0,0,0,0.35); z-index: 1200;
`

const Tooltip = styled.div<{top:number; left:number; dark:boolean}>`
  position:absolute; top:${p=>p.top}px; left:${p=>p.left}px;
  background: ${({dark})=> dark ? '#3A3A3C' : '#FFFFFF'};
  color: ${({dark})=> dark ? '#F2F2F7' : '#111114'};
  border-radius: 16px; padding: 12px 14px; max-width: 280px;
  box-shadow: 0 10px 24px rgba(0,0,0,.18);
  z-index: 1300;
`

const Ok = styled.button`
  margin-top: 8px; padding: 8px 12px; border-radius: 12px; border: none;
  background: #0A84FF; color:#fff; font-weight: 600; cursor: pointer;
`

export default function TutorialStep({
  top, left, text, onNext, dark
}:{ top:number; left:number; text:string; onNext:()=>void; dark:boolean }) {
  return (
    <>
      <Overlay onClick={onNext}/>
      <Tooltip top={top} left={left} dark={dark}>
        {text}
        <Ok onClick={onNext}>OK</Ok>
      </Tooltip>
    </>
  )
}