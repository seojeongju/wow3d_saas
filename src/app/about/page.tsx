import type { Metadata } from 'next';
import AboutOverviewContent from './AboutOverviewContent';

export const metadata: Metadata = {
  title: '회사 소개 | (주)와우쓰리디 - 3D·홀로그램·AI 융합 기술 기업',
  description:
    '㈜와우쓰리디(WOW3D)는 3D프린터·홀로그램 디스플레이·AI 스마트제조 솔루션·4차산업 교육을 제공하는 벤처기업입니다. 서울·구미·전주 센터 운영.',
  keywords: [
    '와우쓰리디', 'WOW3D', '3D프린터', '홀로그램', 'MSLA-DLP',
    '스마트제조', '벤처기업', 'HRD교육', '기업부설연구소', 'ISO9001',
  ],
  openGraph: {
    title: '회사 소개 | (주)와우쓰리디 - 3D·홀로그램·AI 융합 기술 기업',
    description:
      '3D프린팅·홀로그램·AI 융합 기술로 4차 산업혁명을 선도하는 ㈜와우쓰리디. 연혁, 보유기술, 인증, 개발실적을 확인하세요.',
  },
};

export default function AboutPage() {
  return <AboutOverviewContent />;
}
