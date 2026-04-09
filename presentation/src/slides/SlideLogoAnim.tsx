'use client'

import { useEffect, useRef, useState } from 'react'
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

let workerBlobUrl: string | null = null

async function loadGifJs(): Promise<void> {
  if (!(window as unknown as Record<string, unknown>).GIF) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js'
      script.onload = () => resolve()
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
  if (!workerBlobUrl) {
    const res = await fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js')
    const text = await res.text()
    workerBlobUrl = URL.createObjectURL(new Blob([text], { type: 'application/javascript' }))
  }
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

// Brand colors
const COLOR_CC_BG = '#E2683A'   // оранжевый
const COLOR_DD_BG = '#A879FF'   // фиолетовый
const COLOR_UD_BG = '#CEDF83'   // салатовый
const COLOR_CC_FILL = '#DDD8C4' // кремовый (CC & DD)
const COLOR_DD_FILL = '#DDD8C4' // кремовый
const COLOR_UD_FILL = '#333333' // тёмный (UD)

export function SlideLogoAnim() {
  const pairRef = useRef<SVGGElement>(null)
  const rightRef = useRef<SVGGElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const leftPathRef = useRef<SVGPathElement>(null)
  const rightPathRef = useRef<SVGPathElement>(null)
  const [gifProgress, setGifProgress] = useState<string | null>(null)

  async function handleDownloadGIF() {
    if (gifProgress) return

    setGifProgress('Загрузка...')

    try {
      await loadGifJs()

      const GIFConstructor = (window as unknown as Record<string, unknown>).GIF as new (opts: Record<string, unknown>) => {
        addFrame(canvas: HTMLCanvasElement, opts: Record<string, unknown>): void
        on(event: string, cb: (...args: unknown[]) => void): void
        render(): void
      }
      const size = 520

      // power1.inOut easing (quadratic in-out)
      const ease = (p: number) => p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p

      // Compute pair & right rotation angles at time t
      function getAngles(t: number) {
        let pair = 0, right = 0
        // 0–1: hold | 1–2.6: pair 0→180 | 2.6–3.6: hold
        // 3.6–5.2: right 0→90 | 5.2–6.2: hold
        // 6.2–7.6: right 90→0 | 7.2–8.8: pair 180→0 (overlap)
        // 8.8–9.3: hold
        if (t >= 1 && t < 2.6) pair = 180 * ease((t - 1) / 1.6)
        else if (t >= 2.6 && t < 7.2) pair = 180
        else if (t >= 7.2 && t < 8.8) pair = 180 * (1 - ease((t - 7.2) / 1.6))

        if (t >= 3.6 && t < 5.2) right = 90 * ease((t - 3.6) / 1.6)
        else if (t >= 5.2 && t < 6.2) right = 90
        else if (t >= 6.2 && t < 7.6) right = 90 * (1 - ease((t - 6.2) / 1.4))

        return { pair, right }
      }

      // Build SVG rotation matrix string around (cx, cy)
      function rotMatrix(deg: number, cx: number, cy: number): string {
        if (Math.abs(deg) < 0.01) return ''
        const r = deg * Math.PI / 180
        const c = Math.cos(r), s = Math.sin(r)
        return ` transform="matrix(${c.toFixed(6)},${s.toFixed(6)},${(-s).toFixed(6)},${c.toFixed(6)},${(cx * (1 - c) + cy * s).toFixed(2)},${(cy * (1 - c) - cx * s).toFixed(2)})"`
      }

      // Build SVG string for a given frame
      function buildSvg(pairDeg: number, rightDeg: number): string {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 2000 2000">
<rect width="2000" height="2000" fill="#FFF"/>
<g${rotMatrix(pairDeg, 1000, 1000)}>
  <path d="${LEFT_D}" fill="#000"/>
  <g${rotMatrix(rightDeg, 1135.5, 1000)}>
    <path d="${RIGHT_D}" fill="#000"/>
  </g>
</g>
</svg>`
      }

      // Render SVG string to canvas
      function renderFrame(svgStr: string): Promise<HTMLCanvasElement> {
        return new Promise((resolve, reject) => {
          const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
          const url = URL.createObjectURL(blob)
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext('2d')!
            ctx.drawImage(img, 0, 0, size, size)
            URL.revokeObjectURL(url)
            resolve(canvas)
          }
          img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG render failed')) }
          img.src = url
        })
      }

      const fps = 50
      const totalDuration = 9.3
      const totalFrames = Math.ceil(totalDuration * fps)

      const gif = new GIFConstructor({
        workers: 2,
        quality: 10,
        width: size,
        height: size,
        workerScript: workerBlobUrl!,
      })

      // Capture frames
      for (let i = 0; i <= totalFrames; i++) {
        const t = i / fps
        const { pair, right } = getAngles(t)
        const svgStr = buildSvg(pair, right)
        const canvas = await renderFrame(svgStr)
        gif.addFrame(canvas, { delay: Math.round(1000 / fps), copy: true })
        setGifProgress(`${Math.round((i / totalFrames) * 100)}%`)
      }

      // Render GIF
      setGifProgress('Кодирование...')

      const blob: Blob = await new Promise((resolve, reject) => {
        gif.on('finished', (b: unknown) => resolve(b as Blob))
        gif.on('error', (e: unknown) => reject(e))
        gif.render()
      })

      // Download
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'symba-logo-animation.gif'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('GIF generation failed:', e)
    }

    setGifProgress(null)
  }

  useEffect(() => {
    const pair = pairRef.current
    const rightG = rightRef.current
    const slide = slideRef.current
    const leftPath = leftPathRef.current
    const rightPath = rightPathRef.current
    if (!pair || !rightG || !slide || !leftPath || !rightPath) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const bothPaths = [leftPath, rightPath]

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power1.inOut' } })

    // SS hold (CC — оранжевый)
    tl.to({}, { duration: 1 })

    // SS → DD: вращение + оранжевый → фиолетовый
    tl.to(pair, { rotation: 180, duration: 1.6, svgOrigin: '1000 1000' })
    tl.to(slide, { backgroundColor: COLOR_DD_BG, duration: 1.6 }, '<')

    // DD hold (фиолетовый)
    tl.to({}, { duration: 1 })

    // DD → UD: вращение + фиолетовый → салатовый, лого кремовый → тёмный
    tl.to(rightG, { rotation: 90, duration: 1.6, svgOrigin: '1135.5 1000' })
    tl.to(slide, { backgroundColor: COLOR_UD_BG, duration: 1.6 }, '<')
    tl.to(bothPaths, { fill: COLOR_UD_FILL, duration: 1.6 }, '<')

    // UD hold (салатовый)
    tl.to({}, { duration: 1 })

    // UD → SS: салатовый → оранжевый, лого тёмный → кремовый
    tl.to(rightG, { rotation: 0, duration: 1.4, svgOrigin: '1135.5 1000' })
    tl.to(pair, { rotation: 0, duration: 1.6, svgOrigin: '1000 1000' }, '-=0.4')
    tl.to(slide, { backgroundColor: COLOR_CC_BG, duration: 1.6 }, '-=1.6')
    tl.to(bothPaths, { fill: COLOR_CC_FILL, duration: 1.6 }, '-=1.6')

    tl.to({}, { duration: 0.5 })

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={slideRef} className={styles.slide} style={{ backgroundColor: COLOR_CC_BG }}>
      <svg
        ref={svgRef}
        className={styles.logo}
        viewBox="0 0 2000 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={pairRef}>
          <path ref={leftPathRef} d={LEFT_D} fill={COLOR_CC_FILL} />
          <g ref={rightRef}>
            <path ref={rightPathRef} d={RIGHT_D} fill={COLOR_CC_FILL} />
          </g>
        </g>
      </svg>
    </div>
  )
}
