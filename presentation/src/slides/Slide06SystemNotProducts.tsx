'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide06SystemNotProducts.module.css'

export function Slide06SystemNotProducts() {
  const { data } = useEditor()
  const slide = data.slide06

  return (
    <div className={styles.slide}>
      <div className={styles.cementBlock} />

      <div className={styles.left}>
        <Editable slideKey="slide06" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide06" path={['title']} tag="h1" className={styles.title} />
        <Editable slideKey="slide06" path={['lead']} tag="p" className={styles.lead} />
        <div className={styles.note}>
          <div className={styles.noteAccent} />
          <Editable slideKey="slide06" path={['note']} tag="p" className={styles.noteText} />
        </div>
      </div>
      <div className={styles.right}>
        {slide.items.map((item, i) => (
          <div key={item.n} className={styles.row}>
            <span className={styles.watermark}>{item.n}</span>
            <Editable slideKey="slide06" path={['items', String(i), 'label']} tag="span" className={styles.label} />
          </div>
        ))}
      </div>
    </div>
  )
}
