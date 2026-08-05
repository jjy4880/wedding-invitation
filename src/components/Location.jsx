import { WEDDING } from '../config.js'
import { Reveal, copyText } from '../lib.jsx'
import KakaoMap from './KakaoMap.jsx'

export default function Location({ notify }) {
  const { venue } = WEDDING
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <Reveal>
        <p className="eyebrow">Location</p>
        <h2 className="section-title">오시는 길</h2>

        <div className="venue-name">{venue.name}</div>
        <div className="venue-sub">
          {venue.hall} · {venue.tel}
        </div>

        {/* 카카오맵(SDK) 렌더링. config.js 의 venue.kakaoAppKey 필요.
            키가 없으면 컴포넌트 내부에서 구글 지도로 자동 폴백됩니다. */}
        <KakaoMap />

        <button
          className="copy-btn"
          style={{ display: 'block', margin: '0 auto 20px' }}
          onClick={async () => {
            const ok = await copyText(venue.address)
            notify(ok ? '주소가 복사되었습니다' : '복사에 실패했습니다')
          }}
        >
          📋 {venue.address} 복사
        </button>

        <div className="map-buttons">
          <a href={venue.naverMap} target="_blank" rel="noreferrer">
            네이버 지도
          </a>
          <a href={venue.kakaoMap} target="_blank" rel="noreferrer">
            카카오맵
          </a>
          <a href={venue.tmap} target="_blank" rel="noreferrer">
            티맵
          </a>
        </div>

        <div className="transport">
          {venue.transport.map((t) => (
            <div className="item" key={t.label}>
              <div className="k">{t.label}</div>
              <div className="v">{t.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
