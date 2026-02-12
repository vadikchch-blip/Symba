'use client'

import { slide01 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide01Hero.module.css'

export function Slide01Hero() {
  return (
    <div className={styles.slide}>
      <img src={assetPath(slide01.image)} alt="" className={styles.bg} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.accentLine} />
        <h1 className={styles.title}>{slide01.title}</h1>
        <p className={styles.subtitle}>{slide01.subtitle}</p>
        <span className={styles.meta}>{slide01.meta}</span>
      </div>
    </div>
  )
}
