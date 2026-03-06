'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './SlideFinal.module.css'

export function SlideFinal() {
  const { data } = useEditor()
  const slide = data.slideFinal

  return (
    <div className={styles.slide}>
      <div className={styles.content}>
        {slide.blocks.map((block, bi) => (
          <p key={bi} className={styles.block}>
            {block.map((_, li) => (
              <Editable key={li} slideKey="slideFinal" path={['blocks', String(bi), String(li)]} tag="span" className={styles.line} />
            ))}
          </p>
        ))}
        <div className={styles.accent} />
        <Editable slideKey="slideFinal" path={['brand']} tag="span" className={styles.brand} />
      </div>
    </div>
  )
}
