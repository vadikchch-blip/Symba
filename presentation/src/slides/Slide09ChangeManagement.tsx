'use client'

import { slide09 } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide09ChangeManagement.module.css'

export function Slide09ChangeManagement() {
  return (
    <div className={styles.slide}>
      {/* Left — all text */}
      <div className={styles.left}>
        <span className={styles.eyebrow}>{slide09.eyebrow}</span>
        <h1 className={styles.title}>{slide09.title}</h1>
        <p className={styles.lead}>{slide09.lead}</p>

        <div className={styles.problem}>
          {slide09.problem.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className={styles.solution}>
          <p className={styles.solutionTitle}>{slide09.solutionTitle}</p>
          <div className={styles.items}>
            {slide09.items.map((item, i) => (
              <div key={i} className={styles.item}>
                <span className={styles.dash}>—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className={styles.final}>{slide09.final}</p>
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
          <img src={assetPath(slide09.drawing)} alt="" className={styles.drawing} />
        </div>
      </div>
    </div>
  )
}
