'use client'

import { useState, useEffect } from 'react'
import styles from './PresenterPanel.module.css'

interface PresenterPanelProps {
  currentSlide: number
  totalSlides: number
  slideTitle: string
  nextSlideTitle: string | null
  onNext: () => void
  onPrev: () => void
}

export function PresenterPanel({
  currentSlide,
  totalSlides,
  slideTitle,
  nextSlideTitle,
  onNext,
  onPrev,
}: PresenterPanelProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.badge}>Presenter</span>
        <span className={styles.timer}>{formatTime(elapsed)}</span>
      </div>

      <div className={styles.slideInfo}>
        <div className={styles.slideNum}>
          Слайд {currentSlide + 1} из {totalSlides}
        </div>
        <h3 className={styles.slideTitle}>{slideTitle}</h3>
      </div>

      {nextSlideTitle && (
        <div className={styles.nextSlide}>
          <span className={styles.nextLabel}>Далее:</span>
          <span className={styles.nextTitle}>{nextSlideTitle}</span>
        </div>
      )}

      <div className={styles.navButtons}>
        <button onClick={onPrev} disabled={currentSlide === 0} className={styles.navBtn}>
          ← Назад
        </button>
        <button onClick={onNext} disabled={currentSlide === totalSlides - 1} className={styles.navBtn}>
          Далее →
        </button>
      </div>

      <div className={styles.shortcuts}>
        <h4>Горячие клавиши</h4>
        <div className={styles.shortcut}><kbd>→</kbd> <kbd>Space</kbd> Следующий</div>
        <div className={styles.shortcut}><kbd>←</kbd> Предыдущий</div>
        <div className={styles.shortcut}><kbd>F</kbd> Полный экран</div>
        <div className={styles.shortcut}><kbd>P</kbd> Презентатор</div>
        <div className={styles.shortcut}><kbd>Esc</kbd> Закрыть панель</div>
        <div className={styles.shortcut}><kbd>Home</kbd> В начало</div>
        <div className={styles.shortcut}><kbd>End</kbd> В конец</div>
      </div>
    </div>
  )
}
