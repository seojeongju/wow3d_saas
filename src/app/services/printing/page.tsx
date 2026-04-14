import type { Metadata } from 'next';
import PrintingContent from './PrintingContent';

export const metadata: Metadata = {
  title: '3D프린팅 AI 견적 | (주)와우쓰리디 - 실시간 시제품 제작 자동견적',
  description: 'AI가 분석하는 3D프린팅 실시간 자동견적 서비스. STL, OBJ 파일 업로드 즉시 견적 확인 및 주문이 가능합니다. 시제품 제작부터 소량 양산까지 전문가가 함께합니다.',
  openGraph: {
    title: '3D프린팅 AI 견적 | (주)와우쓰리디 - 실시간 시제품 제작 자동견적',
    description: 'AI가 분석하는 3D프린팅 실시간 자동견적 서비스. STL, OBJ 파일 업로드 즉시 견적 확인 및 주문이 가능합니다. 시제품 제작부터 소량 양산까지 전문가가 함께합니다.',
  }
};

export default function PrintingServicePage() {
  return <PrintingContent />;
}
