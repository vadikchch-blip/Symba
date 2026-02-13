'use client'

import { useId } from 'react'
import { assetPath } from '@/lib/basePath'

const SYMBOL_PATHS: Record<'ud' | 'dd', string> = {
  ud: 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z',
  dd: 'M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z',
}

const SYMBOL_VIEWBOX: Record<'ud' | 'dd', string> = {
  ud: '520 720 810 545',
  dd: '525 725 800 545',
}

interface MaskedSymbolImageProps {
  symbolId: 'ud' | 'dd'
  imageUrl: string
  /** Photo zoom factor inside the mask (1.0 = fit, 1.4 = 40% larger) */
  imgScale?: number
  /** Photo focus point as [x%, y%] — 50/50 = center */
  imgFocus?: [number, number]
  className?: string
}

export function MaskedSymbolImage({
  symbolId,
  imageUrl,
  imgScale = 1.0,
  imgFocus = [50, 50],
  className,
}: MaskedSymbolImageProps) {
  const uid = useId()
  const clipId = `clip-${symbolId}-${uid}`
  const path = SYMBOL_PATHS[symbolId]
  const vbStr = SYMBOL_VIEWBOX[symbolId]
  const [vx, vy, vw, vh] = vbStr.split(' ').map(Number)
  const resolvedUrl = assetPath(imageUrl)

  // Scale the image larger than the viewBox to zoom in
  const iw = vw * imgScale
  const ih = vh * imgScale
  // Offset so the focus point stays centered in the viewBox
  const ix = vx + (vw - iw) * (imgFocus[0] / 100)
  const iy = vy + (vh - ih) * (imgFocus[1] / 100)

  return (
    <svg
      viewBox={vbStr}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
      </defs>
      <image
        href={resolvedUrl}
        x={ix}
        y={iy}
        width={iw}
        height={ih}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  )
}
