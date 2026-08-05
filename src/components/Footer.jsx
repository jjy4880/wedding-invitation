import { WEDDING } from '../config.js'
import { Reveal, Sprig, koDate } from '../lib.jsx'

export default function Footer() {
  const { groom, bride } = WEDDING
  const { y, m, day } = koDate()
  return (
    <footer className="footer">
      <Reveal>
        <Sprig size={48} />
        <div className="couple" style={{ marginTop: 20 }}>
          {groom.name} &amp; {bride.name}
        </div>
        <p className="thanks">
          저희의 시작을 함께해 주셔서 감사합니다.
          <br />
          {y}. {String(m).padStart(2, '0')}. {String(day).padStart(2, '0')}
        </p>
        <p className="credit">Made with love</p>
      </Reveal>
    </footer>
  )
}
