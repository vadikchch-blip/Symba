'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import * as slidesDefaults from '@/src/data/slides'

type SlidesData = typeof slidesDefaults

interface EditorContextValue {
  editMode: boolean
  toggleEditMode: () => void
  data: SlidesData
  updateField: (slideKey: keyof SlidesData, path: string[], value: string) => void
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

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  const [data, setData] = useState<SlidesData>({ ...slidesDefaults })

  const toggleEditMode = useCallback(() => setEditMode(m => !m), [])

  const updateField = useCallback((slideKey: keyof SlidesData, path: string[], value: string) => {
    setData(prev => ({
      ...prev,
      [slideKey]: setNestedValue(prev[slideKey], path, value),
    }))
  }, [])

  return (
    <EditorContext.Provider value={{ editMode, toggleEditMode, data, updateField }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used within EditorProvider')
  return ctx
}
