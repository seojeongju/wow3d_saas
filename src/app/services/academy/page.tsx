import type { Metadata } from 'next';
import AcademyContent from './AcademyContent';

export const metadata: Metadata = {
  title: 'NCS On-Track | 에듀테크 HRD 학사관리 시스템 솔루션',
  description: '직업훈련기관 및 학원을 위한 올인원 학사관리 시스템 NCS On-Track. NCS 기반 커리큘럼 설계, 출결 자동화, 학습 성취도 분석 리포트를 제공합니다.',
  openGraph: {
    title: 'NCS On-Track | 에듀테크 HRD 학사관리 시스템 솔루션',
    description: '직업훈련기관 및 학원을 위한 올인원 학사관리 시스템 NCS On-Track. NCS 기반 커리큘럼 설계, 출결 자동화, 학습 성취도 분석 리포트를 제공합니다.',
  }
};

export default function AcademyServicePage() {
  return <AcademyContent />;
}
