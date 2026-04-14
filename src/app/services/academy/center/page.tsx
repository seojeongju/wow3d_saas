import type { Metadata } from 'next';
import CenterContent from './CenterContent';

export const metadata: Metadata = {
  title: '교육 센터 | (주)와우쓰리디 - 3D 모델링 및 프린팅 전문 교육',
  description: '와우쓰리디 교육 센터(홍대, 구미, 전주)에서 3D 모델링과 프린팅을 마스터하세요. 실무 중심의 전문 커리큘럼과 국비 지원 과정을 제공합니다.',
  openGraph: {
    title: '교육 센터 | (주)와우쓰리디 - 3D 모델링 및 프린팅 전문 교육',
    description: '와우쓰리디 교육 센터(홍대, 구미, 전주)에서 3D 모델링과 프린팅을 마스터하세요. 실무 중심의 전문 커리큘럼과 국비 지원 과정을 제공합니다.',
  }
};

export default function EducationCenterPage() {
  return <CenterContent />;
}
