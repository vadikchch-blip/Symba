'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide04Principles.module.css'

export function Slide04Principles() {
  const { data } = useEditor()
  const slide = data.slide04

  return (
    <div className={styles.slide}>
      <div className={styles.header}>
        <Editable slideKey="slide04" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide04" path={['title']} tag="h1" className={styles.title} />
        <div className={styles.accentLine} />
      </div>
      <div className={styles.grid}>
        {slide.items.map((item, i) => (
          <div
            key={item.n}
            className={styles.cell}
            style={{ '--c': item.color } as React.CSSProperties}
          >
            <span className={styles.watermark}>{item.n}</span>
            <div className={styles.labelWrap}>
              <div className={styles.marker} />
              <Editable slideKey="slide04" path={['items', String(i), 'label']} tag="span" className={styles.label} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
