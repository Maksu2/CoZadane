import { useEffect, useState } from 'react'
import TutorialStep from './TutorialStep'

interface Step { target: React.RefObject<HTMLElement>; text:string }

export default function TutorialTour({ steps, dark }:{ steps:Step[]; dark:boolean }) {
  const [i,setI] = useState(0)
  const [visible,setVisible] = useState(false)

  useEffect(()=>{
    // auto reset w dev
    if (process.env.NODE_ENV === 'development') {
      localStorage.removeItem('seenTutorial')
    }
    const seen = localStorage.getItem('seenTutorial')
    if (!seen) setVisible(true)
  },[])

  const next = ()=>{
    if (i+1 < steps.length) setI(i+1)
    else { setVisible(false); localStorage.setItem('seenTutorial','1') }
  }

  if (!visible || i >= steps.length) return null
  const rect = steps[i].target.current?.getBoundingClientRect()
  if (!rect) return null
  const top = rect.top + window.scrollY + rect.height + 10
  const left = rect.left + window.scrollX + Math.max(0, (rect.width/2 - 130))

  return <TutorialStep top={top} left={left} text={steps[i].text} onNext={next} dark={dark} />
}