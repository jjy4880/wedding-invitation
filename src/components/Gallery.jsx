import { useEffect, useRef, useState } from 'react'
import { WEDDING } from '../config.js'
import { Reveal } from '../lib.jsx'

export default function Gallery() {
  const { images, count } = WEDDING.gallery
  const hasImages = images.length > 0
  const items = hasImages ? images : Array.from({ length: count }, (_, i) => i + 1)
  const n = items.length

  const [open, setOpen] = useState(null) // index or null
  const touchX = useRef(null)
  const thumbsRef = useRef(null)

  const go = (dir) => setOpen((o) => (o + dir + n) % n)

  // 키보드 / 스크롤잠금 / 확대(핀치·더블탭) 방지
  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    const preventZoom = (e) => e.preventDefault()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    document.addEventListener('gesturestart', preventZoom)
    document.addEventListener('gesturechange', preventZoom)
    document.addEventListener('dblclick', preventZoom)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('gesturestart', preventZoom)
      document.removeEventListener('gesturechange', preventZoom)
      document.removeEventListener('dblclick', preventZoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, n])

  // 활성 썸네일을 가운데로 스크롤
  useEffect(() => {
    if (open === null || !thumbsRef.current) return
    const el = thumbsRef.current.querySelector('.lb-thumb.active')
    el?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [open])

  // 스와이프로 이전/다음
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

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

          <div
            className="lb-stage"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button className="lb-btn prev" aria-label="이전" onClick={() => go(-1)}>
              &#8249;
            </button>
            {hasImages ? (
              <img
                key={open}
                src={items[open]}
                alt={`웨딩 사진 ${open + 1}`}
                className="lb-main"
                draggable={false}
              />
            ) : (
              <div key={open} className="lb-placeholder">
                {open + 1}
              </div>
            )}
            <button className="lb-btn next" aria-label="다음" onClick={() => go(1)}>
              &#8250;
            </button>
          </div>

          <div className="lb-count">
            {open + 1} / {n}
          </div>

          <div className="lb-thumbs" ref={thumbsRef} onClick={(e) => e.stopPropagation()}>
            {items.map((it, i) => (
              <button
                key={i}
                className={`lb-thumb${i === open ? ' active' : ''}`}
                onClick={() => setOpen(i)}
                aria-label={`${i + 1}번 사진`}
              >
                {hasImages ? <img src={it} alt="" draggable={false} /> : <span>{i + 1}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
