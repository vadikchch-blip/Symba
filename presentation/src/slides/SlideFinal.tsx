'use client'

import { slideFinal } from '@/src/data/slides'
import styles from './SlideFinal.module.css'

export function SlideFinal() {
  return (
    <div className={styles.slide}>
      <div className={styles.content}>
        {slideFinal.blocks.map((block, bi) => (
          <p key={bi} className={styles.block}>
            {block.map((line, li) => (
              <span key={li} className={styles.line}>{line}</span>
            ))}
          </p>
        ))}
        <div className={styles.accent} />
        <span className={styles.brand}>{slideFinal.brand}</span>
      </div>
    </div>
  )
}
