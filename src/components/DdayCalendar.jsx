import { WEDDING } from '../config.js'
import { Reveal, koDate, useCountdown, weddingDate } from '../lib.jsx'

function MonthGrid() {
  const y = weddingDate.getFullYear()
  const m = weddingDate.getMonth()
  const target = weddingDate.getDate()
  const first = new Date(y, m, 1).getDay()
  const days = new Date(y, m + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < first; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)

  return (
    <div className="calendar">
      <div className="cal-grid">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
          <div key={d} className={`dow${i === 0 ? ' sun' : ''}`}>
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          const isSun = i % 7 === 0
          const isMark = d === target
          return (
            <div
              key={i}
              className={`cal-cell${isSun ? ' sun' : ''}${isMark ? ' mark' : ''}`}
            >
              {d || ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function DdayCalendar() {
  const { y, m, day, dow, time } = koDate()
  const { days, hours, mins, secs, done } = useCountdown()
  const { groom, bride } = WEDDING

  const boxes = [
    { num: days, lab: 'Days' },
    { num: hours, lab: 'Hours' },
    { num: mins, lab: 'Min' },
    { num: secs, lab: 'Sec' },
  ]

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <Reveal>
        <p className="eyebrow">Save the Date</p>
        <div className="date-big">
          <div className="d">
            {String(m).padStart(2, '0')}.{String(day).padStart(2, '0')}
          </div>
          <div className="sub">
            {y}년 {m}월 {day}일 {dow}요일 · {time}
          </div>
        </div>

        <MonthGrid />

        <div className="countdown">
          {boxes.map((b) => (
            <div className="cd-box" key={b.lab}>
              <div className="num">{String(b.num).padStart(2, '0')}</div>
              <div className="lab">{b.lab}</div>
            </div>
          ))}
        </div>

        <p className="cd-line">
          {done ? (
            <>
              오늘은 <b>{groom.name}</b> · <b>{bride.name}</b> 의 결혼식 날입니다 💐
            </>
          ) : (
            <>
              {groom.name} · {bride.name} 의 결혼식이 <b>{days}일</b> 남았습니다.
            </>
          )}
        </p>
      </Reveal>
    </section>
  )
}
