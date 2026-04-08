'use client'

import { useEditor } from '@/src/context/EditorContext'
import { assetPath } from '@/lib/basePath'
import styles from './Slide14WorkModel.module.css'

export function Slide14WorkModel() {
  const { data } = useEditor()
  const slide = data.slide14

  return (
    <div className={styles.slide}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide.eyebrow}</span>
        <h1 className={styles.title}>{slide.title}</h1>
        <div className={styles.divider} />
        <p className={styles.subtitle}>
          {slide.subtitle}{' '}
          <span className={styles.accentWord}>{slide.subtitleAccent}</span>{' '}
          {slide.subtitleEnd}
        </p>
        <div className={styles.accentLine} />
      </div>
      {slide.image && <img src={assetPath(slide.image)} alt="" className={styles.photo} />}
    </div>
  )
}
