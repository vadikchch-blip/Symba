'use client'

import React, { useRef, useEffect, ElementType } from 'react'
import { useEditor, getNestedValue } from '@/src/context/EditorContext'

interface EditableProps {
  slideKey: string
  path: string[]
  tag?: ElementType
  className?: string
  style?: React.CSSProperties
}

const EDIT_STYLE: React.CSSProperties = {
  outline: '1.5px dashed rgba(163, 58, 43, 0.45)',
  outlineOffset: '3px',
  cursor: 'text',
  minWidth: '0.5em',
  minHeight: '1em',
  borderRadius: '2px',
  transition: 'outline-color 0.15s',
}

export function Editable({ slideKey, path, tag = 'span', className, style }: EditableProps) {
  const { editMode, data, updateField } = useEditor()
  const ref = useRef<HTMLElement>(null)
  const value = getNestedValue((data as any)[slideKey], path)
  // Track whether the user is actively typing so we skip textContent updates
  const isTypingRef = useRef(false)

  // Set DOM text when entering edit mode (so we show the latest saved value)
  // Only runs when editMode changes — avoids React reconciling away user input
  useEffect(() => {
    if (editMode && ref.current) {
      ref.current.textContent = value
    }
    isTypingRef.current = false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode])

  const Tag = tag as any

  if (!editMode) {
    return <Tag className={className} style={style}>{value}</Tag>
  }

  const save = (el: HTMLElement) => {
    isTypingRef.current = true
    updateField(slideKey as any, path, el.textContent ?? '')
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, ...EDIT_STYLE }}
      contentEditable
      suppressContentEditableWarning
      // Save on every keystroke so exiting edit mode never loses changes
      onInput={(e: React.FormEvent<HTMLElement>) => save(e.currentTarget)}
      onBlur={(e: React.FocusEvent<HTMLElement>) => save(e.currentTarget)}
      onKeyDown={(e: React.KeyboardEvent) => { e.stopPropagation() }}
    />
  )
}
