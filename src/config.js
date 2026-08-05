// ─────────────────────────────────────────────────────────────
//  청첩장 정보 — 이 파일만 수정하면 청첩장 전체가 바뀝니다.
//  (정지용 ♡ 권은미 실제 예식 정보 반영본)
// ─────────────────────────────────────────────────────────────
export const WEDDING = {
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
    // 카카오맵 표시용 JavaScript 앱키. 카카오 개발자센터에서 발급 후 넣으세요.
    // (발급: https://developers.kakao.com → 앱 → 앱 키 → JavaScript 키)
    // 비워두면 임시로 구글 지도가 표시됩니다.
    kakaoAppKey: '',
    // 지도앱 바로가기 (하객이 클릭 시 해당 앱/웹으로 이동)
    naverMap: 'https://map.naver.com/p/search/더컨벤션 송파문정',
    kakaoMap:
      'https://map.kakao.com/link/map/더컨벤션 송파문정,37.484005272438594,127.12278911775194',
    tmap: 'https://tmap.life/route/search?goalName=더컨벤션 송파문정&goalX=127.12278911775194&goalY=37.484005272438594',
    // 교통 안내
    transport: [
      { label: '주차', desc: '11층 연회장 안내 데스크에서 주차 확인을 받을 수 있습니다.' },
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
