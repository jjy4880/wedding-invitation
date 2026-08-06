import { WEDDING } from '../config.js'
import { Reveal, copyText } from '../lib.jsx'
import KakaoMap from './KakaoMap.jsx'

// 교통수단 아이콘
function TransportIcon({ type }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  if (type === 'subway') {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="14" rx="3" />
        <path d="M5 11h14" />
        <circle cx="8.5" cy="14" r="0.6" fill="currentColor" />
        <circle cx="15.5" cy="14" r="0.6" fill="currentColor" />
        <path d="M8 17l-2 4M16 17l2 4" />
      </svg>
    )
  }
  if (type === 'bus') {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <path d="M4 10h16" />
        <circle cx="8" cy="19" r="1.3" />
        <circle cx="16" cy="19" r="1.3" />
        <path d="M6.5 16v2M17.5 16v2" />
      </svg>
    )
  }
  // car
  return (
    <svg {...common}>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <circle cx="7.5" cy="17.5" r="1.3" />
      <circle cx="16.5" cy="17.5" r="1.3" />
    </svg>
  )
}

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

        {/* 교통안내 — 대중교통(지하철·버스) 우선 */}
        <h3 className="subhead">교통안내</h3>
        <div className="transport">
          {venue.transport.map((t) => (
            <div className="item" key={t.label}>
              <div className="k">
                <span className="t-ic">
                  <TransportIcon type={t.type} />
                </span>
                {t.label}
              </div>
              <div className="v">
                {t.desc}
                {t.note && <span className="v-note">{t.note}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* 안내사항 (주차·화환) */}
        {venue.notices?.length > 0 && (
          <>
            <h3 className="subhead">안내사항</h3>
            <div className="notices">
              {venue.notices.map((n) => (
                <div className="notice" key={n.title}>
                  <div className="n-title">{n.title}</div>
                  <div className="n-desc">{n.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </Reveal>
    </section>
  )
}
