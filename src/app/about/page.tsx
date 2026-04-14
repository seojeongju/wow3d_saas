import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: '회사 소개 | (주)와우쓰리디 - 비즈니스 경영 혁신 파트너',
  description: '(주)와우쓰리디는 최신 기술과 데이터 분석을 통해 고객의 비즈니스 성장과 경영 효율화를 실현하는 스마트 솔루션 전문 기업입니다.',
  openGraph: {
    title: '회사 소개 | (주)와우쓰리디 - 비즈니스 경영 혁신 파트너',
    description: '(주)와우쓰리디는 최신 기술과 데이터 분석을 통해 고객의 비즈니스 성장과 경영 효율화를 실현하는 스마트 솔루션 전문 기업입니다.',
  }
};

export default function AboutPage() {
  return <AboutContent />;
}
