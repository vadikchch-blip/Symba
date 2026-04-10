'use client'

import { useEditor } from '@/src/context/EditorContext'
import { Editable } from '@/src/components/Editable'
import { assetPath } from '@/lib/basePath'
import styles from './Slide06SystemNotProducts.module.css'

export function Slide06SystemNotProducts() {
  const { data } = useEditor()
  const slide = data.slide06

  return (
    <div className={styles.slide}>
      {/* LEFT — "Before" zone: lighter, more air */}
      <div className={styles.left}>
        <Editable slideKey="slide06" path={['eyebrow']} tag="span" className={styles.eyebrow} />
        <Editable slideKey="slide06" path={['title']} tag="h1" className={styles.title} />

        {/* L-frame wrapping the before/after labels */}
        <div className={styles.lFrame}>
          <div className={styles.phase}>
            <span className={styles.phaseLabel}>{slide.before.label}</span>
            <span className={styles.phaseDesc}>{slide.before.desc}</span>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.phase}>
            <span className={styles.phaseLabel}>{slide.after.label}</span>
            <span className={styles.phaseDesc}>{slide.after.desc}</span>
          </div>
        </div>

        <Editable slideKey="slide06" path={['lead']} tag="p" className={styles.lead} />

        <div className={styles.steps}>
          {slide.items.map((item, i) => (
            <div key={item.n} className={styles.step}>
              <span className={styles.stepNum}>{item.n}</span>
              <Editable slideKey="slide06" path={['items', String(i), 'label']} tag="span" className={styles.stepLabel} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — "After" zone: photo, dense, real */}
      <div className={styles.right}>
        <img src={assetPath(slide.image)} alt="" className={styles.photo} />
      </div>
    </div>
  )
}
