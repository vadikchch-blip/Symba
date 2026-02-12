'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { assetPath } from '@/lib/basePath'
import { Slide01Hero } from '@/src/slides/Slide01Hero'
import { Slide02Directions } from '@/src/slides/Slide02Directions'
import { Slide03Context } from '@/src/slides/Slide03Context'
import { Slide04Principles } from '@/src/slides/Slide04Principles'
import { Slide05DeveloperReality } from '@/src/slides/Slide05DeveloperReality'
import { Slide06SystemNotProducts } from '@/src/slides/Slide06SystemNotProducts'
import { Slide07ProjectStart } from '@/src/slides/Slide07ProjectStart'
import { Slide08Ergonomics } from '@/src/slides/Slide08Ergonomics'
import { Slide09ChangeManagement } from '@/src/slides/Slide09ChangeManagement'
import { Slide10Integration } from '@/src/slides/Slide10Integration'
import { Slide11Scale } from '@/src/slides/Slide11Scale'
import { Slide12Climate } from '@/src/slides/Slide12Climate'
import styles from './Presentation.module.css'

const TOTAL_SLIDES = 14

export function Presentation() {
  const [current, setCurrent] = useState(0)
  const [presenterMode, setPresenterMode] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const go = useCallback((i: number) => {
    if (i >= 0 && i < TOTAL_SLIDES) setCurrent(i)
  }, [])
  const next = useCallback(() => go(current + 1), [current, go])
  const prev = useCallback(() => go(current - 1), [current, go])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': e.preventDefault(); next(); break
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': e.preventDefault(); prev(); break
        case 'Home': e.preventDefault(); go(0); break
        case 'End': e.preventDefault(); go(TOTAL_SLIDES - 1); break
        case 'p': case 'P': if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); setPresenterMode(p => !p) } break
        case 'Escape': setPresenterMode(false); break
        case 'f': case 'F': if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen() } break
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [next, prev, go])

  useEffect(() => {
    const start = Date.now()
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    if (presenterMode) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    x > r.width * 0.6 ? next() : x < r.width * 0.4 ? prev() : null
  }

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const num = (n: number) => (n + 1).toString().padStart(2, '0')
  const progress = ((current + 1) / TOTAL_SLIDES) * 100
  const img = (p: string) => assetPath(p)

  // Inline SVG logo wordmark
  const Logo = ({ color = 'currentColor', className = '' }: { color?: string; className?: string }) => (
    <svg className={className} viewBox="0 0 2000 699.3" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M1599,437.6c-15.7,0-28.9-5.8-39.7-17.5-10.6-11.7-15.9-25.9-15.9-42.5s5.3-30.8,15.9-42.5c10.8-11.7,24-17.5,39.7-17.5s15.1,1.8,21.7,5.3c6.6,3.4,11.7,7.5,15.2,12.5v-15.5h25.4v115.4h-25.4v-15.5c-3.5,4.9-8.6,9.2-15.2,12.7-6.6,3.4-13.8,5.1-21.7,5.1ZM1578.9,403.9c6.5,7.1,14.7,10.6,24.7,10.6s18.2-3.5,24.7-10.6c6.5-7.1,9.7-15.8,9.7-26.3s-3.2-19.2-9.7-26.3c-6.5-7.1-14.7-10.6-24.7-10.6s-18.2,3.5-24.7,10.6c-6.5,7.1-9.7,15.9-9.7,26.3s3.2,19.2,9.7,26.3Z"/>
      <path fill={color} d="M1513,435.3l-51.2-49.2v49.2h-25.4v-115.4h25.4v49.4l45.4-49.4h30.9l-52.4,56.8,60.7,58.6h-33.5Z"/>
      <path fill={color} d="M1320.3,435.3h-22.6v-115.4h25.4v76.8l58.8-76.8h22.6v115.4h-25.4v-76.9l-58.8,76.9Z"/>
      <path fill={color} d="M1217.2,435.3v-92.8h-34.6v-22.6h96.2v22.6h-36.2v92.8h-25.4Z"/>
      <path fill={color} d="M1158.2,420.3c-11.5,11.5-25.8,17.3-42.9,17.3s-31.5-5.8-43.1-17.3c-11.5-11.7-17.3-25.9-17.3-42.7s5.8-30.9,17.3-42.5c11.7-11.7,26.1-17.5,43.1-17.5s31.4,5.8,42.9,17.5c11.7,11.5,17.5,25.7,17.5,42.5s-5.8,31-17.5,42.7ZM1115.3,414c10,0,18.2-3.5,24.7-10.4,6.6-7.1,9.9-15.8,9.9-26.1s-3.3-18.9-9.9-25.8c-6.5-7.1-14.7-10.6-24.7-10.6s-18.5,3.5-25.1,10.6c-6.5,6.9-9.7,15.5-9.7,25.8s3.2,19,9.7,26.1c6.6,6.9,15,10.4,25.1,10.4Z"/>
      <path fill={color} d="M947,435.3h-22.6v-115.4h25.4v76.8l58.8-76.8h22.6v115.4h-25.4v-76.9l-58.8,76.9Z"/>
      <path fill={color} d="M840.4,437.6c-18.8,0-33.4-6.1-44.1-18.5-10.6-12.3-15.9-28.8-15.9-49.4v-9.2c0-28.6,5.4-49.9,16.1-63.9,10.9-14,27.9-23.2,51-27.7l41.7-7.6v24.2l-36.2,6.5c-15.1,2.8-26.2,7.7-33.4,14.8-7.1,7.1-11.5,17.4-13.1,30.9,9.5-11.1,22.2-16.6,38.1-16.6s30.5,5.5,40.8,16.4c10.3,10.8,15.5,24,15.5,39.7s-5.8,31.2-17.5,42.9c-11.5,11.7-25.8,17.5-42.9,17.5ZM815.3,404.1c6.5,6.6,14.8,9.9,24.9,9.9s18.5-3.3,24.9-9.9c6.6-6.8,9.9-15.6,9.9-26.5s-3.3-17.8-9.9-24.2c-6.5-6.5-14.7-9.7-24.7-9.7s-18.5,3.3-24.9,9.9c-6.5,6.6-9.7,14.6-9.7,24s3.2,19.8,9.5,26.5Z"/>
      <path fill={color} d="M627.2,319.9h22.1l40.4,52.6,40.8-52.6h22.1v115.4h-25.4v-75.5l-37.4,48.5-37.4-48.5v75.5h-25.4v-115.4Z"/>
      <path fill={color} d="M511.1,435.3h-22.6v-115.4h25.4v76.8l58.8-76.8h22.6v115.4h-25.4v-76.9l-58.8,76.9Z"/>
      <path fill={color} d="M387.7,438.1c-24.4,0-44.8-8.1-61.1-24.2-16.1-16.3-24.2-36.5-24.2-60.5s8.1-44.1,24.2-60.2c16.3-16.3,36.7-24.5,61.1-24.5s36.3,5.5,50.7,16.6c14.6,10.9,24,24.6,28.1,41.1h-29.1c-3.5-9.4-9.8-17-18.9-22.8-9.1-5.8-19.4-8.8-30.9-8.8-16.9,0-30.8,5.6-41.7,16.8-10.9,11.2-16.4,25.2-16.4,41.8s5.5,30.5,16.4,41.8c10.9,11.2,24.8,16.8,41.7,16.8s21.8-2.9,30.9-8.8c9.1-5.8,15.4-13.5,18.9-22.9h29.1c-4.2,16.5-13.5,30.2-28.1,41.3-14.5,10.9-31.4,16.4-50.7,16.4Z"/>
    </svg>
  )

  const Blueprint = () => <div className={styles.blueprint} />
  const Mono = ({ children, accent = false, className = '' }: { children: React.ReactNode; accent?: boolean; className?: string }) => (
    <span className={`${styles.mono} ${accent ? styles.monoAccent : ''} ${className}`}>{children}</span>
  )

  const slides = [
    // [01] HERO — типографика, воздух, акцент
    <Slide01Hero key="s01" />,

    // [02] НАПРАВЛЕНИЯ — UD / DD
    <Slide02Directions key="s02" />,

    // [03] КОНТЕКСТ
    <Slide03Context key="s03" />,

    // [04] ПРИНЦИПЫ
    <Slide04Principles key="s04" />,

    // [05] ПРОБЛЕМА
    <Slide05DeveloperReality key="s05" />,

    // [06] СИСТЕМА
    <Slide06SystemNotProducts key="s06" />,

    // [07] ПОДХОД
    <Slide07ProjectStart key="s07" />,

    // [08] ЭРГОНОМИКА — плакатный тезис
    <Slide08Ergonomics key="s08" />,

    // [09] ГИБКОСТЬ
    <Slide09ChangeManagement key="s09" />,

    // [10] ИНТЕГРАЦИЯ — full-width image
    <Slide10Integration key="s10" />,

    // [11] МАСШТАБ — типографический слайд силы
    <Slide11Scale key="s11" />,

    // [12] ЭКСПЛУАТАЦИЯ И КЛИМАТ
    <Slide12Climate key="s12" />,

    // [14] ПАРТНЁРСТВО
    <div key="s14" className={`${styles.s} ${styles.sRow}`}>
      <div className={styles.grid12}>
        <div className={styles.col7}>
          <Mono accent>14 Модель работы</Mono>
          <h1 className={styles.h1big}>От концепции<br />до авторского надзора.</h1>
        </div>
        <div className={`${styles.col5} ${styles.steps}`}>
          {['Проектирование', 'Производство', 'Монтаж'].map((s, i) => (
            <div key={s} className={styles.step}>
              <div className={`${styles.stepLine} ${i === 0 ? styles.stepLineAccent : ''}`} />
              <Mono>{s}</Mono>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // [15] РЕЗУЛЬТАТ
    <div key="s15" className={`${styles.s} ${styles.sFullImg}`}>
      <img src={img('/images/194464417_adef9bc2-5ea4-4aaf-867a-2b614941e81f_result.png')} alt="" className={styles.fullImg} />
      <div className={styles.fullImgOverlay}>
        <h1 className={styles.h1xxl}>Среда, которая работает на репутацию проекта.</h1>
      </div>
    </div>,

    // [16] КОНТАКТЫ
    <div key="s16" className={`${styles.s} ${styles.sCenter}`}>
      <Blueprint />
      <div className={styles.contactBlock}>
        <Logo color="var(--text-main)" className={styles.contactLogo} />
        <div className={styles.contactInfo}>
          <p className={styles.contactMain}>symbiotica.pro</p>
          <div className={styles.contactLine} />
          <Mono className={styles.opacityLow}>2026 / Архитектурный бетон</Mono>
        </div>
      </div>
    </div>,
  ]

  return (
    <div className={styles.presentation}>
      <div className={styles.slideArea} onClick={handleClick}>
        {slides.map((slide, i) => (
          <div key={i} className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}>
            {slide}
          </div>
        ))}
      </div>

      {/* Nav UI */}
      <div className={styles.navUi}>
        <button className={styles.navBtn} onClick={e => { e.stopPropagation(); prev() }} disabled={current === 0}>←</button>
        <span className={styles.counter}>{num(current)} / {num(TOTAL_SLIDES - 1)}</span>
        <button className={styles.navBtn} onClick={e => { e.stopPropagation(); next() }} disabled={current === TOTAL_SLIDES - 1}>→</button>
        <button className={styles.navBtn} onClick={e => { e.stopPropagation(); setPresenterMode(p => !p) }} title="P">⬚</button>
      </div>

      {/* Progress */}
      <div className={styles.progressRail}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* Presenter */}
      {presenterMode && (
        <div className={styles.presenter}>
          <div className={styles.presenterHeader}>
            <span className={styles.presenterBadge}>Presenter</span>
            <span className={styles.presenterTimer}>{fmt(elapsed)}</span>
          </div>
          <div className={styles.presenterInfo}>
            Слайд {current + 1} из {TOTAL_SLIDES}
          </div>
          <div className={styles.presenterNav}>
            <button onClick={prev} disabled={current === 0} className={styles.presenterBtn}>← Назад</button>
            <button onClick={next} disabled={current === TOTAL_SLIDES - 1} className={styles.presenterBtn}>Далее →</button>
          </div>
          <div className={styles.presenterKeys}>
            <div>→ / Space — далее</div>
            <div>← — назад</div>
            <div>F — полный экран</div>
            <div>P — презентатор</div>
            <div>Esc — закрыть</div>
          </div>
        </div>
      )}
    </div>
  )
}
