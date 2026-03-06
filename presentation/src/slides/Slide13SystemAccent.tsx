'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide13SystemAccent.module.css'

const UD_PATH = 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z'

export function Slide13SystemAccent() {
  const { data } = useEditor()
  const slide = data.slide13

  return (
    <div className={styles.slide}>
      <div className={styles.bgGraphic} aria-hidden="true">
        <svg className={styles.udBg} viewBox="520 720 810 545" xmlns="http://www.w3.org/2000/svg">
          <path d={UD_PATH} />
        </svg>
      </div>

      <div className={styles.depthLine} />

      <div className={styles.content}>
        <Editable slideKey="slide13" path={['eyebrow']} tag="div" className={styles.label} />
        <div className={styles.accentLine} />
        <h1 className={styles.title}>
          {slide.lines.map((_, i) => (
            <span key={i}>
              <Editable slideKey="slide13" path={['lines', String(i)]} tag="span" />
              {i < slide.lines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <ul className={styles.list}>
          {slide.items.map((_, i) => (
            <Editable key={i} slideKey="slide13" path={['items', String(i)]} tag="li" />
          ))}
        </ul>
      </div>
    </div>
  )
}
