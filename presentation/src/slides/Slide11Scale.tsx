'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide11Scale.module.css'

const UD_PATH = 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z'
const UD_VB = '520 720 810 545'

function WatermarkUD({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox={UD_VB} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
        <path d={UD_PATH} fill="currentColor" />
      </svg>
    </div>
  )
}

export function Slide11Scale() {
  const { data } = useEditor()
  const slide = data.slide11

  return (
    <div className={styles.slide}>
      <WatermarkUD className={styles.mark1} />
      <WatermarkUD className={styles.mark2} />
      <div className={styles.content}>
        <Editable slideKey="slide11" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide11" path={['title']} tag="h1" className={styles.title} />
        <Editable slideKey="slide11" path={['body']} tag="p" className={styles.body} />
        <div className={styles.line} />
        <ul className={styles.list}>
          {slide.items.map((_, i) => (
            <Editable key={i} slideKey="slide11" path={['items', String(i)]} tag="li" className={styles.item} />
          ))}
        </ul>
      </div>
    </div>
  )
}
