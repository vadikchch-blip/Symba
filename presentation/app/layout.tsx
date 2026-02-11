import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Симбиотика — Презентация для девелоперов',
  description: 'Благоустройство как управляемая часть девелоперского проекта',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
