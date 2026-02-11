'use client'

import React from 'react'
import styles from './SlideLayout.module.css'

interface SlideLayoutProps {
  children: React.ReactNode
  bg?: string
  accent?: string
  className?: string
}

const bgMap: Record<string, string> = {
  chalk: 'var(--color-chalk)',
  white: 'var(--color-white)',
  cement: 'var(--color-cement)',
  graphite: 'var(--color-graphite-text)',
  black: 'var(--color-black)',
}

export function SlideLayout({ children, bg = 'chalk', className = '' }: SlideLayoutProps) {
  const bgColor = bgMap[bg] || bgMap.chalk

  return (
    <div className={`${styles.slide} ${className}`} style={{ background: bgColor }}>
      <div className={styles.frame}>{children}</div>
    </div>
  )
}
