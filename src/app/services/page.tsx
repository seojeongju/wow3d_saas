import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: '서비스 소개 | (주)와우쓰리디 - 스마트 재고관리 & 학사관리 솔루션',
  description: '도소매 재고관리 WOW-Smart Manager, HRD 학사관리 NCS On-Track, 온라인 시험 WOW-CBT 등 (주)와우쓰리디의 맞춤형 스마트 솔루션을 만나보세요.',
  openGraph: {
    title: '서비스 소개 | (주)와우쓰리디 - 스마트 재고관리 & 학사관리 솔루션',
    description: '도소매 재고관리 WOW-Smart Manager, HRD 학사관리 NCS On-Track, 온라인 시험 WOW-CBT 등 (주)와우쓰리디의 맞춤형 스마트 솔루션을 만나보세요.',
  }
};

export default function ServicesPage() {
  return <ServicesContent />;
}
