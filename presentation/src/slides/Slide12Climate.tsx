'use client'

import { slide12 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide12Climate.module.css'

export function Slide12Climate() {
  return (
    <div className={styles.slide}>
      <div className={styles.photoZone}>
        <img src={assetPath(slide12.image)} alt="" className={styles.photo} />
      </div>
      <div className={styles.infoZone}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{slide12.eyebrow}</span>
          <h1 className={styles.title}>
            {slide12.title}
            <br />
            <span className={styles.titleSuffix}>{slide12.titleSuffix}</span>
          </h1>
          <p className={styles.body}>{slide12.body}</p>
          <div className={styles.line} />
        </div>
      </div>
    </div>
  )
}
