import type { Metadata } from 'next';
import RetailContent from './RetailContent';

export const metadata: Metadata = {
  title: 'WOW-Smart Manager | 스마트 재고/매출 관리 시스템 솔루션',
  description: '도소매 및 요식업을 위한 스마트 재고관리 솔루션 WOW-Smart Manager. 실시간 재고 파악, 자동 발주 알림, 매출 분석 대시보드로 경영 효율을 극대화하세요.',
  openGraph: {
    title: 'WOW-Smart Manager | 스마트 재고/매출 관리 시스템 솔루션',
    description: '도소매 및 요식업을 위한 스마트 재고관리 솔루션 WOW-Smart Manager. 실시간 재고 파악, 자동 발주 알림, 매출 분석 대시보드로 경영 효율을 극대화하세요.',
  }
};

export default function RetailServicePage() {
  return <RetailContent />;
}
