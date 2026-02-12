'use client'

import styles from './BrandMatrix.module.css'

const PATHS: Record<'ud' | 'dd', { d: string; vb: string }> = {
  ud: {
    d: 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z',
    vb: '520 720 810 545',
  },
  dd: {
    d: 'M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z',
    vb: '525 725 800 545',
  },
}

interface BrandMatrixProps {
  symbol?: 'ud' | 'dd'
  opacity?: number
  tileSize?: number
  offsetX?: number
  offsetY?: number
  fill?: string
  className?: string
}

export function BrandMatrix({
  symbol = 'ud',
  opacity = 0.06,
  tileSize = 600,
  offsetX = -180,
  offsetY = -140,
  fill = 'rgba(255,255,255,1)',
  className = '',
}: BrandMatrixProps) {
  const sym = PATHS[symbol]
  const half = tileSize * 0.5
  const patA = `pat-matrix-a-${symbol}`
  const patB = `pat-matrix-b-${symbol}`

  return (
    <div className={`${styles.layer} ${className}`} aria-hidden="true">
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <symbol id={`matrix-sym-${symbol}`} viewBox={sym.vb}>
            <path d={sym.d} />
          </symbol>

          {/* Layer A: standard grid */}
          <pattern
            id={patA}
            x={offsetX}
            y={offsetY}
            width={tileSize}
            height={tileSize}
            patternUnits="userSpaceOnUse"
          >
            <use
              href={`#matrix-sym-${symbol}`}
              x={tileSize * 0.08}
              y={tileSize * 0.08}
              width={tileSize * 0.84}
              height={tileSize * 0.84}
              fill={fill}
              opacity={opacity}
            />
          </pattern>

          {/* Layer B: offset row — shifted 50% on both axes, slightly lower opacity */}
          <pattern
            id={patB}
            x={offsetX + half}
            y={offsetY + half}
            width={tileSize}
            height={tileSize}
            patternUnits="userSpaceOnUse"
          >
            <use
              href={`#matrix-sym-${symbol}`}
              x={tileSize * 0.08}
              y={tileSize * 0.08}
              width={tileSize * 0.84}
              height={tileSize * 0.84}
              fill={fill}
              opacity={opacity * 0.7}
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patA})`} />
        <rect width="100%" height="100%" fill={`url(#${patB})`} />
      </svg>
    </div>
  )
}
