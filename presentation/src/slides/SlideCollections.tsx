'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './SlideCollections.module.css'

/**
 * Layout per half — 3 sections (6 total):
 *   UD: [P1 full-height, left col] | [P2 top / P3 bottom, right col]
 *   DD: [P1 top / P2 bottom, left col] | [P3 full-height, right col]
 */
function CollectionHalf({ side }: { side: 'ud' | 'dd' }) {
  const { data } = useEditor()
  const section = data.slideCollections[side]
  const imgs = section.images

  return (
    <div className={`${styles.half} ${side === 'ud' ? styles.halfUd : styles.halfDd}`}>
      <div className={styles.photos}>
        {side === 'ud' ? (
          <>
            {/* P1 — full height, left edge */}
            <div className={`${styles.photoCell} ${styles.cellEdge}`}>
              <img src={assetPath(imgs[0])} alt="" className={styles.photo} />
            </div>
            {/* P2 + P3 — stacked in right column */}
            <div className={styles.cellStack}>
              <div className={styles.photoCell}>
                <img src={assetPath(imgs[1])} alt="" className={styles.photo} />
              </div>
              <div className={styles.photoCell}>
                <img src={assetPath(imgs[2])} alt="" className={styles.photo} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* P1 + P2 — stacked in left column */}
            <div className={styles.cellStack}>
              <div className={styles.photoCell}>
                <img src={assetPath(imgs[0])} alt="" className={styles.photo} />
              </div>
              <div className={styles.photoCell}>
                <img src={assetPath(imgs[1])} alt="" className={styles.photo} />
              </div>
            </div>
            {/* P3 — full height, right edge */}
            <div className={`${styles.photoCell} ${styles.cellEdge}`}>
              <img src={assetPath(imgs[2])} alt="" className={styles.photo} />
            </div>
          </>
        )}
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
