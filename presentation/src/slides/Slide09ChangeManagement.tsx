'use client'

import { slide09 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide09ChangeManagement.module.css'

export function Slide09ChangeManagement() {
  return (
    <div className={styles.slide}>
      <div className={styles.left}>
        <span className={styles.eyebrow}>{slide09.eyebrow}</span>
        <h1 className={styles.title}>{slide09.title}</h1>
        <p className={styles.lead}>{slide09.lead}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.right}>
        <div className={styles.drawingCard}>
          <img src={assetPath(slide09.drawing)} alt="" className={styles.drawing} />
        </div>
      </div>
    </div>
  )
}
