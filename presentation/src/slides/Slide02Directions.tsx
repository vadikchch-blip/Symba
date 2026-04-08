'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { MaskedSymbolImage } from '@/src/components/MaskedSymbolImage'
import styles from './Slide02Directions.module.css'

const IMG_CONFIG: Record<'ud' | 'dd', { scale: number; focus: [number, number]; preserveAspectRatio?: string }> = {
  ud: { scale: 1.15, focus: [62, 42] },
  dd: { scale: 1.45, focus: [50, 50], preserveAspectRatio: 'xMidYMax slice' },
}

function DirectionColumn({ side }: { side: 'left' | 'right' }) {
  const { data } = useEditor()
  const colData = data.slide02[side]
  const cfg = IMG_CONFIG[colData.key]
  const maskClass = colData.key === 'ud' ? styles.maskUd : styles.maskDd

  return (
    <div className={styles.column} style={{ backgroundColor: colData.bg }}>
      <div className={styles.textBlock}>
        <Editable slideKey="slide02" path={[side, 'title']} tag="h2" className={styles.title} />
        <Editable slideKey="slide02" path={[side, 'subtitle']} tag="p" className={styles.subtitle} />
      </div>
      <div className={`${styles.symbolBlock} ${maskClass}`}>
        <MaskedSymbolImage
          symbolId={colData.key}
          imageUrl={colData.image}
          imgScale={cfg.scale}
          imgFocus={cfg.focus}
          preserveAspectRatio={cfg.preserveAspectRatio}
          className={styles.symbolSvg}
        />
      </div>
    </div>
  )
}

export function Slide02Directions() {
  return (
    <div className={styles.slide}>
      <DirectionColumn side="left" />
      <DirectionColumn side="right" />
    </div>
  )
}
