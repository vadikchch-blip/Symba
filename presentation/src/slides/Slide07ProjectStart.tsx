'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide07ProjectStart.module.css'

export function Slide07ProjectStart() {
  const { data } = useEditor()
  const slide = data.slide07

  return (
    <div className={styles.slide}>
      <div className={styles.mossBlock} />

      <div className={styles.left}>
        <Editable slideKey="slide07" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <div className={styles.titleWrap}>
          <div className={styles.titleMarker} />
          <Editable slideKey="slide07" path={['title']} tag="h1" className={styles.title} />
        </div>
        <Editable slideKey="slide07" path={['lead']} tag="p" className={styles.lead} />
        <div className={styles.emphasis}>
          {slide.emphasis.map((_, i) => (
            <Editable key={i} slideKey="slide07" path={['emphasis', String(i)]} tag="span" className={styles.emphasisLine} />
          ))}
        </div>
      </div>
      <div className={styles.right}>
        {slide.items.map((_, i) => (
          <div key={i} className={styles.row}>
            <Editable slideKey="slide07" path={['items', String(i)]} tag="span" className={styles.label} />
          </div>
        ))}
      </div>
    </div>
  )
}
