'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import * as slidesDefaults from '@/src/data/slides'

type SlidesData = typeof slidesDefaults

const STORAGE_KEY = 'symba-slides-data'

interface EditorContextValue {
  editMode: boolean
  toggleEditMode: () => void
  data: SlidesData
  updateField: (slideKey: keyof SlidesData, path: string[], value: string) => void
  resetToDefaults: () => void
}

const EditorContext = createContext<EditorContextValue | null>(null)

function setNestedValue(obj: any, path: string[], value: string): any {
  if (path.length === 0) return value
  const [key, ...rest] = path
  if (Array.isArray(obj)) {
    const arr = [...obj]
    arr[Number(key)] = setNestedValue(arr[Number(key)], rest, value)
    return arr
  }
  return { ...obj, [key]: setNestedValue(obj[key], rest, value) }
}

export function getNestedValue(obj: any, path: string[]): string {
  let val = obj
  for (const key of path) {
    if (val == null) return ''
    val = Array.isArray(val) ? val[Number(key)] : val[key]
  }
  return typeof val === 'string' ? val : ''
}

function loadSavedData(): SlidesData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Deep merge: saved data overrides defaults, but defaults fill in any missing keys
      const merged: any = { ...slidesDefaults }
      for (const key of Object.keys(parsed)) {
        if (key in slidesDefaults) {
          merged[key] = { ...(slidesDefaults as any)[key], ...parsed[key] }
        }
      }
      return merged as SlidesData
    }
  } catch {}
  return { ...slidesDefaults }
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  // Start with defaults (SSR-safe). Load from localStorage after mount.
  const [data, setData] = useState<SlidesData>({ ...slidesDefaults })

  // Load saved data after client mount — avoids SSR/hydration mismatch
  useEffect(() => {
    setData(loadSavedData())
  }, [])

  const toggleEditMode = useCallback(() => setEditMode(m => !m), [])

  const updateField = useCallback((slideKey: keyof SlidesData, path: string[], value: string) => {
    setData(prev => {
      const next = {
        ...prev,
        [slideKey]: setNestedValue(prev[slideKey], path, value),
      }
      // Save synchronously inside the updater so it's never lost
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    setData({ ...slidesDefaults })
  }, [])

  return (
    <EditorContext.Provider value={{ editMode, toggleEditMode, data, updateField, resetToDefaults }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used within EditorProvider')
  return ctx
}
