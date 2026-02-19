'use client'

import styles from './SlideLogoAnim.module.css'

/**
 * Two-half symbol animation: SS → DD → UD → DD → SS
 * Each half is the DD path, translated to origin.
 * Right half is scaleX(-1) to face left.
 * Left half animates: scaleX flip (DD) then rotate -90° (UD).
 */
const DD_PATH = 'M1056.3,1256.9v-197.9c0-1-1.4-1.2-1.6-.2-28.7,113.8-132.4,198.1-256,198.1h-263.8v-523.5s263.8,0,263.8,0c123.6,0,227.3,84.3,255.9,198.1.3,1,1.6.8,1.6-.2v-197.9c145.7,0,263.8,117.2,263.8,261.7s-118.1,261.7-263.8,261.7Z'
const VB = '525 725 800 545'

export function SlideLogoAnim() {
  return (
    <div className={styles.slide}>
      <div className={styles.mark}>
        <svg viewBox={VB} xmlns="http://www.w3.org/2000/svg" className={`${styles.half} ${styles.halfLeft}`}>
          <path d={DD_PATH} fill="#FFFFFF" />
        </svg>
        <svg viewBox={VB} xmlns="http://www.w3.org/2000/svg" className={`${styles.half} ${styles.halfRight}`}>
          <path d={DD_PATH} fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  )
}
