'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

const LEFT_D = 'M829.8,1285 V715 c-158.7,0,-287.3,127.6,-287.3,285,0,157.4,128.6,285,287.3,285Z'

// Closing edge: elliptical arc (140px deep) instead of straight Z
const RIGHT_D = 'M829.8,1285 v-215.5 c0,-1.1,1.5,-1.3,1.8,-0.2,31.2,123.9,144.1,215.7,278.7,215.7 h287.3 v-570 h-287.3 c-134.6,0,-247.5,91.8,-278.7,215.7,-0.3,1,-1.8,0.8,-1.8,-0.2 v-215.5 A140,285,0,0,0,829.8,1285Z'

export function SlideLogoAnim() {
  const pairRef = useRef<SVGGElement>(null)
  const rightRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const pair = pairRef.current
    const rightG = rightRef.current
    if (!pair || !rightG) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    tl.to({}, { duration: 0.8 })
    tl.to(pair, { rotation: 180, duration: 1.2, svgOrigin: '970 1000' })
    tl.to({}, { duration: 0.8 })
    tl.to(rightG, { rotation: 90, duration: 1.2, svgOrigin: '1114 1000' })
    tl.to({}, { duration: 0.8 })
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
          <g ref={rightRef}>
            <path d={RIGHT_D} fill="#FFFFFF" />
          </g>
          <path d={LEFT_D} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
