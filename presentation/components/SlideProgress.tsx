'use client'

import styles from './Presentation.module.css'

interface SlideProgressProps {
  current: number
  total: number
  onGoTo: (index: number) => void
}

export function SlideProgress({ current, total, onGoTo }: SlideProgressProps) {
  return (
    <div className={styles.slideProgress}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`${styles.progressSegment} ${
            i === current ? styles.progressSegmentActive : i < current ? styles.progressSegmentPast : ''
          }`}
          onClick={(e) => {
            e.stopPropagation()
            onGoTo(i)
          }}
        />
      ))}
    </div>
  )
}
