import { useEffect, useState } from 'react'
import { WEDDING } from '../config.js'
import { Reveal } from '../lib.jsx'

export default function Gallery() {
  const { images, count } = WEDDING.gallery
  const hasImages = images.length > 0
  const items = hasImages ? images : Array.from({ length: count }, (_, i) => i + 1)
  const [open, setOpen] = useState(null) // index or null

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % items.length)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + items.length) % items.length)
    }
    // 뷰어 열려 있는 동안 확대(핀치줌/더블탭) 방지
    const preventZoom = (e) => e.preventDefault()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    document.addEventListener('gesturestart', preventZoom) // Safari 핀치
    document.addEventListener('gesturechange', preventZoom)
    document.addEventListener('dblclick', preventZoom)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('gesturestart', preventZoom)
      document.removeEventListener('gesturechange', preventZoom)
      document.removeEventListener('dblclick', preventZoom)
    }
  }, [open, items.length])

  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Gallery</p>
        <h2 className="section-title">우리의 순간들</h2>
        <div className="gallery-grid">
          {items.map((it, i) => (
            <button
              key={i}
              className="g-tile"
              onClick={() => setOpen(i)}
              aria-label={`사진 ${i + 1} 크게 보기`}
            >
              {hasImages ? (
                <img src={it} alt={`웨딩 사진 ${i + 1}`} loading="lazy" />
              ) : (
                <span className="idx">{i + 1}</span>
              )}
            </button>
          ))}
        </div>
      </Reveal>

      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="lb-close" aria-label="닫기" onClick={() => setOpen(null)}>
            &times;
          </button>
          <button
            className="lb-btn prev"
            aria-label="이전"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((o) => (o - 1 + items.length) % items.length)
            }}
          >
            &#8249;
          </button>
          {hasImages ? (
            <img
              src={items[open]}
              alt={`웨딩 사진 ${open + 1}`}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="lb-placeholder" onClick={(e) => e.stopPropagation()}>
              {open + 1}
            </div>
          )}
          <button
            className="lb-btn next"
            aria-label="다음"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((o) => (o + 1) % items.length)
            }}
          >
            &#8250;
          </button>
          <div className="lb-count">
            {open + 1} / {items.length}
          </div>
        </div>
      )}
    </section>
  )
}
