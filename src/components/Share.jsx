import { WEDDING } from '../config.js'
import { Reveal, copyText, koDate } from '../lib.jsx'

export default function Share({ notify }) {
  const { groom, bride } = WEDDING
  const { y, m, day } = koDate()
  const title = `${groom.name} ♡ ${bride.name} 결혼합니다`
  const text = `${y}년 ${m}월 ${day}일, 저희 결혼식에 초대합니다.`

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href })
      } catch {
        /* 사용자가 취소 */
      }
    } else {
      const ok = await copyText(window.location.href)
      notify(ok ? '링크가 복사되었습니다' : '공유를 지원하지 않는 환경입니다')
    }
  }

  const copyLink = async () => {
    const ok = await copyText(window.location.href)
    notify(ok ? '청첩장 링크가 복사되었습니다' : '복사에 실패했습니다')
  }

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <Reveal>
        <p className="eyebrow">Share</p>
        <h2 className="section-title">청첩장 공유하기</h2>
        <div className="share-row">
          <button onClick={nativeShare}>
            <span className="ic">↗</span>
            공유하기
          </button>
          <button onClick={copyLink}>
            <span className="ic">🔗</span>
            링크 복사
          </button>
        </div>
        <p className="form-note">
          카카오톡 공유(썸네일 카드)를 붙이려면 README 의 &ldquo;카카오톡 공유&rdquo; 안내를
          참고하세요.
        </p>
      </Reveal>
    </section>
  )
}
