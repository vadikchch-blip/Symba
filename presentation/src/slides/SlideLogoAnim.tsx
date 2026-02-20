'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/**
 * SS symbol split at x=829.8 (the vertical spine).
 *
 * LEFT_D: semicircle (straight right edge at x=829.8, curve goes left)
 * RIGHT_D: S-curves + rectangle (straight left edge at x=829.8, extends right)
 *
 * Shared edge at x=829.8, zero gap. Visually one shape.
 *
 * SS→DD: pair rotates 180° around SS center (~970, 1000)
 * DD→UD: LEFT_D rotates 90° CW around shared edge (829.8, 1000)
 */

const LEFT_D = 'M829.8,1285 V715 c-158.7,0,-287.3,127.6,-287.3,285,0,157.4,128.6,285,287.3,285Z'

const RIGHT_D = 'M829.8,1285 v-215.5 c0,-1.1,1.5,-1.3,1.8,-0.2,31.2,123.9,144.1,215.7,278.7,215.7 h287.3 v-570 h-287.3 c-134.6,0,-247.5,91.8,-278.7,215.7,-0.3,1,-1.8,0.8,-1.8,-0.2 v-215.5Z'

export function SlideLogoAnim() {
  const pairRef = useRef<SVGGElement>(null)
  const leftRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const pair = pairRef.current
    const leftG = leftRef.current
    if (!pair || !leftG) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    // SS hold
    tl.to({}, { duration: 0.8 })

    // SS → DD: whole pair rotates 180°
    tl.to(pair, { rotation: 180, duration: 1.2, svgOrigin: '970 1000' })

    // DD hold
    tl.to({}, { duration: 0.8 })

    // DD → UD: only left D rotates 90° CW around shared edge
    tl.to(leftG, { rotation: 90, duration: 1.2, svgOrigin: '829.8 1000' })

    // UD hold
    tl.to({}, { duration: 0.8 })

    // UD → SS: left D back + pair back (overlapping for fluid return)
    tl.to(leftG, { rotation: 0, duration: 1.0, svgOrigin: '829.8 1000' })
    tl.to(pair, { rotation: 0, duration: 1.2, svgOrigin: '970 1000' }, '-=0.3')

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
          <g ref={leftRef}>
            <path d={LEFT_D} fill="#FFFFFF" />
          </g>
          <path d={RIGHT_D} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
