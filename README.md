# 모바일 청첩장 (React + Vite)

미니멀 & 감성 테마의 모바일 청첩장. 유칼립투스 세이지 팔레트, 라이트/다크(저녁) 테마 자동 대응.

## 포함된 섹션 / 기능

- **커버** — 대표 사진, 신랑·신부 이름, 예식 일시
- **인사말** — 감성 세리프 인사말 + 혼주 소개
- **Save the Date** — 예식일 캘린더 + 실시간 D-day 카운트다운
- **갤러리** — 사진 그리드 + 라이트박스(좌우 넘김 · 키보드 지원)
- **오시는 길** — 지도 영역 + 교통 안내 + 주소 복사 + 지도앱 바로가기
- **마음 전하실 곳** — 신랑측/신부측 계좌 아코디언 + 원터치 복사
- **방명록** — 축하 메시지 작성/삭제
- **공유하기** — 링크 복사 / 시스템 공유 시트

## 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 배포용 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 내 청첩장으로 바꾸기

기본적으로 **`src/config.js` 파일 하나만** 수정하면 됩니다.

- `dateTime` — 예식 일시(ISO). **캘린더·D-day·날짜 표기가 여기서 자동 계산**됩니다.
- `groom` / `bride` — 이름, 혼주, 연락처
- `greeting` — 인사말 (`\n` 으로 줄바꿈)
- `venue` — 예식장 이름/주소/교통, 지도앱 링크
- `gallery.images` — 사진 경로 배열 (아래 참고)
- `accounts` — 신랑측/신부측 계좌

### 사진 넣기

1. 사진을 `public/gallery/` 폴더에 넣습니다. (예: `public/gallery/1.jpg`)
2. `src/config.js` 의 `gallery.images` 에 경로를 적습니다.
   ```js
   gallery: {
     count: 9,
     images: ['./gallery/1.jpg', './gallery/2.jpg', './gallery/3.jpg'],
   }
   ```
3. `images[0]` 이 커버 대표 사진으로 쓰입니다.

### 지도 (카카오맵)

`src/components/KakaoMap.jsx` 가 Kakao Maps SDK로 지도를 렌더링합니다.

1. [카카오 개발자센터](https://developers.kakao.com) → 앱 → **앱 키 → JavaScript 키** 발급
2. **플랫폼 → Web → 사이트 도메인**에 배포 주소 등록
   (예: `https://jjy4880.github.io`, 로컬 테스트 시 `http://localhost:5173` 도)
3. `src/config.js` 의 `venue.kakaoAppKey` 에 JavaScript 키를 넣습니다.

> 키가 비어 있으면 임시로 **구글 지도**가 표시됩니다.

## 🚀 GitHub Pages 배포

### 방법 1) GitHub Actions (권장 · 푸시하면 자동 배포)

이 저장소에는 이미 `.github/workflows/deploy.yml` 이 포함되어 있습니다.

1. GitHub에 새 저장소를 만들고 코드를 푸시합니다.
   ```bash
   git init
   git add .
   git commit -m "feat: 모바일 청첩장"
   git branch -M main
   git remote add origin https://github.com/<사용자명>/<저장소명>.git
   git push -u origin main
   ```
2. GitHub 저장소 → **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정합니다.
3. 이후 `main` 브랜치에 푸시할 때마다 자동 빌드·배포됩니다.
   주소: `https://<사용자명>.github.io/<저장소명>/`

> `vite.config.js` 의 `base: './'` 덕분에 저장소 이름과 상관없이 경로가 깨지지 않습니다.

### 방법 2) gh-pages 패키지 (수동 배포)

```bash
npm install -D gh-pages
```

`package.json` 의 scripts 에 추가:

```json
"deploy": "vite build && gh-pages -d dist"
```

```bash
npm run deploy
```

Settings → Pages → Source 를 **gh-pages 브랜치**로 지정합니다.

## 방명록 실제 취합 (선택)

기본 제공되는 방명록은 **데모용으로 브라우저(localStorage)에만 저장**됩니다.
하객 메시지를 실제로 모으려면 무료 백엔드를 연결하세요. 추천 순서:

- **Google Forms/Sheets** — 가장 간단. 응답을 시트로 수집.
- **Supabase / Firebase Firestore** — 무료 티어로 실시간 DB 연동.
- 연동 위치: `src/components/Guestbook.jsx` 의 저장 로직(`localStorage`)을 `fetch(...)` 호출로 교체.

## 공유 미리보기(OG·카카오톡 카드) 테스트

> ⚠️ **localhost 에서는 확인 불가.** 카카오/페이스북 크롤러 봇이 내 PC에 접근할 수 없습니다.
> 반드시 **공개 URL**(GitHub Pages 등)에 배포한 뒤 테스트하세요.

**0. 배포 후 절대 URL 채우기** — `index.html` 의 `og:url` / `og:image` / `twitter:image` 의
`https://jjy4880.github.io/wedding-invitation/` 를 실제 배포 주소로 교체합니다.
(카카오·페북은 상대경로를 무시하고 **절대 URL**만 읽습니다.)

**1. 범용 미리보기 확인** — 배포 URL을 아래에 붙여넣으면 카드가 즉시 보입니다.
- https://www.opengraph.xyz/
- https://metatags.io/

**2. 카카오톡 카드 확인**
- 카카오는 OG 정보를 **캐시**합니다. 수정 후에는 [카카오 OG 캐시 초기화 도구](https://developers.kakao.com/tool/clear/og)
  에 URL을 넣어 캐시를 지운 뒤 테스트하세요.
- 실제 확인: 카카오톡 **"나와의 채팅"** 에 배포 링크를 붙여넣으면 카드가 그대로 렌더됩니다.

**3. 페이스북/기타** — [Facebook 공유 디버거](https://developers.facebook.com/tools/debug/)
에서 URL을 넣고 *Scrape Again* 으로 캐시를 갱신할 수 있습니다.

**OG 이미지 교체** — 공유 카드 썸네일은 `public/og-image.jpg` (1200×630) 입니다.
다른 사진으로 바꾸려면 같은 크기로 교체하세요.

> 참고: 이 프로젝트의 OG 태그는 `index.html` 에 **정적으로** 들어 있어, JS를 실행하지 않는
> 크롤러(카카오 등)도 그대로 읽을 수 있습니다. (SPA에서 흔한 "카드 안 뜸" 문제 없음)

## 카카오톡 공유 (선택)

카카오톡에 썸네일 카드로 공유하려면 [Kakao JavaScript SDK](https://developers.kakao.com/docs/latest/ko/kakaotalk-share/js) 가 필요합니다.
JavaScript 키를 발급받아 `index.html` 에 SDK `<script>` 를 추가하고, `src/components/Share.jsx` 에서 `Kakao.Share.sendDefault(...)` 를 호출하도록 연결하세요.
(공유 미리보기 문구/이미지는 `index.html` 의 Open Graph 메타 태그에서도 관리됩니다.)

## 기술 스택

React 18 · Vite 5 · 순수 CSS (외부 UI 라이브러리 없음)
