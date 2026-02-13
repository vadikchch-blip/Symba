'use client'

import { slide02 } from '@/src/data/slides'
import { MaskedSymbolImage } from '@/src/components/MaskedSymbolImage'
import styles from './Slide02Directions.module.css'

interface ColumnData {
  key: 'ud' | 'dd'
  title: string
  subtitle: string
  bg: string
  image: string
}

/** Per-direction photo tuning */
const IMG_CONFIG: Record<'ud' | 'dd', { scale: number; focus: [number, number] }> = {
  ud: { scale: 1.4, focus: [50, 45] },
  dd: { scale: 1.5, focus: [60, 50] },
}

function DirectionColumn({ data }: { data: ColumnData }) {
  const cfg = IMG_CONFIG[data.key]
  const maskClass = data.key === 'ud' ? styles.maskUd : styles.maskDd

  return (
    <div className={styles.column} style={{ backgroundColor: data.bg }}>
      <div className={styles.textBlock}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </div>
      <div className={`${styles.symbolBlock} ${maskClass}`}>
        <MaskedSymbolImage
          symbolId={data.key}
          imageUrl={data.image}
          imgScale={cfg.scale}
          imgFocus={cfg.focus}
          className={styles.symbolSvg}
        />
      </div>
    </div>
  )
}

export function Slide02Directions() {
  return (
    <div className={styles.slide}>
      <DirectionColumn data={slide02.left} />
      <DirectionColumn data={slide02.right} />
    </div>
  )
}
