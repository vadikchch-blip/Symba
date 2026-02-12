'use client'

import { slide13 } from '@/src/data/slides'
import styles from './Slide13SystemAccent.module.css'

/** UD symbol path — inline, not <img> */
const UD_PATH = 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z'

export function Slide13SystemAccent() {
  return (
    <div className={styles.slide}>
      {/* SVG UD — architectural mass, cropped by edges */}
      <div className={styles.bgGraphic} aria-hidden="true">
        <svg className={styles.udBg} viewBox="520 720 810 545" xmlns="http://www.w3.org/2000/svg">
          <path d={UD_PATH} />
        </svg>
      </div>

      {/* Vertical depth line */}
      <div className={styles.depthLine} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.label}>{slide13.eyebrow}</div>
        <div className={styles.accentLine} />
        <h1 className={styles.title}>
          {slide13.lines.map((l, i) => (
            <span key={i}>
              {l}
              {i < slide13.lines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <ul className={styles.list}>
          {slide13.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
