'use client'

import React from 'react'
import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide03bMaterials.module.css'

export function Slide03bMaterials() {
  const { data } = useEditor()
  const slide = data.slide03b

  return (
    <div className={styles.slide}>
      <div className={styles.left}>
        <Editable slideKey="slide03b" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide03b" path={['title']} tag="h1" className={styles.title} />
        <div className={styles.accentLine} />
        <Editable slideKey="slide03b" path={['subtitle']} tag="p" className={styles.subtitle} />
        <Editable slideKey="slide03b" path={['lead']} tag="p" className={styles.lead} />
        <div className={styles.takeawayBox}>
          <Editable slideKey="slide03b" path={['takeaway']} tag="span" className={styles.takeaway} />
        </div>
      </div>
      <div className={styles.right}>
        <ul className={styles.list}>
          {slide.items.map((item, i) => (
            <li
              key={item.n}
              className={styles.item}
              style={{ '--c': item.color } as React.CSSProperties}
            >
              <span className={styles.itemNum}>{item.n}</span>
              <span className={styles.marker} />
              <Editable
                slideKey="slide03b"
                path={['items', String(i), 'label']}
                tag="span"
                className={styles.itemLabel}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
