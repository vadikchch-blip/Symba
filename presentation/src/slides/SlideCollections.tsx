'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './SlideCollections.module.css'

/**
 * Layout per half:
 *   3 cols × 2 rows
 *   Edge photo  → col 1 (UD) or col 3 (DD), spans both rows (full height)
 *   Inner photo A → shown in top & bottom cells of col 2
 *   Inner photo B → shown in top & bottom cells of col 3 (UD) or col 1 (DD)
 * Each inner photo appears twice with different object-position (top / bottom crop).
 */
function CollectionHalf({ side }: { side: 'ud' | 'dd' }) {
  const { data } = useEditor()
  const section = data.slideCollections[side]

  const edgeImg   = side === 'ud' ? section.images[0] : section.images[2]
  const innerImg1 = side === 'ud' ? section.images[1] : section.images[0]
  const innerImg2 = side === 'ud' ? section.images[2] : section.images[1]

  const edgeCol   = side === 'ud' ? 1 : 3
  const inner1Col = side === 'ud' ? 2 : 1
  const inner2Col = side === 'ud' ? 3 : 2

  const cell = (col: number, row: number, src: string, pos: 'top' | 'bottom') => (
    <div
      className={styles.photoCell}
      style={{ gridColumn: col, gridRow: row }}
    >
      <img
        src={assetPath(src)}
        alt=""
        className={`${styles.photo} ${pos === 'top' ? styles.cropTop : styles.cropBottom}`}
      />
    </div>
  )

  return (
    <div className={`${styles.half} ${side === 'ud' ? styles.halfUd : styles.halfDd}`}>
      <div className={styles.photos}>
        {/* Edge photo — full height */}
        <div
          className={styles.photoCell}
          style={{ gridColumn: edgeCol, gridRow: '1 / span 2' }}
        >
          <img src={assetPath(edgeImg)} alt="" className={styles.photo} />
        </div>

        {/* Inner photos — each shown twice (top crop / bottom crop) */}
        {cell(inner1Col, 1, innerImg1, 'top')}
        {cell(inner2Col, 1, innerImg2, 'top')}
        {cell(inner1Col, 2, innerImg1, 'bottom')}
        {cell(inner2Col, 2, innerImg2, 'bottom')}
      </div>

      <div className={styles.info}>
        <Editable slideKey="slideCollections" path={[side, 'label']} tag="h2" className={styles.label} />
        <ul className={styles.list}>
          {section.items.map((_, i) => (
            <li key={i} className={styles.listItem}>
              <span className={styles.dash}>—</span>
              <Editable slideKey="slideCollections" path={[side, 'items', String(i)]} tag="span" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function SlideCollections() {
  return (
    <div className={styles.slide}>
      <div className={styles.header}>
        <Editable slideKey="slideCollections" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slideCollections" path={['title']} tag="h1" className={styles.title} />
      </div>

      <div className={styles.body}>
        <CollectionHalf side="ud" />
        <CollectionHalf side="dd" />
      </div>

      <div className={styles.footer}>
        <div className={styles.footerAccent} />
        <Editable slideKey="slideCollections" path={['footer']} tag="p" className={styles.footerText} />
      </div>
    </div>
  )
}
