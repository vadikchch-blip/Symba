'use client'

import { slide14 } from '@/src/data/slides'
import styles from './Slide14WorkModel.module.css'

export function Slide14WorkModel() {
  return (
    <div className={styles.slide}>
      <div className={styles.watermark}>{slide14.watermark}</div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide14.eyebrow}</span>
        <div className={styles.lines}>
          {slide14.lines.map((line, i) => (
            <p key={i} className={styles.line}>{line}</p>
          ))}
        </div>
        <div className={styles.divider} />
        <div className={styles.conclusion}>
          <div className={styles.conclusionAccent} />
          <p className={styles.conclusionText}>
            {slide14.conclusion.map((l, i) => (
              <span key={i} className={styles.conclusionLine}>{l}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
