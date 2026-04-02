'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/**
 * Paths from Симбиотика_логоблок_разделен.ai
 * LEFT: semicircle facing left with notch (x≈595–867)
 * RIGHT: D-shape = semicircle + rectangle (x≈862–1405)
 */

const LEFT_D = 'M867.2,730.4 C717,730.4,595.2,851.1,595.2,1000 C595.2,1148.9,717,1269.6,867.2,1269.6 L867.2,1065.6 L867.2,934.3Z'

const RIGHT_D = 'M1131.9,1269.6 L1404.8,1269.6 L1404.8,730.4 L1131.9,730.4 C983,730.4,862.3,851.1,862.3,1000 C862.3,1148.9,983,1269.6,1131.9,1269.6Z'

const animationConfig = {
  viewBox: '0 0 2000 2000',
  background: '#FFFFFF',
  fill: '#000000',
  paths: {
    left: { id: 'LEFT_D', d: LEFT_D, description: 'Semicircle facing left with notch' },
    right: { id: 'RIGHT_D', d: RIGHT_D, description: 'D-shape = semicircle + rectangle' },
  },
  timeline: {
    repeat: -1,
    defaultEase: 'power1.inOut',
    steps: [
      { label: 'SS hold', type: 'pause', duration: 1 },
      { label: 'SS → DD', target: 'pair', rotation: 180, duration: 1.6, svgOrigin: '1000 1000' },
      { label: 'DD hold', type: 'pause', duration: 1 },
      { label: 'DD → UD', target: 'right', rotation: 90, duration: 1.6, svgOrigin: '1135.5 1000' },
      { label: 'UD hold', type: 'pause', duration: 1 },
      { label: 'UD → SS (right)', target: 'right', rotation: 0, duration: 1.4, svgOrigin: '1135.5 1000' },
      { label: 'UD → SS (pair)', target: 'pair', rotation: 0, duration: 1.6, svgOrigin: '1000 1000', offset: '-=0.4' },
      { label: 'end pause', type: 'pause', duration: 0.5 },
    ],
  },
  structure: {
    description: 'SVG > g.pair > [path.LEFT_D, g.right > path.RIGHT_D]',
    note: 'pair group wraps both paths; right group wraps only RIGHT_D for independent rotation',
  },
}

function handleDownloadJSON() {
  const blob = new Blob([JSON.stringify(animationConfig, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'symba-logo-animation.json'
  a.click()
  URL.revokeObjectURL(url)
}

function handleDownloadHTML() {
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Symba Logo Animation</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"><\/script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  svg { width: 520px; height: 520px; }
</style>
</head>
<body>
<svg viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg">
  <g id="pair">
    <path d="${LEFT_D}" fill="#000"/>
    <g id="right">
      <path d="${RIGHT_D}" fill="#000"/>
    </g>
  </g>
</svg>
<script>
  const pair = document.getElementById('pair');
  const right = document.getElementById('right');
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power1.inOut' } });
  tl.to({}, { duration: 1 });
  tl.to(pair, { rotation: 180, duration: 1.6, svgOrigin: '1000 1000' });
  tl.to({}, { duration: 1 });
  tl.to(right, { rotation: 90, duration: 1.6, svgOrigin: '1135.5 1000' });
  tl.to({}, { duration: 1 });
  tl.to(right, { rotation: 0, duration: 1.4, svgOrigin: '1135.5 1000' });
  tl.to(pair, { rotation: 0, duration: 1.6, svgOrigin: '1000 1000' }, '-=0.4');
  tl.to({}, { duration: 0.5 });
<\/script>
</body>
</html>`
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'symba-logo-animation.html'
  a.click()
  URL.revokeObjectURL(url)
}

export function SlideLogoAnim() {
  const pairRef = useRef<SVGGElement>(null)
  const rightRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const pair = pairRef.current
    const rightG = rightRef.current
    if (!pair || !rightG) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power1.inOut' } })

    // SS hold
    tl.to({}, { duration: 1 })

    // SS → DD: whole pair rotates 180°
    tl.to(pair, { rotation: 180, duration: 1.6, svgOrigin: '1000 1000' })

    // DD hold
    tl.to({}, { duration: 1 })

    // DD → UD: RIGHT rotates 90°
    tl.to(rightG, { rotation: 90, duration: 1.6, svgOrigin: '1135.5 1000' })

    // UD hold
    tl.to({}, { duration: 1 })

    // UD → SS: right back + pair back
    tl.to(rightG, { rotation: 0, duration: 1.4, svgOrigin: '1135.5 1000' })
    tl.to(pair, { rotation: 0, duration: 1.6, svgOrigin: '1000 1000' }, '-=0.4')

    tl.to({}, { duration: 0.5 })

    return () => { tl.kill() }
  }, [])

  return (
    <div className={styles.slide}>
      <div className={styles.downloadBar}>
        <button className={styles.downloadBtn} onClick={handleDownloadJSON}>JSON</button>
        <button className={styles.downloadBtn} onClick={handleDownloadHTML}>HTML</button>
      </div>
      <svg
        className={styles.logo}
        viewBox="0 0 2000 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={pairRef}>
          <path d={LEFT_D} fill="#000000" />
          <g ref={rightRef}>
            <path d={RIGHT_D} fill="#000000" />
          </g>
        </g>
      </svg>
    </div>
  )
}
