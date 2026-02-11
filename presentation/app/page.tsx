'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/slides')
  }, [router])

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#DDDCC8',
      fontFamily: "'EuclidCircular', 'Inter', sans-serif",
      color: '#292725',
    }}>
      <p>Загрузка презентации...</p>
    </div>
  )
}
