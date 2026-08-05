import { useState } from 'react'
import { WEDDING } from '../config.js'
import { Reveal, copyText } from '../lib.jsx'

function Group({ title, list, notify }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="acc-group">
      <button
        className="acc-head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <span className="chev">⌄</span>
      </button>
      <div className={`acc-body${open ? ' open' : ''}`}>
        <div>
          {list.map((a, i) => (
            <div className="acc-row" key={i}>
              <div>
                <div className="who">
                  {a.relation} · {a.bank}
                </div>
                <div className="num">
                  {a.number} {a.name}
                </div>
              </div>
              <button
                className="copy-btn"
                onClick={async () => {
                  const ok = await copyText(a.number.replace(/\s/g, ''))
                  notify(ok ? '계좌번호가 복사되었습니다' : '복사에 실패했습니다')
                }}
              >
                복사
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Accounts({ notify }) {
  const { accounts } = WEDDING
  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Gift</p>
        <h2 className="section-title">마음 전하실 곳</h2>
        <p className="prose" style={{ fontSize: 14, marginBottom: 32 }}>
          참석이 어려우신 분들을 위해{'\n'}계좌번호를 안내드립니다.{'\n'}따뜻한 마음
          감사드립니다.
        </p>
        <div className="accounts">
          <Group title="신랑측 마음 전하실 곳" list={accounts.groom} notify={notify} />
          <Group title="신부측 마음 전하실 곳" list={accounts.bride} notify={notify} />
        </div>
      </Reveal>
    </section>
  )
}
