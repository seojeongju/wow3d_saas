import type { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: '도입 안내 | (주)와우쓰리디 - 합리적인 솔루션 구축 프로세스',
  description: '(주)와우쓰리디의 스마트 솔루션 도입 절차와 요금제를 안내해 드립니다. 14일 무료 체험을 통해 비즈니스에 최적화된 시스템을 경험해 보세요.',
  openGraph: {
    title: '도입 안내 | (주)와우쓰리디 - 합리적인 솔루션 구축 프로세스',
    description: '(주)와우쓰리디의 스마트 솔루션 도입 절차와 요금제를 안내해 드립니다. 14일 무료 체험을 통해 비즈니스에 최적화된 시스템을 경험해 보세요.',
  }
};

export default function PricingPage() {
  return <PricingContent />;
}
