'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './Slide01Hero.module.css'

export function Slide01Hero() {
  const { data } = useEditor()
  const slide = data.slide01

  return (
    <div className={styles.slide}>
      <img src={assetPath(slide.image)} alt="" className={styles.bg} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.accentLine} />
        <Editable slideKey="slide01" path={['title']} tag="h1" className={styles.title} />
        <Editable slideKey="slide01" path={['subtitle']} tag="p" className={styles.subtitle} />
        <Editable slideKey="slide01" path={['meta']} tag="span" className={styles.meta} />
      </div>
    </div>
  )
}
