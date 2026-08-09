// ─────────────────────────────────────────────────────────────
//  청첩장 정보 — 이 파일만 수정하면 청첩장 전체가 바뀝니다.
//  (정지용 ♡ 권은미 실제 예식 정보 반영본)
// ─────────────────────────────────────────────────────────────
export const WEDDING = {
  // 배포 주소 (공유 카드의 링크·썸네일에 사용 — 반드시 절대 URL)
  site: {
    url: 'https://jjy4880.github.io/wedding-invitation/',
    // 링크(URL) 붙여넣기 시 미리보기용 OG 이미지 (사진+텍스트 카드)
    ogImage: 'https://jjy4880.github.io/wedding-invitation/og-image.jpg',
    // 카카오톡 '공유하기' 버튼 전용 이미지 (텍스트 없이 인물 사진만)
    kakaoImage: 'https://jjy4880.github.io/wedding-invitation/share-kakao.jpg',
  },

  // 예식 일시 (ISO 8601, 한국 시간대 +09:00). 캘린더·디데이·날짜 표기가 여기서 자동 계산됩니다.
  dateTime: '2026-09-12T17:30:00+09:00',

  // 신랑
  groom: {
    name: '정지용',
    en: 'Jiyong',
    order: '장남',
    father: '정기석',
    fatherDeceased: true, // 故 (고인) 표시
    mother: '김순옥',
    phone: '', // 필요 시 입력
  },

  // 신부
  bride: {
    name: '권은미',
    en: 'Eunmi',
    order: '장녀',
    father: '권동희',
    mother: '김진선',
    phone: '',
  },

  // 인사말
  greeting: `저희 두 사람이 믿음과 사랑으로 만나\n한 가정을 이루게 되었습니다.\n\n귀한 걸음으로 함께 하시어\n축복해 주시면 감사하겠습니다.`,

  // 예식장
  venue: {
    name: '더컨벤션 송파문정',
    hall: '12F 그랜드볼룸',
    address: '서울 송파구 송파대로 155',
    addressJibun: '서울 송파구 문정동 651-8',
    tel: '02-6418-5000',
    lat: 37.484005272438594,
    lng: 127.12278911775194,
    // 카카오맵 표시용 JavaScript 앱키.
    // 보안상 코드에 직접 넣지 않고 환경변수로 주입합니다.
    //  · 로컬: 프로젝트 루트 .env.local 에  VITE_KAKAO_MAP_KEY=발급받은키
    //  · 배포: GitHub 저장소 Secrets 의 VITE_KAKAO_MAP_KEY (Actions가 주입)
    // 값이 없으면 임시로 구글 지도가 표시됩니다.
    kakaoAppKey: import.meta.env.VITE_KAKAO_MAP_KEY || '',
    // 지도앱 바로가기 (하객이 클릭 시 해당 앱/웹으로 이동)
    naverMap: 'https://map.naver.com/p/search/더컨벤션 송파문정',
    kakaoMap:
      'https://map.kakao.com/link/map/더컨벤션 송파문정,37.484005272438594,127.12278911775194',
    tmap: 'https://tmap.life/route/search?goalName=더컨벤션 송파문정&goalX=127.12278911775194&goalY=37.484005272438594',
    // 교통 안내 — 배열 순서대로 표시됩니다. (대중교통 우선)
    transport: [
      {
        type: 'subway',
        label: '지하철',
        desc: '8호선 문정역 3번 출구에서 도보 5분',
      },
      {
        type: 'bus',
        label: '버스',
        desc: '일반 30 · 31 · 32 · 100 · 119 · 331\n간선 302 · 303 · 320 · 333 · 350 · 360 · 343 · 345\n지선 3322 · 3420',
        note: '그 외 노선은 지도앱에서 확인해 주세요.',
      },
      {
        type: 'car',
        label: '자가용',
        desc: '내비게이션에 "더컨벤션 송파문정" 또는 "송파대로 155" 검색',
      },
    ],
    // 안내사항 (주차·화환 등)
    notices: [
      { title: '주차', desc: '11층 연회장 안내 데스크에서 주차 확인을 받을 수 있습니다.' },
      {
        title: '화환',
        desc: '축하해 주시는 따뜻한 마음만 감사히 받겠습니다. 화환은 정중히 사양합니다.',
      },
    ],
  },

  // 상단 커버 슬라이드쇼 — 3초마다 크로스페이드로 전환됩니다.
  // 순서/사진은 자유롭게 바꾸세요. (첫 장이 대표 이미지)
  cover: {
    interval: 2000, // 전환 간격(ms)
    images: [
      './gallery/1.jpg',
      './gallery/2.jpg',
      './gallery/3.jpg',
      './gallery/4.jpg',
      './gallery/5.jpg',
    ],
  },

  // 갤러리 — images[0] 이 커버 대표 사진으로 쓰입니다.
  // 원본 청첩장의 사진 20장을 public/gallery/ 에 내려받아 자체 호스팅합니다.
  gallery: {
    count: 20,
    images: [
      './gallery/1.jpg',
      './gallery/2.jpg',
      './gallery/3.jpg',
      './gallery/4.jpg',
      './gallery/5.jpg',
      './gallery/6.jpg',
      './gallery/7.jpg',
      './gallery/8.jpg',
      './gallery/9.jpg',
      './gallery/10.jpg',
      './gallery/11.jpg',
      './gallery/12.jpg',
      './gallery/13.jpg',
      './gallery/14.jpg',
      './gallery/15.jpg',
      './gallery/16.jpg',
      './gallery/17.jpg',
      './gallery/18.jpg',
      './gallery/19.jpg',
      './gallery/20.jpg',
    ],
  },

  // 마음 전하실 곳 (계좌)
  accounts: {
    groom: [
      { relation: '신랑', name: '정지용', bank: '신한은행', number: '110-296-912802' },
      { relation: '신랑 어머니', name: '김순옥', bank: '신한은행', number: '110-320-315005' },
    ],
    bride: [
      { relation: '신부', name: '권은미', bank: '신한은행', number: '110-434-188096' },
      { relation: '신부 어머니', name: '김진선', bank: '국민은행', number: '010-240-373967' },
    ],
  },
}
