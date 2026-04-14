import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: '구축 문의 | (주)와우쓰리디 - 1:1 맞춤형 솔루션 상담 신청',
  description: '스마트공장 도입, ERP/CRM 구축, 학사관리 시스템 상담 등 (주)와우쓰리디의 전문가와 상의하세요. 1:1 맞춤형 상담을 통해 최적의 해결책을 제시해 드립니다.',
  openGraph: {
    title: '구축 문의 | (주)와우쓰리디 - 1:1 맞춤형 솔루션 상담 신청',
    description: '스마트공장 도입, ERP/CRM 구축, 학사관리 시스템 상담 등 (주)와우쓰리디의 전문가와 상의하세요. 1:1 맞춤형 상담을 통해 최적의 해결책을 제시해 드립니다.',
  }
};

export default function ContactPage() {
  return <ContactContent />;
}
