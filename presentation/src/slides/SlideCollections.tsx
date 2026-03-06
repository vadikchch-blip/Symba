'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './SlideCollections.module.css'

function CollectionHalf({ side }: { side: 'ud' | 'dd' }) {
  const { data } = useEditor()
  const section = data.slideCollections[side]
  const slideKey = 'slideCollections' as const

  return (
    <div className={`${styles.half} ${side === 'ud' ? styles.halfUd : styles.halfDd}`}>
      <div className={styles.photos}>
        {section.images.map((src, i) => (
          <div key={i} className={styles.photoWrap}>
            <img src={assetPath(src)} alt="" className={styles.photo} />
          </div>
        ))}
      </div>
      <div className={styles.info}>
        <Editable slideKey={slideKey} path={[side, 'label']} tag="h2" className={styles.label} />
        <ul className={styles.list}>
          {section.items.map((_, i) => (
            <li key={i} className={styles.listItem}>
              <span className={styles.dash}>—</span>
              <Editable slideKey={slideKey} path={[side, 'items', String(i)]} tag="span" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function SlideCollections() {
  const { data } = useEditor()
  const slide = data.slideCollections

  return (
    <div className={styles.slide}>
      {/* Header */}
      <div className={styles.header}>
        <Editable slideKey="slideCollections" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slideCollections" path={['title']} tag="h1" className={styles.title} />
      </div>

      {/* Two-column collection grid */}
      <div className={styles.body}>
        <CollectionHalf side="ud" />
        <CollectionHalf side="dd" />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerAccent} />
        <Editable slideKey="slideCollections" path={['footer']} tag="p" className={styles.footerText} />
      </div>
    </div>
  )
}
