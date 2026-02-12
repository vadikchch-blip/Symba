'use client'

import { slide07 } from '@/src/data/slides'
import styles from './Slide07ProjectStart.module.css'

export function Slide07ProjectStart() {
  return (
    <div className={styles.slide}>
      <div className={styles.left}>
        <span className={styles.eyebrow}>{slide07.eyebrow}</span>
        <h1 className={styles.title}>{slide07.title}</h1>
        <p className={styles.lead}>{slide07.lead}</p>
        <div className={styles.emphasis}>
          {slide07.emphasis.map((line, i) => (
            <span key={i} className={styles.emphasisLine}>{line}</span>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        {slide07.items.map((item, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.label}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
