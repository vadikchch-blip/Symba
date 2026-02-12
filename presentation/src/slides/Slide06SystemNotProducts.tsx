'use client'

import { slide06 } from '@/src/data/slides'
import styles from './Slide06SystemNotProducts.module.css'

export function Slide06SystemNotProducts() {
  return (
    <div className={styles.slide}>
      <div className={styles.left}>
        <span className={styles.eyebrow}>{slide06.eyebrow}</span>
        <h1 className={styles.title}>{slide06.title}</h1>
        <p className={styles.lead}>{slide06.lead}</p>
        <div className={styles.note}>
          <div className={styles.noteAccent} />
          <p className={styles.noteText}>{slide06.note}</p>
        </div>
      </div>
      <div className={styles.right}>
        {slide06.items.map((item) => (
          <div key={item.n} className={styles.row}>
            <span className={styles.watermark}>{item.n}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
