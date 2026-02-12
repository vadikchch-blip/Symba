'use client'

import { slide10 } from '@/src/data/slides'
import styles from './Slide10SingleOwnership.module.css'

export function Slide10SingleOwnership() {
  return (
    <div className={styles.slide}>
      <div className={styles.left}>
        <span className={styles.eyebrow}>{slide10.eyebrow}</span>
        <h1 className={styles.title}>{slide10.title}</h1>
        <p className={styles.chain}>{slide10.chain}</p>
        <div className={styles.ownership}>
          <div className={styles.ownershipAccent} />
          <p className={styles.ownershipText}>{slide10.ownership}</p>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.resultLead}>{slide10.resultLead}</span>
        <div className={styles.results}>
          {slide10.results.map((item, i) => (
            <div
              key={i}
              className={`${styles.resultItem} ${i === slide10.results.length - 1 ? styles.resultItemLast : ''}`}
            >
              <span className={styles.dash}>—</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
