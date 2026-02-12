'use client'

import { slide13 } from '@/src/data/slides'
import { BrandMatrix } from '@/src/components/BrandMatrix'
import styles from './Slide13SystemAccent.module.css'

export function Slide13SystemAccent() {
  return (
    <div className={styles.slide}>
      <BrandMatrix symbol="ud" opacity={0.06} tileSize={580} offsetX={-200} offsetY={-160} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide13.eyebrow}</span>
        <div className={styles.line} />
        <h1 className={styles.title}>
          {slide13.lines.map((l, i) => (
            <span key={i} className={styles.titleLine}>{l}</span>
          ))}
        </h1>
        <ul className={styles.list}>
          {slide13.items.map((item, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.dash}>—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
