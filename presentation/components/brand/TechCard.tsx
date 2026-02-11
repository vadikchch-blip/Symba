'use client'

import styles from './TechCard.module.css'

interface TechCardProps {
  items: { k: string; v: string }[]
  accent?: string
}

const accentColorMap: Record<string, string> = {
  accentBrick: 'var(--color-accent-brick)',
  accentOchre: 'var(--color-accent-ochre)',
  accentMoss: 'var(--color-accent-moss)',
  accentLilac: 'var(--color-accent-lilac)',
  accentPink: 'var(--color-accent-pink)',
  none: 'var(--color-sand)',
}

export function TechCard({ items, accent = 'none' }: TechCardProps) {
  const accentColor = accentColorMap[accent] || accentColorMap.none

  return (
    <div className={styles.card}>
      <div className={styles.label} style={{ color: accentColor }}>
        Технические данные
      </div>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.key}>{item.k}</span>
            <span className={styles.separator} />
            <span className={styles.value}>{item.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
