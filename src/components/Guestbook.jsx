import { useEffect, useState } from 'react'
import { Reveal } from '../lib.jsx'

const KEY = 'wedding_guestbook'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export default function Guestbook({ notify }) {
  const [list, setList] = useState(load)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(list))
  }, [list])

  const add = (e) => {
    e.preventDefault()
    if (!name.trim() || !msg.trim()) return notify('이름과 메시지를 입력해주세요')
    setList([
      { id: Date.now(), name: name.trim(), msg: msg.trim(), at: new Date().toISOString() },
      ...list,
    ])
    setName('')
    setMsg('')
    notify('축하 메시지가 등록되었습니다')
  }

  const remove = (id) => setList((l) => l.filter((x) => x.id !== id))

  const fmt = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
      d.getDate(),
    ).padStart(2, '0')}`
  }

  return (
    <section className="section">
      <Reveal>
        <p className="eyebrow">Guest Book</p>
        <h2 className="section-title">축하 메시지</h2>

        <form onSubmit={add}>
          <div className="field">
            <label htmlFor="gb-name">이름</label>
            <input
              id="gb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
          </div>
          <div className="field">
            <label htmlFor="gb-msg">메시지</label>
            <textarea
              id="gb-msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="따뜻한 축하의 말을 남겨주세요"
            />
          </div>
          <button className="btn-primary" type="submit">
            메시지 남기기
          </button>
        </form>

        <div className="gb-list">
          {list.length === 0 ? (
            <p className="gb-empty">첫 번째 축하 메시지를 남겨주세요 🤍</p>
          ) : (
            list.map((g) => (
              <div className="gb-item" key={g.id}>
                <div className="top">
                  <span className="name">{g.name}</span>
                  <span className="date">
                    {fmt(g.at)}
                    <button className="del" onClick={() => remove(g.id)}>
                      삭제
                    </button>
                  </span>
                </div>
                <div className="msg">{g.msg}</div>
              </div>
            ))
          )}
        </div>
        <p className="form-note">* 데모 버전은 메시지가 이 브라우저에만 저장됩니다.</p>
      </Reveal>
    </section>
  )
}
