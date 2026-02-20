'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/**
 * SS symbol split at x=829.8.
 * LEFT_D (in SS): semicircle — stays still in DD→UD
 * RIGHT_D (in SS): S-curves + rectangle — this is the one that rotates in DD→UD
 *   (because after 180° flip it becomes the visual LEFT, which the user calls "left D")
 */

const LEFT_D = 'M829.8,1285 V715 c-158.7,0,-287.3,127.6,-287.3,285,0,157.4,128.6,285,287.3,285Z'

// Closing: A50,285 arc (50px depth) — subtle rounding, no visible artifact
const RIGHT_D = 'M829.8,1285 v-215.5 c0,-1.1,1.5,-1.3,1.8,-0.2,31.2,123.9,144.1,215.7,278.7,215.7 h287.3 v-570 h-287.3 c-134.6,0,-247.5,91.8,-278.7,215.7,-0.3,1,-1.8,0.8,-1.8,-0.2 v-215.5 A50,285,0,0,0,829.8,1285Z'

export function SlideLogoAnim() {
  const pairRef = useRef<SVGGElement>(null)
  const rightRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const pair = pairRef.current
    const rightG = rightRef.current
    if (!pair || !rightG) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    // SS hold
    tl.to({}, { duration: 0.8 })

    // SS → DD: whole pair rotates 180°
    tl.to(pair, { rotation: 180, duration: 1.2, svgOrigin: '970 1000' })

    // DD hold
    tl.to({}, { duration: 0.8 })

    // DD → UD: RIGHT_D rotates 90° CW around its own center
    // RIGHT_D spans x=829.8 to x=1397.6, y=715 to y=1285 → center (1114, 1000)
    tl.to(rightG, { rotation: 90, duration: 1.2, svgOrigin: '1114 1000' })

    // UD hold
    tl.to({}, { duration: 0.8 })

    // UD → SS: right D back + pair back
    tl.to(rightG, { rotation: 0, duration: 1.0, svgOrigin: '1114 1000' })
    tl.to(pair, { rotation: 0, duration: 1.2, svgOrigin: '970 1000' }, '-=0.3')

    tl.to({}, { duration: 0.3 })

    return () => { tl.kill() }
  }, [])

  return (
    <div className={styles.slide}>
      <svg
        className={styles.logo}
        viewBox="-300 -300 2600 2600"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <g ref={pairRef}>
          <path d={LEFT_D} fill="#FFFFFF" />
          <g ref={rightRef}>
            <path d={RIGHT_D} fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  )
}
