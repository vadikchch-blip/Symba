'use client'

import type { SlideData } from '../Presentation'
import { SlideLayout } from './SlideLayout'
import { TopBrandBar } from '../brand/TopBrandBar'
import { ModularTiles } from '../brand/ModularTiles'
import { ImageWindow } from '../brand/ImageWindow'
import styles from './TextSlide.module.css'

interface TextSlideProps {
  slide: SlideData
}

const accentColorMap: Record<string, string> = {
  accentBrick: 'var(--color-accent-brick)',
  accentOchre: 'var(--color-accent-ochre)',
  accentMoss: 'var(--color-accent-moss)',
  accentLilac: 'var(--color-accent-lilac)',
  accentPink: 'var(--color-accent-pink)',
  none: 'var(--color-sand)',
}

export function TextSlide({ slide }: TextSlideProps) {
  const accentColor = accentColorMap[slide.accent] || accentColorMap.none
  const hasVisualImage =
    slide.visual.mode === 'image' || slide.visual.mode === 'imageWindow' || slide.visual.mode === 'product'
  const hasPattern = slide.visual.mode === 'pattern'

  return (
    <SlideLayout>
      <TopBrandBar variant="dark" showTagline={false} />

      {hasPattern && (
        <ModularTiles subtle={slide.visual.subtle !== false} accent={slide.accent} />
      )}

      <div className={`${styles.content} ${hasVisualImage ? styles.twoCol : styles.oneCol}`}>
        {/* Text column */}
        <div className={styles.textCol}>
          <div className={styles.titleArea}>
            <div className={styles.accentDot} style={{ background: accentColor }} />
            <h2 className={styles.title}>{slide.title}</h2>
          </div>

          {slide.quote && (
            <blockquote className={styles.quote}>
              {slide.quote.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </blockquote>
          )}

          {slide.bullets && (
            <ul className={styles.bullets}>
              {slide.bullets.map((bullet, i) => (
                <li key={i} className={styles.bullet}>
                  <span className={styles.bulletMarker} style={{ background: accentColor }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {slide.body && (
            <p className={styles.body}>{slide.body}</p>
          )}
        </div>

        {/* Visual column */}
        {hasVisualImage && slide.visual.src && (
          <div className={styles.visualCol}>
            {slide.visual.mode === 'imageWindow' ? (
              <ImageWindow
                src={slide.visual.src}
                mask={(slide.visual.mask as 'symbol' | 'circleHalf' | 'none') || 'none'}
              />
            ) : (
              <div className={styles.imageContainer}>
                <img src={slide.visual.src} alt="" className={styles.image} />
              </div>
            )}
          </div>
        )}
      </div>
    </SlideLayout>
  )
}
