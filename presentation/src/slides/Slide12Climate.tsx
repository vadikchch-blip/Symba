'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './Slide12Climate.module.css'

export function Slide12Climate() {
  const { editMode, data, updateField } = useEditor()
  const slide = data.slide12

  return (
    <div className={styles.slide}>
      <img src={assetPath(slide.image)} alt="" className={styles.photo} />
      <div className={styles.gradient} />
      <div className={styles.content}>
        <Editable slideKey="slide12" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        {editMode ? (
          <h1
            className={styles.title}
            contentEditable
            suppressContentEditableWarning
            style={{ whiteSpace: 'pre-wrap', outline: '1.5px dashed rgba(163,58,43,0.45)', outlineOffset: 3, cursor: 'text', borderRadius: 2 }}
            onBlur={e => updateField('slide12', ['title'], e.currentTarget.textContent ?? '')}
            onKeyDown={e => e.stopPropagation()}
          >
            {slide.title}
          </h1>
        ) : (
          <h1 className={styles.title}>
            {slide.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>
        )}
        <Editable slideKey="slide12" path={['titleSuffix']} tag="p" className={styles.suffix} />
        <Editable slideKey="slide12" path={['body']} tag="p" className={styles.body} />
      </div>
    </div>
  )
}
