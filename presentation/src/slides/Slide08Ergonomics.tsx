'use client'

import { slide08 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide08Ergonomics.module.css'

export function Slide08Ergonomics() {
  return (
    <div className={styles.slide}>
      {/* Left: text + color chips */}
      <div className={styles.left}>
        <span className={styles.eyebrow}>{slide08.eyebrow}</span>
        <div className={styles.chipBrick}>
          <h1 className={styles.titleOnBrick}>{slide08.titleLine}</h1>
        </div>
        <div className={styles.chipSand}>
          <p className={styles.bodyOnSand}>{slide08.bodyLine}</p>
        </div>
      </div>

      {/* Right: photo */}
      <div className={styles.right}>
        <img
          src={assetPath(slide08.image)}
          alt=""
          className={styles.media}
        />
      </div>
    </div>
  )
}
