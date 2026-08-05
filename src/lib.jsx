import { useEffect, useRef, useState } from 'react'
import { WEDDING } from './config.js'

export const weddingDate = new Date(WEDDING.dateTime)

/* 날짜 헬퍼 ------------------------------------------------------ */
const DOW_KO = ['일', '월', '화', '수', '목', '금', '토']
const DOW_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export function koDate(d = weddingDate) {
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  const dow = DOW_KO[d.getDay()]
  const h = d.getHours()
  const ampm = h < 12 ? '오전' : '오후'
  const h12 = h % 12 || 12
  const min = d.getMinutes()
  const time = `${ampm} ${h12}시${min ? ` ${min}분` : ''}`
  return { y, m, day, dow, time, dowEn: DOW_EN[d.getDay()] }
}

/* 스크롤 등장 래퍼 ---------------------------------------------- */
export function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* 디데이 카운트다운 --------------------------------------------- */
export function useCountdown(target = weddingDate) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, dday: 0, done: true }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      mins: Math.floor((diff / 60000) % 60),
      secs: Math.floor((diff / 1000) % 60),
      dday: Math.ceil(diff / 86400000),
      done: false,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return t
}

/* 유칼립투스 라인 모티프 ---------------------------------------- */
export function Sprig({ size = 40 }) {
  return (
    <svg
      className="sprig"
      width={size}
      height={size * 0.5}
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M10 30 H110" strokeLinecap="round" />
      {[24, 42, 60, 78, 96].map((x, i) => (
        <g key={x}>
          <ellipse
            cx={x}
            cy={30 - 11}
            rx="8"
            ry="4.5"
            transform={`rotate(-32 ${x} ${30 - 11})`}
          />
          <ellipse
            cx={x + 9}
            cy={30 + 11}
            rx="8"
            ry="4.5"
            transform={`rotate(32 ${x + 9} ${30 + 11})`}
          />
        </g>
      ))}
      <circle cx="60" cy="30" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* 토스트 훅 ------------------------------------------------------ */
export function useToast() {
  const [msg, setMsg] = useState('')
  const timer = useRef(null)
  const show = (m) => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 2000)
  }
  const node = <div className={`toast ${msg ? 'show' : ''}`}>{msg}</div>
  return [show, node]
}

/* 클립보드 복사 ------------------------------------------------- */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    document.body.removeChild(ta)
    return ok
  }
}
