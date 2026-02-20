'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/**
 * SS split at x=829.8.
 * LEFT_D: semicircle (stays still during DD→UD), rendered ON TOP.
 * RIGHT_D: rect + S-curves + full semicircle cap (rotates during DD→UD).
 *   Cap hidden behind LEFT_D in SS/DD (same white, LEFT_D on top).
 *   Cap visible as smooth U-bottom when RIGHT_D rotates away.
 */

const LEFT_D = 'M829.8,1285 V715 c-158.7,0,-287.3,127.6,-287.3,285,0,157.4,128.6,285,287.3,285Z'

const RIGHT_D = 'M829.8,1285 v-215.5 c0,-1.1,1.5,-1.3,1.8,-0.2,31.2,123.9,144.1,215.7,278.7,215.7 h287.3 v-570 h-287.3 c-134.6,0,-247.5,91.8,-278.7,215.7,-0.3,1,-1.8,0.8,-1.8,-0.2 v-215.5 c-158.7,0,-287.3,127.6,-287.3,285,0,157.4,128.6,285,287.3,285Z'

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
        viewBox="-200 -200 2400 2400"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <g ref={pairRef}>
          {/* RIGHT_D below — cap hidden by LEFT_D in SS/DD */}
          <g ref={rightRef}>
            <path d={RIGHT_D} fill="#FFFFFF" />
          </g>
          {/* LEFT_D on top — covers cap */}
          <path d={LEFT_D} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
