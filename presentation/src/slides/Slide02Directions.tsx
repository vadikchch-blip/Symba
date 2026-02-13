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
/**
 * Per-direction photo tuning.
 * scale: zoom factor (1.0 = exact fit, 1.15 = 15% zoom)
 * focus: [x%, y%] — where the camera "looks" inside the mask
 *
 * UD: arcs should rhyme with the right semicircle of the UD symbol.
 *     Shift photo right (62%) so arcs land on the right curve.
 * DD: terrazzo table centered, slight right bias.
 */
const IMG_CONFIG: Record<'ud' | 'dd', { scale: number; focus: [number, number] }> = {
  ud: { scale: 1.15, focus: [62, 42] },
  dd: { scale: 1.45, focus: [58, 48] },
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
