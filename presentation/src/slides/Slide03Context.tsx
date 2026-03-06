'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './Slide03Context.module.css'

export function Slide03Context() {
  const { data } = useEditor()
  const slide = data.slide03
  const hasImage = slide.visual.type === 'image' && slide.visual.src

  return (
    <div className={styles.slide}>
      <div className={styles.main}>
        <Editable slideKey="slide03" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide03" path={['title']} tag="h1" className={styles.title} />
        <div className={styles.body}>
          {slide.body.map((_, i) => (
            <Editable key={i} slideKey="slide03" path={['body', String(i)]} tag="p" />
          ))}
        </div>
      </div>
      {hasImage && (
        <div className={styles.right}>
          <div className={styles.mediaBox}>
            <img src={assetPath(slide.visual.src!)} alt="" className={styles.photo} />
            <div className={styles.accent} />
          </div>
        </div>
      )}
    </div>
  )
}
