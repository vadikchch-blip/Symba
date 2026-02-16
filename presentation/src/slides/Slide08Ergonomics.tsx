'use client'

import { slide08 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide08Ergonomics.module.css'

export function Slide08Ergonomics() {
  return (
    <div className={styles.slide}>
      {/* Photo — full background layer */}
      <img src={assetPath(slide08.image)} alt="" className={styles.photo} />

      {/* Eyebrow — top left */}
      <span className={styles.eyebrow}>{slide08.eyebrow}</span>

      {/* Brick block — cuts into photo */}
      <div className={styles.brickBlock}>
        <h1 className={styles.brickText}>{slide08.titleLine}</h1>
      </div>

      {/* Sand block — counterform, offset below */}
      <div className={styles.sandBlock}>
        <p className={styles.sandText}>{slide08.bodyLine}</p>
      </div>
    </div>
  )
}
