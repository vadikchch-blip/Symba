'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './Slide09ChangeManagement.module.css'

export function Slide09ChangeManagement() {
  const { data } = useEditor()
  const slide = data.slide09

  return (
    <div className={styles.slide}>
      {/* Left — all text */}
      <div className={styles.left}>
        <Editable slideKey="slide09" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide09" path={['title']} tag="h1" className={styles.title} />
        <Editable slideKey="slide09" path={['lead']} tag="p" className={styles.lead} />

        <div className={styles.problem}>
          {slide.problem.map((_, i) => (
            <Editable key={i} slideKey="slide09" path={['problem', String(i)]} tag="p" />
          ))}
        </div>

        <div className={styles.solution}>
          <Editable slideKey="slide09" path={['solutionTitle']} tag="p" className={styles.solutionTitle} />
          <div className={styles.items}>
            {slide.items.map((_, i) => (
              <div key={i} className={styles.item}>
                <span className={styles.dash}>—</span>
                <Editable slideKey="slide09" path={['items', String(i)]} tag="span" />
              </div>
            ))}
          </div>
          <Editable slideKey="slide09" path={['final']} tag="p" className={styles.final} />
        </div>
      </div>

      {/* Right — drawing + structural form */}
      <div className={styles.right}>
        <div className={styles.drawingWrap}>
          <svg className={styles.form} viewBox="0 0 220 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="
              M0,0 L160,0 L160,80 L220,80 L220,140 L160,140
              L160,260 L220,260 L220,320 L160,320 L160,400
              L0,400 Z
            " fill="#C2D67A" />
          </svg>
          <img src={assetPath(slide.drawing)} alt="" className={styles.drawing} />
        </div>
      </div>
    </div>
  )
}
