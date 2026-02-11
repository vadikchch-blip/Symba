'use client'

import styles from './ModularTiles.module.css'

interface ModularTilesProps {
  subtle?: boolean
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

export function ModularTiles({ subtle = true, accent = 'none' }: ModularTilesProps) {
  const color = accentColorMap[accent] || accentColorMap.none

  return (
    <div className={`${styles.tiles} ${subtle ? styles.subtle : styles.bold}`}>
      <svg
        className={styles.pattern}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="symbolClip">
            <path d="M60,50v-25c0-.13-.18-.15-.2-.03-3.6,14.6-16.6,25.5-32,25.5h-33v-67.3h33c16,0,29.2,10.8,32,25.4.03.13.2.1.2-.03v-25.4c18.2,0,33,15,33,33.6s-14.8,33.3-33,33.3Z" />
          </clipPath>
        </defs>

        {/* Grid-aligned modular shapes */}
        {/* Large squares */}
        <rect x="20" y="20" width="120" height="120" rx="2" fill={color} opacity={subtle ? 0.06 : 0.12} />
        <rect x="560" y="360" width="100" height="100" rx="2" fill={color} opacity={subtle ? 0.05 : 0.1} />

        {/* Half circles */}
        <path d="M300,0 A80,80 0 0,1 300,160 Z" fill={color} opacity={subtle ? 0.04 : 0.08} />
        <path d="M800,300 A60,60 0 0,0 800,420 Z" fill={color} opacity={subtle ? 0.05 : 0.1} />
        <path d="M0,450 A70,70 0 0,1 0,590 Z" fill={color} opacity={subtle ? 0.04 : 0.09} />

        {/* Symbol fragments */}
        <g transform="translate(500, 100) scale(1.8)" opacity={subtle ? 0.04 : 0.08}>
          <path d="M60,50v-25c0-.13-.18-.15-.2-.03-3.6,14.6-16.6,25.5-32,25.5h-33v-67.3h33c16,0,29.2,10.8,32,25.4.03.13.2.1.2-.03v-25.4c18.2,0,33,15,33,33.6s-14.8,33.3-33,33.3Z" fill={color} />
        </g>
        <g transform="translate(100, 380) scale(1.4)" opacity={subtle ? 0.03 : 0.07}>
          <path d="M60,50v-25c0-.13-.18-.15-.2-.03-3.6,14.6-16.6,25.5-32,25.5h-33v-67.3h33c16,0,29.2,10.8,32,25.4.03.13.2.1.2-.03v-25.4c18.2,0,33,15,33,33.6s-14.8,33.3-33,33.3Z" fill={color} />
        </g>

        {/* Small squares grid dots */}
        <rect x="680" y="80" width="24" height="24" rx="1" fill={color} opacity={subtle ? 0.06 : 0.12} />
        <rect x="712" y="80" width="24" height="24" rx="1" fill={color} opacity={subtle ? 0.04 : 0.08} />
        <rect x="680" y="112" width="24" height="24" rx="1" fill={color} opacity={subtle ? 0.04 : 0.08} />
        <rect x="712" y="112" width="24" height="24" rx="1" fill={color} opacity={subtle ? 0.06 : 0.12} />

        <rect x="200" y="480" width="28" height="28" rx="1" fill={color} opacity={subtle ? 0.05 : 0.1} />
        <rect x="236" y="480" width="28" height="28" rx="1" fill={color} opacity={subtle ? 0.03 : 0.07} />

        {/* Circles */}
        <circle cx="450" cy="520" r="30" fill={color} opacity={subtle ? 0.04 : 0.08} />
        <circle cx="160" cy="240" r="16" fill={color} opacity={subtle ? 0.05 : 0.1} />
      </svg>
    </div>
  )
}
