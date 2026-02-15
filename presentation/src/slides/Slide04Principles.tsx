'use client'

import { slide04 } from '@/src/data/slides'
import styles from './Slide04Principles.module.css'

export function Slide04Principles() {
  return (
    <div className={styles.slide}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{slide04.eyebrow}</span>
        <h1 className={styles.title}>{slide04.title}</h1>
        <div className={styles.accentLine} />
      </div>
      <div className={styles.grid}>
        {slide04.items.map((item) => (
          <div
            key={item.n}
            className={styles.cell}
            style={{ '--c': item.color } as React.CSSProperties}
          >
            <span className={styles.watermark}>{item.n}</span>
            <div className={styles.labelWrap}>
              <div className={styles.marker} />
              <span className={styles.label}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
