import { WEDDING } from '../config.js'
import { Reveal, copyText, koDate } from '../lib.jsx'
import { KAKAO_JS_KEY, loadKakaoShareSdk } from '../kakao.js'

export default function Share({ notify }) {
  const { groom, bride, site } = WEDDING
  const { y, m, day, dow, time } = koDate()
  const title = `${groom.name} ♡ ${bride.name} 결혼합니다`
  const desc = `${y}년 ${m}월 ${day}일 ${dow}요일 ${time} · ${WEDDING.venue.name}`
  const link = site.url

  const kakaoShare = async () => {
    try {
      const Kakao = await loadKakaoShareSdk()
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: desc,
          imageUrl: site.ogImage,
          link: { mobileWebUrl: link, webUrl: link },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: { mobileWebUrl: link, webUrl: link },
          },
        ],
      })
    } catch {
      // SDK/키 문제 시 링크 복사로 폴백
      const ok = await copyText(link)
      notify(ok ? '링크가 복사되었습니다' : '카카오톡 공유를 사용할 수 없습니다')
    }
  }

  const copyLink = async () => {
    const ok = await copyText(link)
    notify(ok ? '청첩장 링크가 복사되었습니다' : '복사에 실패했습니다')
  }

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <Reveal>
        <p className="eyebrow">Share</p>
        <h2 className="section-title">청첩장 공유하기</h2>

        {KAKAO_JS_KEY && (
          <button className="kakao-btn" onClick={kakaoShare}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.94 5.33 4.86 6.73-.21.75-.77 2.73-.88 3.15-.14.53.19.52.4.38.17-.11 2.62-1.78 3.68-2.5.63.09 1.28.14 1.94.14 5.52 0 10-3.58 10-8S17.52 3 12 3z" />
            </svg>
            카카오톡으로 공유하기
          </button>
        )}

        <button className="link-btn" onClick={copyLink}>
          <span className="ic">🔗</span>
          링크 복사
        </button>
      </Reveal>
    </section>
  )
}
