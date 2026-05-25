import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '매장용 스마트 QR 무료 생성기 (QR Code Builder)',
  description: '회원가입 및 설치 없이 매장 방문객 전용 와이파이(Wi-Fi) 자동 연동 QR, 테이블 오더 연동, 모바일 상담 및 예약 링크 커스텀 QR 코드를 색상과 크기를 조정해 고화질로 즉시 다운로드받는 무료 스마트 QR 제작기입니다.',
  keywords: [
    'QR 생성기',
    '무료 QR 코드 만들기',
    '와이파이 QR 코드',
    '매장용 QR 코드',
    'QR 코드 다운로드',
    'QR 코드 제작기',
    '테이블오더 QR',
    '와우쓰리디 무료 도구'
  ],
  alternates: {
    canonical: 'https://wow3dsw.co.kr/services/free-tools/qr-builder/',
  },
  openGraph: {
    title: '매장용 스마트 QR 무료 생성기 | (주)와우쓰리디',
    description: '방문객 와이파이 연결 QR, 매장 테이블오더 및 예약 링크를 단 3초 만에 커스텀 컬러 고화질 파일로 무료 빌드 및 생성하는 도구입니다.',
    url: 'https://wow3dsw.co.kr/services/free-tools/qr-builder/',
    type: 'website',
  }
};

export default function QrBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
