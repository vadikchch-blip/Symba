'use client'

import type { SlideData } from '../Presentation'
import { SlideLayout } from './SlideLayout'
import { TopBrandBar } from '../brand/TopBrandBar'
import { ModularTiles } from '../brand/ModularTiles'
import styles from './ClosingSlide.module.css'

interface ClosingSlideProps {
  slide: SlideData
}

export function ClosingSlide({ slide }: ClosingSlideProps) {
  return (
    <SlideLayout>
      <TopBrandBar variant="dark" showTagline />

      <ModularTiles subtle={slide.visual.subtle !== false} accent={slide.accent} />

      <div className={styles.content}>
        <div className={styles.mainText}>
          {slide.body && <p className={styles.body}>{slide.body}</p>}

          {slide.closingLines && (
            <div className={styles.closingLines}>
              {slide.closingLines.map((line, i) => (
                <p key={i} className={styles.closingLine}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.brandSymbol}>
            <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="var(--color-accent-brick)"
                d="M60,50v-25c0-.13-.18-.15-.2-.03-3.6,14.6-16.6,25.5-32,25.5h-33v-67.3h33c16,0,29.2,10.8,32,25.4.03.13.2.1.2-.03v-25.4c18.2,0,33,15,33,33.6s-14.8,33.3-33,33.3Z"
                transform="translate(2, 18) scale(1.0)"
              />
            </svg>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactLine}>symbiotica.pro</div>
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
