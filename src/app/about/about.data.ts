export const companyProfile = {
  name: '㈜ 와우쓰리디(WOW3D)',
  ceo: '김순희',
  founded: '2020.06.02',
  foundedNote: '2016.07 개인사업자 설립',
  businessNumber: '849-88-01659',
  businessType: '홀로그램, 사물인터넷, 3D프린터 제조 및 도소매',
  mainBusiness:
    '3D 프린터·3D 홀로그래피 디스플레이 개발 및 서비스, 교육서비스, 디자인, 소프트웨어 개발',
  employees: {
    gumi: 5,
    seoul: 5,
    advisors: 3,
  },
  vision:
    '3D프린팅을 넘어 글로벌 융합 기술의 중심으로, 스마트 제조·서비스와 글로벌 시장 진출을 통해 4차 산업혁명을 선도하는 기업',
};

export const businessAreas = [
  {
    title: '개발',
    items: [
      '3D Hologram Display(3D홀로그램 디스플레이)',
      '적층 가공제조 장비 개발(MSLA 방식)',
      '제품 및 디자인 개발 전문',
      'AI 데이터 가공 및 Software Solution 개발',
    ],
  },
  {
    title: 'FAB/LAB',
    items: [
      'Maker Space 제품 제작실',
      '기업 시제품(PR/Mock-Up) 제작 지원',
    ],
  },
  {
    title: '교육',
    items: [
      '4차산업 전문 교육기관 (3D프린팅, 아두이노, 코딩)',
      '국가·국제 자격증 인증교육기관',
      '노동부(HRD)·교육청(평생교육원) 지정',
      '창업 및 재취업 교육 (4차산업 구조변화대응, 소상공인 희망리턴패키지)',
    ],
  },
];

export const growthMilestones = [
  {
    year: '2016',
    title: '3D프린팅 교육 및 인프라 확보',
    description: '개인사업자로 출발, 3D프린팅 교육과 장비 개발 기반을 마련했습니다.',
  },
  {
    year: '2020',
    title: '법인 설립 및 기술 개발 본격화',
    description: '㈜와우쓰리디 법인 설립, 멀티비전 3D홀로그램·AI 스마트 LED 등 핵심 R&D 착수.',
  },
  {
    year: '2021',
    title: '기업부설연구소 인증',
    description: '연구개발 역량을 공식 인증받고 산학협력 기반 시제품·장비 개발을 확대했습니다.',
  },
  {
    year: '2022',
    title: '벤처·여성기업 인증 및 홀로그램 특허',
    description: '벤처기업·여성기업 인증, 홀로그램 디스플레이 관련 핵심 특허 등록 및 사업 다각화.',
  },
  {
    year: '2023',
    title: 'ISO 9001·데이터사업자 인증',
    description: '품질경영시스템 ISO 9001 취득, 데이터사업자 신고로 AI·데이터 사업 기반 강화.',
  },
  {
    year: '2024',
    title: '스마트제조·데이터바우처 공급기업',
    description: '중소벤처기업부 스마트서비스·데이터바우처 공급기업 지정, 디자인제조혁신 전문회사 등록.',
  },
  {
    year: '2025–2026',
    title: 'AI 스마트 솔루션·글로벌 확장',
    description:
      '스마트제조·서비스·상점 ERP/MES/LMS 공급, AI 3D프린팅 견적시스템 구축, 베트남·르완다 MOU 등 글로벌 네트워크 확대.',
  },
];

export type IpStatus = 'registered' | 'pending';

export const intellectualProperties: {
  type: string;
  title: string;
  number: string;
  status: IpStatus;
}[] = [
  { type: '특허', title: '홀로그램 디스플레이', number: '10-2643826', status: 'registered' },
  { type: '특허', title: '이동 및 높이조절 리프트 의자', number: '10-2640421', status: 'registered' },
  { type: '특허', title: '원격제어 데이터 전송·관리 홀로그램 디스플레이', number: '10-2727650', status: 'registered' },
  { type: '특허', title: 'NFC 기반 연예인·굿즈 캐릭터 인증시스템', number: '10-2793115', status: 'registered' },
  { type: '특허', title: '복합소재 성형용 3D 프린팅장치', number: '10-2028669', status: 'registered' },
  { type: '특허', title: '온도측정 손소독 디스펜서', number: '10-2430658', status: 'registered' },
  { type: '특허', title: '멀티 홀로그래픽 디스플레이', number: '10-2021-0018842', status: 'pending' },
  { type: '특허', title: '청각장애인 음성인식·상황인지 AI 글라스', number: '10-2023-0144505', status: 'pending' },
  { type: '특허', title: '지게차형 환자·장애인 이송용 오토리프트', number: '10-2022-0142062', status: 'pending' },
  { type: '디자인', title: '스마트화분', number: '30-1298733', status: 'registered' },
  { type: '디자인', title: '의류용 액세서리', number: '30-1089791', status: 'registered' },
  { type: '상표', title: 'WOW3D', number: '40-2018-0146095', status: 'registered' },
];

export const certifications = [
  { name: '벤처기업', date: '2022.04.06', org: '벤처기업확인기관' },
  { name: '여성기업', date: '2022.05.26', org: '지방중소벤처기업청' },
  { name: '직업훈련기관 인증', date: '2023.01.01', org: '고용노동부' },
  { name: '기업부설연구소', date: '2021.04.07', org: '한국산업기술진흥협회' },
  { name: '산업디자인전문회사', date: '2022.02.11', org: '한국디자인진흥원' },
  { name: '메인비즈', date: '2023.04.24', org: '중소벤처기업부' },
  { name: 'ISO 9001 품질경영시스템', date: '2023.05.11', org: 'G-CERTI' },
  { name: '데이터사업자', date: '2023.10.15', org: '과학기술정보통신부' },
  { name: '공장등록증', date: '2022.03.30', org: '한국산업단지공단' },
  { name: '언론기관 부설 평생교육시설', date: '2022.04.25', org: '경상북도구미교육지원청' },
];

export const products = [
  {
    title: '3D 홀로그램 디스플레이',
    description: 'LED 디지털 사이니지·홍보용 홀로그램, 원격제어·데이터 연동 가능',
    link: '/hardware/hologram',
  },
  {
    title: 'MSLA-DLP 3D프린터',
    description: 'P7/P10/P13-Pro 시리즈, 초정밀 적층가공 장비 (특허·조달등록)',
    link: '/hardware/3d-printer',
  },
  {
    title: '스마트 비즈니스 솔루션',
    description: 'ERP·MES·LMS, AI 재고관리·학사관리·CBT·자동견적 시스템',
    link: '/services',
  },
  {
    title: 'AI 데이터 가공 솔루션',
    description: '데이터셋 구축·품질관리, 스마트공장·제조 데이터 가공',
    link: '/gov-support',
  },
  {
    title: '제품디자인 & 시제품',
    description: '디자인주도 제조혁신, IP나래·MakerSpace 기반 토탈 솔루션',
    link: '/contact',
  },
  {
    title: '4차 산업 HRD 교육',
    description: '3D프린팅·코딩·자격증·재창업 교육, 홍대·구미·전주 센터 운영',
    link: '/services/academy/center',
  },
];

export const equipmentHighlights = [
  { category: 'MSLA-DLP 3D프린터', items: ['P13-Pro (3set)', 'P10-Pro (3set)', 'P7-Pro (1set)'] },
  { category: 'FDM 3D프린터', items: ['K1MAX 고속출력 (2set)', 'Climber.Dual 등 다수 (30set+)'] },
  { category: '후가공·제작', items: ['3D스캐너', 'CNC 라우터', '레이저 각인기', '레진탈포·도색장비'] },
];

export type Achievement = {
  year: string;
  name: string;
  field: string;
  org: string;
  project: string;
  period: string;
};

export const developmentAchievements: Achievement[] = [
  { year: '2026', name: '스마트제조·서비스·상점 지원사업', field: 'ERP/MES/LMS', org: '중소벤처기업부', project: '공급업체 등록', period: '2026' },
  { year: '2026', name: 'AI 3D프린팅 실시간 견적시스템', field: '스마트공방', org: '중소벤처기업부', project: '지원사업 구축', period: '2026' },
  { year: '2025', name: '중소기업 스마트서비스 지원사업', field: 'ERP/MES/LMS', org: '중소벤처기업부', project: '공급업체 등록', period: '2025' },
  { year: '2025', name: '데이터바우처 지원사업', field: '데이터공급', org: '한국데이터산업진흥원', project: '데이터 가공·공급기업', period: '2025' },
  { year: '2025', name: '소공인 판로개척지원사업', field: '마케팅·디자인', org: '소상공인시장진흥공단', project: '공급업체 등록', period: '2025' },
  { year: '2024', name: '강소특구 이노폴리스캠퍼스', field: '시제품제작', org: '국립금오공과대학교', project: '플로라봇 시제품', period: '2024.11–12' },
  { year: '2024', name: '경북 AI서비스로봇산업 육성', field: '제품디자인', org: '한국로봇융합연구원', project: 'AI 스마트화분 디자인', period: '2024.09–11' },
  { year: '2024', name: '데이터바우처 지원사업', field: '데이터공급', org: '한국데이터산업진흥원', project: '데이터 가공·공급', period: '2024' },
  { year: '2023', name: '중소기업 R&D 역량제고사업', field: '기술개발', org: '중소벤처기업부', project: '360도 3D홀로그램 영상맵핑·App', period: '2023.05–2024.01' },
  { year: '2023', name: '데이터바우처 지원사업', field: '기술개발', org: '한국데이터산업진흥원', project: '지능형 3D홀로그램 디스플레이', period: '2023.06–11' },
  { year: '2023', name: '중소기업 제품인증 지원', field: '시스템인증', org: '경북테크노파크', project: 'ISO·KC 인증', period: '2023' },
  { year: '2023', name: '디자인주도 제조혁신지원', field: '제품디자인', org: '한국디자인진흥원', project: 'AI스마트허브 목업', period: '2023.08–11' },
  { year: '2022', name: '연구성과 사업화 촉진', field: '완제품제작', org: '구미전자정보기술원', project: '스마트 오토 무빙 체어', period: '2022.06–10' },
  { year: '2022', name: '디자인 주도 제조혁신', field: '제품디자인', org: '한국디자인진흥원', project: '스마트자동적재창고 외형디자인', period: '2022.09–11' },
  { year: '2021', name: '강소특구 특화성장 지원', field: '기술개발', org: '과학기술정보통신부', project: '환자 이송용 높이조절 리프트', period: '2021.06–2022.01' },
  { year: '2020', name: '4차산업혁명 핵심기술', field: '기술개발', org: '구미전자정보기술원', project: '멀티비전 3D홀로그램 Display', period: '2020.09–2022.08' },
  { year: '2020', name: '창업성장기술개발사업', field: '기술개발', org: '중소벤처기업부', project: 'AI 휴먼인지 Smart LED 조명', period: '2020.07–2022.07' },
];

export const centers = [
  {
    name: '서울 홍대센터',
    subtitle: '3D쿠키홍대센터 · 교육·메이커스페이스',
    address: '서울 마포구 독막로 93 상수빌딩 4층',
    tel: '02-3144-3137',
    url: 'http://3dcookiehd.co.kr',
  },
  {
    name: '경북 구미센터',
    subtitle: '연구소·사무실·3D프린팅실',
    address: '경북 구미시 산호대로 253 구미첨단의료기술타워 606호',
    tel: '054-464-3137',
    url: 'http://wow3d.co.kr',
  },
  {
    name: '전북 전주센터',
    subtitle: '사무실·메이커스페이스',
    address: '전북특별자치도 전주시 덕진구 반룡로 109 테크노빌 A동 207호',
    tel: '054-464-3137',
    url: 'http://wow3d.co.kr',
  },
];

export const achievementYears = ['전체', '2026', '2025', '2024', '2023', '2022', '2021', '2020'] as const;

export const ipFilterOptions = ['전체', '특허', '디자인', '상표'] as const;
