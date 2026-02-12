'use client'

import { slide14 } from '@/src/data/slides'
import styles from './Slide14WorkModel.module.css'

export function Slide14WorkModel() {
  return (
    <div className={styles.slide}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide14.eyebrow}</span>
        <div className={styles.timeline}>
          <div className={styles.rail} />
          <div className={styles.steps}>
            {slide14.steps.map((step) => (
              <div key={step.n} className={styles.step}>
                <span className={styles.num}>{step.n}</span>
                <span className={styles.label}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.divider} />
        <p className={styles.conclusion}>
          {slide14.conclusion.map((line, i) => (
            <span key={i} className={styles.conclusionLine}>{line}</span>
          ))}
        </p>
      </div>
    </div>
  )
}
