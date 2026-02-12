'use client'

import { slide13 } from '@/src/data/slides'
import styles from './Slide13SystemBuild.module.css'

export function Slide13SystemBuild() {
  return (
    <div className={styles.slide}>
      <div className={styles.watermark}>{slide13.watermark}</div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide13.eyebrow}</span>
        <h1 className={styles.title}>
          {slide13.lines.map((line, i) => (
            <span key={i} className={styles.line}>{line}</span>
          ))}
        </h1>
        <div className={styles.divider} />
        <ul className={styles.list}>
          {slide13.items.map((item, i) => (
            <li key={i} className={styles.item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
