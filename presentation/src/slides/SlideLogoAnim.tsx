'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/**
 * ONE path. THREE rotation stops.
 * 0° = SS, 180° = DD, 270° = UD.
 * The UD shape IS the full symbol rotated 270°, as shown in the reference.
 */
const SYMBOL = 'M829.8,1285v-215.5c0-1.1,1.5-1.3,1.8-.2,31.2,123.9,144.1,215.7,278.7,215.7h287.3v-570h-287.3c-134.6,0-247.5,91.8-278.7,215.7-.3,1-1.8.8-1.8-.2v-215.5c-158.7,0-287.3,127.6-287.3,285,0,157.4,128.6,285,287.3,285Z'

export function SlideLogoAnim() {
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = gRef.current
    if (!g) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const origin = '970 1000'
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    // SS hold
    tl.to({}, { duration: 0.8 })

    // SS → DD (0° → 180°)
    tl.to(g, { rotation: 180, duration: 1.2, svgOrigin: origin })

    // DD hold
    tl.to({}, { duration: 0.8 })

    // DD → UD (180° → 270°)
    tl.to(g, { rotation: 270, duration: 1.2, svgOrigin: origin })

    // UD hold
    tl.to({}, { duration: 0.8 })

    // UD → DD (270° → 180°)
    tl.to(g, { rotation: 180, duration: 0.8, svgOrigin: origin })

    // DD → SS (180° → 360°)
    tl.to(g, { rotation: 360, duration: 1.2, svgOrigin: origin })

    // Reset for seamless loop
    tl.set(g, { rotation: 0 })

    return () => { tl.kill() }
  }, [])

  return (
    <div className={styles.slide}>
      <svg
        className={styles.logo}
        viewBox="0 0 2000 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={gRef}>
          <path d={SYMBOL} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
