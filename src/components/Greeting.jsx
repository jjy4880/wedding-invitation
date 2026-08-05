import { WEDDING } from '../config.js'
import { Reveal, Sprig } from '../lib.jsx'

// 고인이신 혼주는 성함 앞에 '故' 를 붙여 예를 표합니다.
function parentName(name, deceased) {
  return deceased ? `故 ${name}` : name
}

export default function Greeting() {
  const { groom, bride, greeting } = WEDDING
  return (
    <section className="section">
      <Reveal>
        <Sprig />
        <p className="eyebrow" style={{ marginTop: 20 }}>
          Invitation
        </p>
        <p className="prose">{greeting}</p>

        <div className="parents">
          <div className="row">
            <span>
              {parentName(groom.father, groom.fatherDeceased)} ·{' '}
              {parentName(groom.mother, groom.motherDeceased)}
            </span>
            <span className="rel">의 {groom.order}</span>
            <span className="child">{groom.name}</span>
          </div>
          <div className="row">
            <span>
              {parentName(bride.father, bride.fatherDeceased)} ·{' '}
              {parentName(bride.mother, bride.motherDeceased)}
            </span>
            <span className="rel">의 {bride.order}</span>
            <span className="child">{bride.name}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
