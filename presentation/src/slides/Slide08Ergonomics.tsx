'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './Slide08Ergonomics.module.css'

export function Slide08Ergonomics() {
  const { data } = useEditor()
  const slide = data.slide08

  return (
    <div className={styles.slide}>
      <img src={assetPath(slide.image)} alt="" className={styles.photo} />
      <Editable slideKey="slide08" path={['eyebrow']} tag="span" className={styles.eyebrow} />
      <div className={styles.brickBlock}>
        <Editable slideKey="slide08" path={['titleLine']} tag="h1" className={styles.brickText} />
      </div>
      <div className={styles.cementBlock}>
        <Editable slideKey="slide08" path={['bodyLine']} tag="p" className={styles.cementText} />
      </div>
    </div>
  )
}
