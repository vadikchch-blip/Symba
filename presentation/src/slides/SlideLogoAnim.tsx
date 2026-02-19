'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './SlideLogoAnim.module.css'

/**
 * Three states of the symbol — same viewBox, different paths.
 * Animation: SS → DD → UD → SS (infinite loop)
 * Single SVG container, paths swap with brief crossfade at pause moments.
 */
const STATES = [
  {
    id: 'ss',
    d: 'M829.8,1285v-215.5c0-1.1,1.5-1.3,1.8-.2,31.2,123.9,144.1,215.7,278.7,215.7h287.3v-570h-287.3c-134.6,0-247.5,91.8-278.7,215.7-.3,1-1.8.8-1.8-.2v-215.5c-158.7,0-287.3,127.6-287.3,285,0,157.4,128.6,285,287.3,285Z',
  },
  {
    id: 'dd',
    d: 'M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z',
  },
  {
    id: 'ud',
    d: 'M1056.9,731.1h-525v262.5c0,145,117.5,262.5,262.5,262.5s259.2-118.4,261.6-261.3h.9v261.3c145,0,262.5-117.5,262.5-262.5s-117.5-262.5-262.5-262.5Z',
  },
]

const HOLD = 800
const FADE = 120
const CYCLE = STATES.length * (HOLD + FADE)

export function SlideLogoAnim() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.current) return

    const step = () => {
      setFading(true)
      timer.current = setTimeout(() => {
        setActive(prev => (prev + 1) % STATES.length)
        setFading(false)
        timer.current = setTimeout(step, HOLD)
      }, FADE)
    }

    timer.current = setTimeout(step, HOLD)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  return (
    <div className={styles.slide}>
      <svg
        className={styles.logo}
        viewBox="0 0 2000 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={STATES[active].d}
          fill="#FFFFFF"
          className={fading ? styles.pathFade : styles.pathVisible}
        />
      </svg>
    </div>
  )
}
