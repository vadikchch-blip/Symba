'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/**
 * SS symbol split into two halves along x=1110.3 (shared edge, zero gap).
 *
 * LEFT D: semicircle + S-curves + vertical edge at x=1110.3
 * RIGHT D: rectangle from x=1110.3 to x=1397.6
 *
 * Together they exactly reproduce the Symbiotica symbol.
 *
 * Animation:
 * SS→DD: whole pair rotates 180° around symbol center (970, 1000)
 * DD→UD: only left D rotates 90° CW around shared edge (1110.3, 1000)
 * Return: left D back, then pair back to 0°
 */

const LEFT_D = 'M829.8,1285v-215.5c0,-1.1,1.5,-1.3,1.8,-0.2,31.2,123.9,144.1,215.7,278.7,215.7V715c-134.6,0,-247.5,91.8,-278.7,215.7,-0.3,1,-1.8,0.8,-1.8,-0.2v-215.5c-158.7,0,-287.3,127.6,-287.3,285,0,157.4,128.6,285,287.3,285Z'

const RIGHT_D = 'M1110.3,1285h287.3v-570h-287.3Z'

export function SlideLogoAnim() {
  const pairRef = useRef<SVGGElement>(null)
  const leftRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const pair = pairRef.current
    const left = leftRef.current
    if (!pair || !left) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    // SS hold
    tl.to({}, { duration: 0.8 })

    // SS → DD: whole pair rotates 180° around symbol center
    tl.to(pair, { rotation: 180, duration: 1.2, svgOrigin: '970 1000' })

    // DD hold
    tl.to({}, { duration: 0.8 })

    // DD → UD: left D rotates 90° CW around shared edge
    tl.to(left, { rotation: 90, duration: 1.2, svgOrigin: '1110.3 1000' })

    // UD hold
    tl.to({}, { duration: 0.8 })

    // UD → DD → SS: one fluid return
    tl.to(left, { rotation: 0, duration: 1.0, svgOrigin: '1110.3 1000' })
    tl.to(pair, { rotation: 0, duration: 1.2, svgOrigin: '970 1000' }, '-=0.3')

    // Brief hold before loop
    tl.to({}, { duration: 0.3 })

    return () => { tl.kill() }
  }, [])

  return (
    <div className={styles.slide}>
      <svg
        className={styles.logo}
        viewBox="0 0 2000 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={pairRef}>
          <path ref={leftRef} d={LEFT_D} fill="#FFFFFF" />
          <path d={RIGHT_D} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
