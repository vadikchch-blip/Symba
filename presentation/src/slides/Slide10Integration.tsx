'use client'

import { useState } from 'react'
import { slide10img } from '@/src/data/slides'
import { assetPath } from '@/lib/basePath'
import styles from './Slide10Integration.module.css'

export function Slide10Integration() {
  const [src, setSrc] = useState(assetPath(slide10img.image))

  return (
    <div className={styles.slide}>
      <img
        src={src}
        alt=""
        className={styles.photo}
        onError={() => setSrc(assetPath(slide10img.imageFallback))}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{slide10img.eyebrow}</span>
        <h1 className={styles.title}>{slide10img.title}</h1>
        <p className={styles.body}>
          {slide10img.body.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < slide10img.body.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
