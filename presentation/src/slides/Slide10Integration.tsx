'use client'

import { useState } from 'react'
import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './Slide10Integration.module.css'

export function Slide10Integration() {
  const { editMode, data, updateField } = useEditor()
  const slide = data.slide10img
  const [src, setSrc] = useState(assetPath(slide.image))

  return (
    <div className={styles.slide}>
      <img
        src={src}
        alt=""
        className={styles.photo}
        onError={() => setSrc(assetPath(slide.imageFallback))}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <Editable slideKey="slide10img" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide10img" path={['title']} tag="h1" className={styles.title} />
        {editMode ? (
          <p
            className={styles.body}
            contentEditable
            suppressContentEditableWarning
            style={{ whiteSpace: 'pre-wrap', outline: '1.5px dashed rgba(163,58,43,0.45)', outlineOffset: 3, cursor: 'text', borderRadius: 2 }}
            onBlur={e => updateField('slide10img', ['body'], e.currentTarget.textContent ?? '')}
            onKeyDown={e => e.stopPropagation()}
          >
            {slide.body}
          </p>
        ) : (
          <p className={styles.body}>
            {slide.body.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  )
}
