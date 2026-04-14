import type { Metadata } from 'next';
import CbtContent from './CbtContent';

export const metadata: Metadata = {
  title: 'WOW-CBT | 온라인 문제은행 및 CBT 시험 시스템 솔루션',
  description: '자격증 대비 및 교육기관을 위한 온라인 시험 시스템 WOW-CBT. 실제 시험 환경 구현, 자동 출제 문제은행, 즉시 채점 및 오답 분석 기능을 제공합니다.',
  openGraph: {
    title: 'WOW-CBT | 온라인 문제은행 및 CBT 시험 시스템 솔루션',
    description: '자격증 대비 및 교육기관을 위한 온라인 시험 시스템 WOW-CBT. 실제 시험 환경 구현, 자동 출제 문제은행, 즉시 채점 및 오답 분석 기능을 제공합니다.',
  }
};

export default function WowCbtServicePage() {
  return <CbtContent />;
}
