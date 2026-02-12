'use client'

import styles from './SymbolPattern.module.css'

/**
 * Symbol paths from brand SVGs, normalized to a 0 0 100 100 viewBox
 * by translating and scaling the original paths.
 * Original viewBox 0 0 2000 2000 → cropped to bounding box → normalized.
 *
 * For pattern tiling we use the original viewBox and embed in a data-uri.
 */
const SYMBOLS: Record<'ud' | 'dd', string> = {
  ud: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='520 720 810 545'><path d='M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z' fill='%23000'/></svg>`,
  dd: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='525 725 800 545'><path d='M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z' fill='%23000'/></svg>`,
}

interface SymbolPatternProps {
  variant?: 'ud' | 'dd'
  className?: string
}

export function SymbolPattern({ variant = 'ud', className = '' }: SymbolPatternProps) {
  const dataUri = `url("data:image/svg+xml,${SYMBOLS[variant]}")`

  return (
    <div
      className={`${styles.layer} ${className}`}
      aria-hidden="true"
      style={{
        '--pat-img': dataUri,
      } as React.CSSProperties}
    />
  )
}
