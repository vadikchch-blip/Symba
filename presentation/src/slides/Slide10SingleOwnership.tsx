'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide10SingleOwnership.module.css'

export function Slide10SingleOwnership() {
  const { data } = useEditor()
  const slide = data.slide10

  return (
    <div className={styles.slide}>
      <div className={styles.left}>
        <Editable slideKey="slide10" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide10" path={['title']} tag="h1" className={styles.title} />
        <Editable slideKey="slide10" path={['chain']} tag="p" className={styles.chain} />
        <div className={styles.ownership}>
          <div className={styles.ownershipAccent} />
          <Editable slideKey="slide10" path={['ownership']} tag="p" className={styles.ownershipText} />
        </div>
      </div>
      <div className={styles.right}>
        <Editable slideKey="slide10" path={['resultLead']} tag="span" className={styles.resultLead} />
        <div className={styles.results}>
          {slide.results.map((_, i) => (
            <div
              key={i}
              className={`${styles.resultItem} ${i === slide.results.length - 1 ? styles.resultItemLast : ''}`}
            >
              <span className={styles.dash}>—</span>
              <Editable slideKey="slide10" path={['results', String(i)]} tag="span" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
