import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '무료 비즈니스 프로그램 센터 | 소상공인 무료 웹 도구 모음 | (주)와우쓰리디',
  description:
    '소상공인·스타트업을 위한 무료 웹 프로그램 모음. 이미지 SVG 변환기, 3D 도면 뷰어, QR코드 생성기, 3D 프린팅 단가 계산기, 팀 일정관리(TeamCanvas)까지 — 설치·회원가입 없이 브라우저에서 즉시 무료 사용 가능합니다.',
  keywords: [
    // 무료 프로그램 공통
    '무료 프로그램',
    '무료 웹 도구',
    '무료 비즈니스 도구',
    '소상공인 무료 프로그램',
    '온라인 무료 유틸리티',
    '설치 없는 무료 프로그램',
    '웹 기반 무료 프로그램',
    '회원가입 없는 무료 도구',
    // SVG 변환
    '이미지 SVG 변환',
    '무료 SVG 변환기',
    'PNG SVG 변환',
    'JPG SVG 변환',
    '벡터 변환기',
    // 3D 뷰어
    '3D 도면 뷰어',
    'STL 파일 뷰어',
    '무료 3D 뷰어',
    // QR
    'QR코드 생성기 무료',
    '스마트 QR 생성기',
    '매장 QR코드',
    // 단가 계산기
    '3D 프린팅 단가 계산기',
    '3D 프린팅 비용 계산',
    // 일정관리
    '팀 일정관리',
    '무료 팀 캘린더',
    '협업 일정관리 프로그램',
    'TeamCanvas',
    '일정 공유 프로그램',
    // 브랜드
    '와우쓰리디 무료 도구',
    'WOW3D 무료 프로그램',
  ],
  authors: [{ name: '(주)와우쓰리디', url: 'https://wow3dsw.co.kr' }],
  creator: '(주)와우쓰리디',
  publisher: '(주)와우쓰리디',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wow3dsw.co.kr/services/free-tools/',
  },
  openGraph: {
    title: '무료 비즈니스 프로그램 센터 | (주)와우쓰리디',
    description:
      '이미지 SVG 변환기, 3D 뷰어, QR 생성기, 팀 일정관리 등 — 소상공인을 위한 설치 없는 무료 웹 프로그램 모음입니다.',
    url: 'https://wow3dsw.co.kr/services/free-tools/',
    siteName: '(주)와우쓰리디',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://wow3dsw.co.kr/images/wow-smart-manager-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'WOW3D 무료 비즈니스 프로그램 센터',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '무료 비즈니스 프로그램 센터 | (주)와우쓰리디',
    description:
      '이미지 SVG 변환기, 3D 뷰어, QR 생성기, 팀 일정관리 등 소상공인 무료 웹 도구 모음. 설치 없이 바로 사용!',
    images: ['https://wow3dsw.co.kr/images/wow-smart-manager-hero.jpg'],
  },
};

export default function FreeToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
