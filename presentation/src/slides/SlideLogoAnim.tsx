'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './SlideLogoAnim.module.css'

/**
 * Two D-shapes side by side.
 * SS: facing each other (left mirrored, right normal)
 * DD: whole pair rotates 180° → both face same way
 * UD: left D rotates 90° clockwise (right stays)
 * Return: UD→DD→SS in one fluid reverse
 */
const D_PATH = 'M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z'
const VB = '525 725 800 545'

export function SlideLogoAnim() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const leftD = leftRef.current
    if (!container || !leftD) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    // SS hold
    tl.to({}, { duration: 0.8 })

    // SS → DD: whole pair rotates 180°
    tl.to(container, { rotation: 180, duration: 1.2 })

    // DD hold
    tl.to({}, { duration: 0.8 })

    // DD → UD: left D rotates 90° clockwise
    tl.to(leftD, { rotation: 90, duration: 1.2 })

    // UD hold
    tl.to({}, { duration: 0.8 })

    // UD → DD → SS: reverse in one fluid motion
    // Left D back to 0°
    tl.to(leftD, { rotation: 0, duration: 1.0 })
    // Container back to 0° (starts slightly before left finishes)
    tl.to(container, { rotation: 0, duration: 1.2 }, '-=0.4')

    // Final hold before loop
    tl.to({}, { duration: 0.4 })

    return () => { tl.kill() }
  }, [])

  return (
    <div className={styles.slide}>
      <div className={styles.container} ref={containerRef}>
        {/* Left D: mirrored (faces right in SS) */}
        <svg
          ref={leftRef}
          viewBox={VB}
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.half} ${styles.leftD}`}
        >
          <path d={D_PATH} fill="#FFFFFF" />
        </svg>
        {/* Right D: normal (faces left in SS) */}
        <svg
          viewBox={VB}
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.half} ${styles.rightD}`}
        >
          <path d={D_PATH} fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  )
}
