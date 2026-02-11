'use client'

import styles from './ImageWindow.module.css'

interface ImageWindowProps {
  src: string
  mask: 'symbol' | 'circleHalf' | 'none'
  alt?: string
}

export function ImageWindow({ src, mask, alt = '' }: ImageWindowProps) {
  return (
    <div className={styles.container}>
      <svg className={styles.defs} width="0" height="0">
        <defs>
          <clipPath id="symbolMask" clipPathUnits="objectBoundingBox">
            <path d="M0.57,0.59 v-0.18 c0,-0.001 -0.002,-0.0012 -0.002,0 C0.539,0.551 0.422,0.6 0.29,0.6 H0.05 V0.21 H0.29 C0.422,0.21 0.539,0.259 0.568,0.4 C0.57,0.401 0.572,0.401 0.572,0.4 V0.22 C0.722,0.22 0.844,0.34 0.844,0.48 S0.722,0.74 0.572,0.74 Z" />
          </clipPath>
          <clipPath id="circleHalfMask" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0 C0.776,0 1,0.224 1,0.5 S0.776,1 0.5,1 L0.5,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className={`${styles.imageWrapper} ${mask === 'symbol' ? styles.symbolMask : mask === 'circleHalf' ? styles.circleMask : ''}`}
      >
        <img src={src} alt={alt} className={styles.image} />
      </div>
    </div>
  )
}
