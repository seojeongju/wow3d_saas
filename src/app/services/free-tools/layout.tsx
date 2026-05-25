import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이미지 SVG 무료 변환기 (Image to SVG Converter)',
  description: 'JPG, PNG 등 일반 이미지를 고품질 SVG 벡터 그래픽 파일로 무료 변환해 주는 웹 도구입니다. 설치나 회원가입 없이 브라우저에서 즉시 실시간 변환을 지원합니다.',
  keywords: [
    '이미지 SVG 변환',
    '무료 SVG 변환',
    'PNG SVG 변환',
    'JPG SVG 변환',
    '벡터화',
    'Image to SVG',
    '벡터 변환기',
    '무료 이미지 벡터화',
    '와우쓰리디 무료 도구',
    '이미지 아웃라인 추출',
    '로고 SVG 변환',
    'jpg png 벡터 변환',
    '일러스트 svg 추출',
    '무료 이미지 벡터 변환기',
    '웹기반 svg 변환 프로그램',
    '도면 아웃라인 벡터화'
  ],
  alternates: {
    canonical: 'https://wow3dsw.co.kr/services/free-tools/',
  },
  openGraph: {
    title: '이미지 SVG 무료 변환기 | (주)와우쓰리디',
    description: 'JPG, PNG 등 일반 이미지를 고품질 SVG 벡터 그래픽 파일로 무료 변환해 주는 웹 도구입니다. 설치나 회원가입 없이 즉시 사용 가능합니다.',
    url: 'https://wow3dsw.co.kr/services/free-tools/',
    type: 'website',
  }
};

export default function FreeToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
