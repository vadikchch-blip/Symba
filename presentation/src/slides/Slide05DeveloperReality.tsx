'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import styles from './Slide05DeveloperReality.module.css'

function ListBlock({ blockKey }: { blockKey: 'blockA' | 'blockB' }) {
  const { data } = useEditor()
  const block = data.slide05[blockKey]

  return (
    <div className={styles.block}>
      <Editable slideKey="slide05" path={[blockKey, 'lead']} tag="p" className={styles.lead} />
      <ul className={styles.list}>
        {block.items.map((_, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.dash}>—</span>
            <Editable slideKey="slide05" path={[blockKey, 'items', String(i)]} tag="span" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Slide05DeveloperReality() {
  return (
    <div className={styles.slide}>
      <span className={styles.watermark}>05</span>
      <div className={styles.left}>
        <Editable slideKey="slide05" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <div className={styles.titleWrap}>
          <div className={styles.titleMarker} />
          <Editable slideKey="slide05" path={['title']} tag="h1" className={styles.title} />
        </div>
      </div>
      <div className={styles.right}>
        <ListBlock blockKey="blockA" />
        <ListBlock blockKey="blockB" />
        <div className={styles.takeaway}>
          <Editable slideKey="slide05" path={['takeaway']} tag="p" className={styles.takeawayText} />
          <div className={styles.takeawayLine} />
        </div>
      </div>
    </div>
  )
}
