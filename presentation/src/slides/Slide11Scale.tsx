'use client'

import { slide11 } from '@/src/data/slides'
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
  return (
    <div className={styles.slide}>
      <WatermarkUD className={styles.mark1} />
      <WatermarkUD className={styles.mark2} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide11.eyebrow}</span>
        <h1 className={styles.title}>{slide11.title}</h1>
        <p className={styles.body}>{slide11.body}</p>
        <div className={styles.line} />
        <ul className={styles.list}>
          {slide11.items.map((item, i) => (
            <li key={i} className={styles.item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
