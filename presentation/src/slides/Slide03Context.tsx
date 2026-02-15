'use client'

import { slide03 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide03Context.module.css'

export function Slide03Context() {
  const hasImage = slide03.visual.type === 'image' && slide03.visual.src

  return (
    <div className={styles.slide}>
      <div className={styles.main}>
        <span className={styles.eyebrow}>{slide03.eyebrow}</span>
        <h1 className={styles.title}>{slide03.title}</h1>
        <div className={styles.body}>
          {slide03.body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
      {hasImage && (
        <div className={styles.photoCol}>
          <img src={assetPath(slide03.visual.src!)} alt="" className={styles.photo} />
        </div>
      )}
    </div>
  )
}
