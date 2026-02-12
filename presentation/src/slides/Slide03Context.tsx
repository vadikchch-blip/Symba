'use client'

import { slide03 } from '@/src/data/slides'
import styles from './Slide03Context.module.css'

export function Slide03Context() {
  return (
    <div className={styles.slide}>
      <div className={styles.main}>
        <span className={styles.eyebrow}>{slide03.eyebrow}</span>
        <h1 className={styles.title}>{slide03.title}</h1>
        <div className={styles.body}>
          {slide03.body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
      <aside className={styles.aside} />
    </div>
  )
}
