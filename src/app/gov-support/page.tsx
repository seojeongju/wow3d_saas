import type { Metadata } from 'next';
import GovSupportContent from './GovSupportContent';

export const metadata: Metadata = {
  title: '정부지원사업 안내 | (주)와우쓰리디 - 공식공급기업 솔루션 혜택',
  description: '스마트공장, 스마트제조, 스마트상점 등 중소벤처기업부 공식 공급기업 (주)와우쓰리디의 정부지원사업 솔루션과 지원 혜택을 확인하세요.',
  openGraph: {
    title: '정부지원사업 안내 | (주)와우쓰리디 - 공식공급기업 솔루션 혜택',
    description: '스마트공장, 스마트제조, 스마트상점 등 중소벤처기업부 공식 공급기업 (주)와우쓰리디의 정부지원사업 솔루션과 지원 혜택을 확인하세요.',
  }
};

export default function GovSupportPage() {
  return <GovSupportContent />;
}
