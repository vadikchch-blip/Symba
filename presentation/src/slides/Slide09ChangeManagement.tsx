'use client'

import { slide09 } from '@/src/data/slides'
import styles from './Slide09ChangeManagement.module.css'

export function Slide09ChangeManagement() {
  return (
    <div className={styles.slide}>
      <div className={styles.left}>
        <span className={styles.eyebrow}>{slide09.eyebrow}</span>
        <h1 className={styles.title}>{slide09.title}</h1>
        <p className={styles.lead}>{slide09.lead}</p>
        <div className={styles.problem}>
          {slide09.problem.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.solution}>
          <div className={styles.solutionAccent} />
          <p className={styles.solutionTitle}>{slide09.solutionTitle}</p>
        </div>
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
  )
}
