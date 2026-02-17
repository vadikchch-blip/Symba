'use client'

import { slide12 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide12Climate.module.css'

export function Slide12Climate() {
  return (
    <div className={styles.slide}>
      <img src={assetPath(slide12.image)} alt="" className={styles.photo} />
      <div className={styles.gradient} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide12.eyebrow}</span>
        <h1 className={styles.title}>
          {slide12.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </h1>
        <p className={styles.suffix}>{slide12.titleSuffix}</p>
        <p className={styles.body}>{slide12.body}</p>
      </div>
    </div>
  )
}
