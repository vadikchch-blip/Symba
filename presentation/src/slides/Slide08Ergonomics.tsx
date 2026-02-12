'use client'

import { slide08 } from '@/src/data/slides'
import styles from './Slide08Ergonomics.module.css'

export function Slide08Ergonomics() {
  return (
    <div className={styles.slide}>
      <span className={styles.eyebrow}>{slide08.eyebrow}</span>
      <div className={styles.thesis}>
        <div className={styles.accentLine} />
        <h1 className={styles.text}>
          {slide08.lines.map((line, i) => (
            <span key={i} className={styles.line}>{line}</span>
          ))}
        </h1>
      </div>
    </div>
  )
}
