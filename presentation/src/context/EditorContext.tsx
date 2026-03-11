'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import * as slidesDefaults from '@/src/data/slides'

type SlidesData = typeof slidesDefaults

const STORAGE_KEY = 'symba-slides-data-v2'

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

function getDefaults(): SlidesData {
  // Deep clone via JSON so we never mutate the module namespace object
  return JSON.parse(JSON.stringify(slidesDefaults))
}

function loadSavedData(): SlidesData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      const defaults = getDefaults()
      const merged: any = { ...defaults }
      for (const key of Object.keys(parsed)) {
        if (key in defaults) {
          // Use saved value directly — shallow merge loses nested objects
          merged[key] = parsed[key]
        }
      }
      return merged as SlidesData
    }
  } catch {}
  return getDefaults()
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  // Start with defaults (SSR-safe). Load from localStorage after mount.
  const [data, setData] = useState<SlidesData>(getDefaults)

  // dataRef always holds the latest data — used in updateField to avoid
  // putting localStorage side-effects inside React state updaters
  const dataRef = useRef<SlidesData>(data)

  // Load saved data after client mount — avoids SSR/hydration mismatch
  useEffect(() => {
    const loaded = loadSavedData()
    dataRef.current = loaded
    setData(loaded)
  }, [])

  const toggleEditMode = useCallback(() => setEditMode(m => !m), [])

  const updateField = useCallback((slideKey: keyof SlidesData, path: string[], value: string) => {
    // Compute next state from the ref (always current), save, then schedule re-render
    const next: SlidesData = {
      ...dataRef.current,
      [slideKey]: setNestedValue(dataRef.current[slideKey], path, value),
    }
    dataRef.current = next
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
    setData(next)
  }, [])

  const resetToDefaults = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    const defaults = getDefaults()
    dataRef.current = defaults
    setData(defaults)
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
