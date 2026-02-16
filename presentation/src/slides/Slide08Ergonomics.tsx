'use client'

import { slide08 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide08Ergonomics.module.css'

export function Slide08Ergonomics() {
  return (
    <div className={styles.slide}>
      <img src={assetPath(slide08.image)} alt="" className={styles.photo} />
      <span className={styles.eyebrow}>{slide08.eyebrow}</span>
      <div className={styles.brickBlock}>
        <h1 className={styles.brickText}>{slide08.titleLine}</h1>
      </div>
      <div className={styles.cementBlock}>
        <p className={styles.cementText}>{slide08.bodyLine}</p>
      </div>
    </div>
  )
}
