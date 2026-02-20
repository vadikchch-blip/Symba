'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/** Single Symbiotica symbol. Rotates as one unit. */
const SS_PATH = 'M829.8,1285v-215.5c0-1.1,1.5-1.3,1.8-.2,31.2,123.9,144.1,215.7,278.7,215.7h287.3v-570h-287.3c-134.6,0-247.5,91.8-278.7,215.7-.3,1-1.8.8-1.8-.2v-215.5c-158.7,0-287.3,127.6-287.3,285,0,157.4,128.6,285,287.3,285Z'

export function SlideLogoAnim() {
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = gRef.current
    if (!g) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    // SS: hold at 0°
    tl.to({}, { duration: 0.8 })

    // SS → DD: rotate 180°
    tl.to(g, { rotation: 180, duration: 1.2, svgOrigin: '1000 1000' })

    // DD: hold
    tl.to({}, { duration: 0.8 })

    // DD → UD: rotate another 90° (total 270°)
    tl.to(g, { rotation: 270, duration: 1.2, svgOrigin: '1000 1000' })

    // UD: hold
    tl.to({}, { duration: 0.8 })

    // UD → DD → SS: one fluid return to 360° (= 0°)
    tl.to(g, { rotation: 360, duration: 1.6, svgOrigin: '1000 1000' })

    // Reset to 0 for seamless loop
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
          <path d={SS_PATH} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
