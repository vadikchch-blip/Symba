'use client'

import { assetPath } from '@/lib/basePath'

/**
 * SVG paths extracted from brand symbols.
 * viewBox for both: 0 0 2000 2000
 *
 * UD symbol: upward D-shape (Urban Development)
 * DD symbol: leftward D-shape (Design Development)
 */
const SYMBOL_PATHS: Record<'ud' | 'dd', string> = {
  ud: 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z',
  dd: 'M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z',
}

/**
 * Bounding boxes for each symbol path (tight crop)
 * Used to set the viewBox so the symbol fills the container.
 */
const SYMBOL_VIEWBOX: Record<'ud' | 'dd', string> = {
  ud: '520 720 810 545',
  dd: '525 725 800 545',
}

interface MaskedSymbolImageProps {
  symbolId: 'ud' | 'dd'
  imageUrl: string
  className?: string
}

export function MaskedSymbolImage({ symbolId, imageUrl, className }: MaskedSymbolImageProps) {
  const clipId = `clip-${symbolId}`
  const path = SYMBOL_PATHS[symbolId]
  const viewBox = SYMBOL_VIEWBOX[symbolId]
  const resolvedUrl = assetPath(imageUrl)

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
      </defs>
      <image
        href={resolvedUrl}
        x={viewBox.split(' ')[0]}
        y={viewBox.split(' ')[1]}
        width={viewBox.split(' ')[2]}
        height={viewBox.split(' ')[3]}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  )
}
