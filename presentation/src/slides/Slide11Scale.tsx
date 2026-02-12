'use client'

import { slide11 } from '@/src/data/slides'
import styles from './Slide11Scale.module.css'

export function Slide11Scale() {
  return (
    <div className={styles.slide}>
      <div className={styles.watermark}>{slide11.watermark}</div>
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
