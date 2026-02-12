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

function DirectionColumn({ data }: { data: ColumnData }) {
  return (
    <div className={styles.column} style={{ backgroundColor: data.bg }}>
      <div className={styles.safe}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </div>
        <div className={styles.symbolBlock}>
          <MaskedSymbolImage
            symbolId={data.key}
            imageUrl={data.image}
            className={styles.symbolSvg}
          />
        </div>
      </div>
    </div>
  )
}

export function Slide02Directions() {
  return (
    <div className={styles.slide}>
      <DirectionColumn data={slide02.left} />
      <div className={styles.divider} />
      <DirectionColumn data={slide02.right} />
    </div>
  )
}
