'use client'

import type { SlideData } from '../Presentation'
import { TopBrandBar } from '../brand/TopBrandBar'
import styles from './CoverSlide.module.css'

interface CoverSlideProps {
  slide: SlideData
}

export function CoverSlide({ slide }: CoverSlideProps) {
  return (
    <div className={styles.cover}>
      {/* Background image */}
      {slide.visual.src && (
        <div className={styles.bgImage}>
          <img src={slide.visual.src} alt="" />
        </div>
      )}
      <div className={styles.overlay} />

      <TopBrandBar variant="light" showTagline />

      <div className={styles.content}>
        <div className={styles.accentLine} />
        <h1 className={styles.title}>{slide.title}</h1>
        {slide.subtitle && (
          <p className={styles.subtitle}>
            {slide.subtitle.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < slide.subtitle!.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.taglineBottom}>
          Качество пространства. Качество жизни.
        </div>
      </div>
    </div>
  )
}
