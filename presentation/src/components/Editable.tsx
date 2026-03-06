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

  useEffect(() => {
    if (editMode && ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value
    }
  }, [editMode, value])

  const Tag = tag as any

  if (!editMode) {
    return <Tag className={className} style={style}>{value}</Tag>
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, ...EDIT_STYLE }}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        updateField(slideKey as any, path, e.currentTarget.textContent ?? '')
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        e.stopPropagation()
      }}
    >
      {value}
    </Tag>
  )
}
