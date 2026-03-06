'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide14WorkModel.module.css'

export function Slide14WorkModel() {
  const { data } = useEditor()
  const slide = data.slide14

  return (
    <div className={styles.slide}>
      <Editable slideKey="slide14" path={['watermark']} tag="div" className={styles.watermark} />
      <div className={styles.content}>
        <Editable slideKey="slide14" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <div className={styles.lines}>
          {slide.lines.map((_, i) => (
            <Editable key={i} slideKey="slide14" path={['lines', String(i)]} tag="p" className={styles.line} />
          ))}
        </div>
        <div className={styles.divider} />
        <div className={styles.conclusion}>
          <div className={styles.conclusionAccent} />
          <p className={styles.conclusionText}>
            {slide.conclusion.map((_, i) => (
              <Editable key={i} slideKey="slide14" path={['conclusion', String(i)]} tag="span" className={styles.conclusionLine} />
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
