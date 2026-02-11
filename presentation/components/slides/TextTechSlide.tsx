'use client'

import type { SlideData } from '../Presentation'
import { SlideLayout } from './SlideLayout'
import { TopBrandBar } from '../brand/TopBrandBar'
import { TechCard } from '../brand/TechCard'
import styles from './TextTechSlide.module.css'

interface TextTechSlideProps {
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

export function TextTechSlide({ slide }: TextTechSlideProps) {
  const accentColor = accentColorMap[slide.accent] || accentColorMap.none

  return (
    <SlideLayout bg={slide.visual.bg || 'chalk'}>
      <TopBrandBar variant="dark" showTagline={false} />

      <div className={styles.content}>
        <div className={styles.textCol}>
          <div className={styles.titleArea}>
            <div className={styles.accentDot} style={{ background: accentColor }} />
            <h2 className={styles.title}>{slide.title}</h2>
          </div>

          {slide.body && <p className={styles.body}>{slide.body}</p>}

          {slide.tech && <TechCard items={slide.tech} accent={slide.accent} />}
        </div>

        {slide.visual.src && (
          <div className={styles.visualCol}>
            <div className={styles.productImage}>
              <img src={slide.visual.src} alt="" className={styles.image} />
            </div>
          </div>
        )}
      </div>
    </SlideLayout>
  )
}
