import { useEffect, useRef, useState } from 'react'
import { WEDDING } from '../config.js'

// Kakao Maps JavaScript SDK 를 1회만 로드
function loadKakaoSdk(appKey) {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) return resolve(window.kakao)
    let s = document.getElementById('kakao-map-sdk')
    const onReady = () => window.kakao.maps.load(() => resolve(window.kakao))
    if (s) {
      s.addEventListener('load', onReady)
      s.addEventListener('error', reject)
      return
    }
    s = document.createElement('script')
    s.id = 'kakao-map-sdk'
    // autoload=false → kakao.maps.load() 로 수동 초기화
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
    s.async = true
    s.onload = onReady
    s.onerror = reject
    document.head.appendChild(s)
  })
}

export default function KakaoMap() {
  const { venue } = WEDDING
  const boxRef = useRef(null)
  const [err, setErr] = useState(false)
  const appKey = venue.kakaoAppKey

  useEffect(() => {
    if (!appKey) return
    let map
    loadKakaoSdk(appKey)
      .then((kakao) => {
        if (!boxRef.current) return
        const center = new kakao.maps.LatLng(venue.lat, venue.lng)
        map = new kakao.maps.Map(boxRef.current, { center, level: 3 })

        // 마커
        new kakao.maps.Marker({ position: center, map })

        // 예식장 이름 라벨 (마커 위 말풍선)
        const label = new kakao.maps.CustomOverlay({
          position: center,
          yAnchor: 2.3,
          content: `<div style="padding:5px 10px;background:#fff;border:1px solid #6e7d6c;border-radius:4px;color:#2e2b27;font-size:12px;font-weight:700;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.15)">${venue.name}</div>`,
        })
        label.setMap(map)

        // 확대/축소 컨트롤
        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT)
        // 마우스 휠 줌은 끄고 버튼으로만 (모바일 스크롤 방해 방지)
        map.setZoomable(false)

        // 리사이즈 대응
        setTimeout(() => {
          map.relayout()
          map.setCenter(center)
        }, 200)
      })
      .catch(() => setErr(true))
  }, [appKey, venue.lat, venue.lng, venue.name])

  // 앱키가 없거나 로드 실패 시 → 구글 지도로 폴백 (지도가 비어 보이지 않도록)
  if (!appKey || err) {
    return (
      <div className="map-frame">
        <iframe
          title={`${venue.name} 지도`}
          src={`https://www.google.com/maps?q=${venue.lat},${venue.lng}&z=17&hl=ko&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        {!appKey && (
          <p className="form-note" style={{ marginTop: 8 }}>
            카카오맵으로 표시하려면 config.js 의 <code>venue.kakaoAppKey</code> 에 카카오 JavaScript
            키를 넣어주세요. (임시로 구글 지도 표시 중)
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="map-frame">
      <div ref={boxRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
