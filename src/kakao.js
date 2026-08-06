// 카카오 JavaScript SDK (공유용). 지도 SDK(dapi)와는 다른 SDK 입니다.
//  - 지도: window.kakao.maps   (KakaoMap.jsx 에서 로드)
//  - 공유: window.Kakao.Share  (이 파일)
// 앱키는 지도와 동일한 JavaScript 키를 재사용합니다.
export const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_MAP_KEY || ''

const SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js'

export function loadKakaoShareSdk() {
  return new Promise((resolve, reject) => {
    if (!KAKAO_JS_KEY) return reject(new Error('no key'))
    const init = () => {
      try {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JS_KEY)
        }
        resolve(window.Kakao)
      } catch (e) {
        reject(e)
      }
    }
    if (window.Kakao && window.Kakao.Share) return init()

    let s = document.getElementById('kakao-js-sdk')
    if (s) {
      s.addEventListener('load', init)
      s.addEventListener('error', reject)
      return
    }
    s = document.createElement('script')
    s.id = 'kakao-js-sdk'
    s.src = SDK_SRC
    s.async = true
    s.onload = init
    s.onerror = reject
    document.head.appendChild(s)
  })
}
