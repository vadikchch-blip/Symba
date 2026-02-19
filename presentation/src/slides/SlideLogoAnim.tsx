'use client'

import styles from './SlideLogoAnim.module.css'

/**
 * Base symbol path (Симбиотика) — pointing left.
 * DD is the same shape (pointing left).
 * UD is the same shape rotated 90° clockwise.
 *
 * Animation: rotate the symbol through orientations:
 * 0° (Симбиотика/DD) → 90° (UD) → 180° (flipped) → 270° → 360° (back)
 *
 * Using Симбиотика as the canonical path, centered on its geometric center.
 */
const SYMBOL_PATH = 'M829.8,1285v-215.5c0-1.1,1.5-1.3,1.8-.2,31.2,123.9,144.1,215.7,278.7,215.7h287.3v-570h-287.3c-134.6,0-247.5,91.8-278.7,215.7-.3,1-1.8.8-1.8-.2v-215.5c-158.7,0-287.3,127.6-287.3,285,0,157.4,128.6,285,287.3,285Z'

export function SlideLogoAnim() {
  return (
    <div className={styles.slide}>
      <svg
        className={styles.logo}
        viewBox="0 0 2000 2000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.rotator}>
          <path d={SYMBOL_PATH} fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  )
}
