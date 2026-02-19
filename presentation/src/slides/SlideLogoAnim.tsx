'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { interpolate } from 'flubber'
import styles from './SlideLogoAnim.module.css'

const PATHS = {
  ss: 'M829.8,1285v-215.5c0-1.1,1.5-1.3,1.8-.2,31.2,123.9,144.1,215.7,278.7,215.7h287.3v-570h-287.3c-134.6,0-247.5,91.8-278.7,215.7-.3,1-1.8.8-1.8-.2v-215.5c-158.7,0-287.3,127.6-287.3,285,0,157.4,128.6,285,287.3,285Z',
  dd: 'M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z',
  ud: 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z',
}

const HOLD = 0.7
const TWEEN = 1.2
const EASE = 'power2.inOut'

export function SlideLogoAnim() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const morphAB = interpolate(PATHS.ss, PATHS.dd, { maxSegmentLength: 10 })
    const morphBC = interpolate(PATHS.dd, PATHS.ud, { maxSegmentLength: 10 })
    const morphCA = interpolate(PATHS.ud, PATHS.ss, { maxSegmentLength: 10 })

    const proxy = { t: 0 }

    const setPath = (interp: (t: number) => string, t: number) => {
      el.setAttribute('d', interp(t))
    }

    const tl = gsap.timeline({ repeat: -1 })

    // STATE A: SS — hold
    tl.set(proxy, { t: 0, onUpdate: () => setPath(morphAB, 0) })
    tl.to({}, { duration: HOLD })

    // A → B: SS → DD
    tl.to(proxy, {
      t: 1,
      duration: TWEEN,
      ease: EASE,
      onUpdate: () => setPath(morphAB, proxy.t),
    })
    tl.to({}, { duration: HOLD })

    // B → C: DD → UD
    tl.set(proxy, { t: 0 })
    tl.to(proxy, {
      t: 1,
      duration: TWEEN,
      ease: EASE,
      onUpdate: () => setPath(morphBC, proxy.t),
    })
    tl.to({}, { duration: HOLD })

    // C → A: UD → SS
    tl.set(proxy, { t: 0 })
    tl.to(proxy, {
      t: 1,
      duration: TWEEN,
      ease: EASE,
      onUpdate: () => setPath(morphCA, proxy.t),
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div className={styles.slide}>
      <svg
        className={styles.logo}
        viewBox="0 0 2000 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path ref={pathRef} d={PATHS.ss} fill="#FFFFFF" />
      </svg>
    </div>
  )
}
