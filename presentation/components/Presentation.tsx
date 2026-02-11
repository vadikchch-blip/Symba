'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { CoverSlide } from './slides/CoverSlide'
import { TextSlide } from './slides/TextSlide'
import { TextTechSlide } from './slides/TextTechSlide'
import { ClosingSlide } from './slides/ClosingSlide'
import { PresenterPanel } from './PresenterPanel'
import { SlideProgress } from './SlideProgress'
import { assetPath } from '@/lib/basePath'
import styles from './Presentation.module.css'

export interface SlideData {
  id: string
  type: 'cover' | 'text' | 'text+tech' | 'closing'
  title: string
  subtitle?: string
  bullets?: string[]
  quote?: string[]
  body?: string
  closingLines?: string[]
  tech?: { k: string; v: string }[]
  visual: {
    mode: string
    src?: string
    mask?: string
    tiles?: string
    subtle?: boolean
    bg?: string
  }
  accent: string
}

const slides: SlideData[] = [
  {
    id: 's01',
    type: 'cover',
    title: 'Симбиотика',
    subtitle: 'Благоустройство как управляемая часть\nдевелоперского проекта',
    visual: { mode: 'image', src: '/images/194464417_adef9bc2-5ea4-4aaf-867a-2b614941e81f_result.png', mask: 'none' },
    accent: 'accentBrick',
  },
  {
    id: 's02',
    type: 'text',
    title: 'Контекст',
    bullets: [
      'Город — это не только архитектура. Это то, как человек в нём живёт каждый день.',
      'Благоустройство — это эргономика среды: расстояния, масштаб, пропорции, логика движения.',
      'В основе всегда три вещи: эстетика, эргономика и долговечность.',
    ],
    visual: { mode: 'pattern', tiles: 'modularTiles', subtle: true },
    accent: 'none',
  },
  {
    id: 's03',
    type: 'text',
    title: 'Реальность девелопера',
    bullets: [
      'Проект меняется: вводные, бюджеты, решения, сроки.',
      'Блок МАФов часто ведут отдельно — ответственность распадается между подрядчиками.',
      'Цель — чтобы этот блок не требовал постоянного ручного управления и не отвлекал от ключевых решений.',
    ],
    visual: { mode: 'imageWindow', src: '/images/eb64054d_nano_1K.jpg', mask: 'symbol' },
    accent: 'accentMoss',
  },
  {
    id: 's04',
    type: 'text',
    title: 'Система, а не изделия',
    quote: [
      'Мы не рассматриваем малые архитектурные формы как отдельные изделия.',
      'Для нас это всегда часть более широкой системы, встроенной в конкретный проект, его архитектуру и сценарии использования.',
    ],
    body: 'Важно, чтобы элемент логично продолжал архитектуру проекта и усиливал её, а не спорил с ней. При этом он должен быть продуман по взаимодействию с человеком: высота, посадка, расстояния. Эргономика здесь не дополнение к форме, а её продолжение.',
    visual: { mode: 'image', src: '/images/194464417_b7b2bdbb-e603-415f-a4b3-f9bd9c885c33_result.png', mask: 'none' },
    accent: 'accentBrick',
  },
  {
    id: 's05',
    type: 'text',
    title: 'Работа с изменениями',
    bullets: [
      'Изменения — норма.',
      'Проблема начинается, когда решение не рассчитано на уточнения.',
      'Мы закладываем конструктивную гибкость, чтобы корректировки не срывали процесс.',
    ],
    visual: { mode: 'pattern', tiles: 'modularTiles', subtle: true },
    accent: 'accentLilac',
  },
  {
    id: 's06',
    type: 'text',
    title: 'Полный цикл',
    bullets: [
      'Проектирование, производство, логистика, монтаж — одна цепочка.',
      'Когда за неё отвечает один центр, процесс перестаёт распадаться.',
      'Меньше накладок. Меньше срочных вмешательств.',
    ],
    visual: { mode: 'imageWindow', src: '/images/1c7838f9_nano_1K.jpg', mask: 'circleHalf' },
    accent: 'accentOchre',
  },
  {
    id: 's07',
    type: 'text+tech',
    title: 'Эксплуатация и климат',
    body: 'Южный климат предъявляет особые требования: высокая влажность и циклы замерзания ускоряют износ. Поэтому используем бетон не ниже М600 — с учётом влагостойкости и морозостойкости.',
    tech: [
      { k: 'Бетон', v: 'M600+' },
      { k: 'Фокус', v: 'влагостойкость / морозостойкость' },
      { k: 'Цель', v: 'срок службы / снижение рекламаций' },
    ],
    visual: { mode: 'product', src: '/images/d203d80a_nano_1K.jpg', bg: 'chalk' },
    accent: 'accentBrick',
  },
  {
    id: 's08',
    type: 'text',
    title: 'Качество как процесс',
    bullets: [
      'Качество не появляется в конце — оно закладывается в технологии и допусках.',
      'Контроль на каждом этапе даёт предсказуемый результат.',
      'К этому блоку не приходится возвращаться после сдачи объекта.',
    ],
    visual: { mode: 'image', src: '/images/194464417_cbb391d0-f4c3-4675-952c-bb86348b9fd7_result.png', mask: 'none' },
    accent: 'none',
  },
  {
    id: 's09',
    type: 'closing',
    title: 'Финал',
    body: 'В итоге благоустройство перестаёт быть зоной риска и становится управляемой частью проекта. Оно не требует постоянного вмешательства и спокойно работает в рамках общей архитектурной логики.',
    closingLines: [
      'Именно такой формат работы мы считаем правильным.',
      'И именно в таком формате нам комфортно работать с девелоперами.',
    ],
    visual: { mode: 'pattern', tiles: 'modularTiles', subtle: false },
    accent: 'accentBrick',
  },
]

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [presenterMode, setPresenterMode] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSlides = slides.length

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (index < 0 || index >= totalSlides || isTransitioning) return
      setDirection(dir || (index > currentSlide ? 'next' : 'prev'))
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setTimeout(() => setIsTransitioning(false), 50)
      }, 300)
    },
    [currentSlide, totalSlides, isTransitioning]
  )

  const next = useCallback(() => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1, 'next')
  }, [currentSlide, totalSlides, goToSlide])

  const prev = useCallback(() => {
    if (currentSlide > 0) goToSlide(currentSlide - 1, 'prev')
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0, 'prev')
          break
        case 'End':
          e.preventDefault()
          goToSlide(totalSlides - 1, 'next')
          break
        case 'p':
        case 'P':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault()
            setPresenterMode((p) => !p)
          }
          break
        case 'Escape':
          e.preventDefault()
          setPresenterMode(false)
          break
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault()
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen()
            } else {
              document.exitFullscreen()
            }
          }
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev, goToSlide, totalSlides])

  const handleClick = (e: React.MouseEvent) => {
    if (presenterMode) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x > rect.width * 0.65) {
      next()
    } else if (x < rect.width * 0.35) {
      prev()
    }
  }

  const resolveSlide = (slide: SlideData): SlideData => ({
    ...slide,
    visual: {
      ...slide.visual,
      src: slide.visual.src ? assetPath(slide.visual.src) : undefined,
    },
  })

  const renderSlide = (slide: SlideData) => {
    const resolved = resolveSlide(slide)
    switch (resolved.type) {
      case 'cover':
        return <CoverSlide slide={resolved} />
      case 'text':
        return <TextSlide slide={resolved} />
      case 'text+tech':
        return <TextTechSlide slide={resolved} />
      case 'closing':
        return <ClosingSlide slide={resolved} />
      default:
        return <TextSlide slide={resolved} />
    }
  }

  return (
    <div className={`${styles.presentation} ${presenterMode ? styles.presenterLayout : ''}`}>
      <div className={styles.slideArea} onClick={handleClick}>
        <div
          className={`${styles.slideContainer} ${isTransitioning ? styles.exiting : styles.entering} ${
            direction === 'next' ? styles.fromRight : styles.fromLeft
          }`}
        >
          {renderSlide(slides[currentSlide])}
        </div>
        <SlideProgress current={currentSlide} total={totalSlides} onGoTo={(i) => goToSlide(i)} />
      </div>

      {presenterMode && (
        <PresenterPanel
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          slideTitle={slides[currentSlide].title}
          nextSlideTitle={currentSlide < totalSlides - 1 ? slides[currentSlide + 1].title : null}
          onNext={next}
          onPrev={prev}
        />
      )}

      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={(e) => { e.stopPropagation(); prev() }}
          disabled={currentSlide === 0}
          aria-label="Предыдущий слайд"
        >
          ‹
        </button>
        <span className={styles.slideCounter}>
          {currentSlide + 1} / {totalSlides}
        </span>
        <button
          className={styles.controlBtn}
          onClick={(e) => { e.stopPropagation(); next() }}
          disabled={currentSlide === totalSlides - 1}
          aria-label="Следующий слайд"
        >
          ›
        </button>
        <button
          className={`${styles.controlBtn} ${styles.presenterBtn}`}
          onClick={(e) => { e.stopPropagation(); setPresenterMode((p) => !p) }}
          title="Режим презентатора (P)"
        >
          ⬚
        </button>
        <button
          className={`${styles.controlBtn} ${styles.fullscreenBtn}`}
          onClick={(e) => {
            e.stopPropagation()
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen()
            } else {
              document.exitFullscreen()
            }
          }}
          title="Полный экран (F)"
        >
          ⛶
        </button>
      </div>
    </div>
  )
}
