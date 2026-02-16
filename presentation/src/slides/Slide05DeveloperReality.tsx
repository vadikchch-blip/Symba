'use client'

import { slide05 } from '@/src/data/slides'
import styles from './Slide05DeveloperReality.module.css'

function ListBlock({ lead, items }: { lead: string; items: string[] }) {
  return (
    <div className={styles.block}>
      <p className={styles.lead}>{lead}</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            <span className={styles.dash}>—</span>
            <span>{item}</span>
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
        <span className={styles.eyebrow}>{slide05.eyebrow}</span>
        <div className={styles.titleWrap}>
          <div className={styles.titleMarker} />
          <h1 className={styles.title}>{slide05.title}</h1>
        </div>
      </div>
      <div className={styles.right}>
        <ListBlock lead={slide05.blockA.lead} items={slide05.blockA.items} />
        <ListBlock lead={slide05.blockB.lead} items={slide05.blockB.items} />
        <div className={styles.takeaway}>
          <p className={styles.takeawayText}>{slide05.takeaway}</p>
          <div className={styles.takeawayLine} />
        </div>
      </div>
    </div>
  )
}
