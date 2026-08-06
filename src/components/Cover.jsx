import { WEDDING } from '../config.js'
import { koDate } from '../lib.jsx'

export default function Cover() {
  const { groom, bride, gallery } = WEDDING
  const { y, m, day, dow, time } = koDate()
  const cover = gallery.images[0]

  return (
    <header className="cover">
      <div className="cover-top">
        <div className="cover-label">The Wedding</div>
        <div className="cover-names">
          {groom.en} &middot; {bride.en}
        </div>
      </div>

      <div className={`cover-photo${cover ? '' : ' empty'}`}>
        {cover ? (
          <img src={cover} alt={`${groom.name} & ${bride.name}`} />
        ) : (
          <span className="cover-photo-hint">
            대표 사진을 넣어주세요
            <br />
            (config.js → gallery.images[0])
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
