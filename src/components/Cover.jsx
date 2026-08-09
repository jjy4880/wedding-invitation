import { useEffect, useState } from 'react'
import { WEDDING } from '../config.js'
import { koDate } from '../lib.jsx'

export default function Cover() {
  const { groom, bride, gallery } = WEDDING
  const { y, m, day, dow, time } = koDate()

  // 커버 슬라이드: config.cover.images 우선, 없으면 갤러리 앞 5장
  const slides = (
    WEDDING.cover?.images?.length ? WEDDING.cover.images : gallery.images.slice(0, 5)
  ).filter(Boolean)
  const interval = WEDDING.cover?.interval || 3000

  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // 모션 최소화 설정 시 자동 전환 없이 첫 장만 표시
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [slides.length, interval])

  return (
    <header className="cover">
      <div className="cover-top">
        <div className="cover-label">The Wedding</div>
        <div className="cover-names">
          {groom.en} &middot; {bride.en}
        </div>
      </div>

      <div className={`cover-photo${slides.length ? '' : ' empty'}`}>
        {slides.length ? (
          <>
            {slides.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${groom.name} & ${bride.name}`}
                className={`cover-slide${i === idx ? ' active' : ''}`}
                loading="eager"
                aria-hidden={i === idx ? undefined : true}
              />
            ))}
            {slides.length > 1 && (
              <div className="cover-dots" aria-hidden="true">
                {slides.map((_, i) => (
                  <span key={i} className={i === idx ? 'on' : ''} />
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="cover-photo-hint">
            대표 사진을 넣어주세요
            <br />
            (config.js → cover.images)
          </span>
        )}
      </div>

      <div>
        <div className="cover-couple">
          {groom.name}
          <span className="amp">&amp;</span>
          {bride.name}
        </div>
        <div className="cover-date">
          {y}. {String(m).padStart(2, '0')}. {String(day).padStart(2, '0')}. {dow} · {time}
        </div>
        <div className="scroll-cue">
          <span />
          Scroll
        </div>
      </div>
    </header>
  )
}
