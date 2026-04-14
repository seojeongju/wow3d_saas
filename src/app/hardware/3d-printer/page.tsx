import type { Metadata } from 'next';
import PrinterContent from './PrinterContent';

export const metadata: Metadata = {
  title: 'P-Pro Series 3D 프린터 | (주)와우쓰리디 - 고정밀 MSLA-DLP 산업용 솔루션',
  description: '산업용 고정밀 MSLA-DLP 3D프린터 P-Pro Series. 9K/16K 초고해상도 해상도, 자동 온도 제어 시스템으로 완벽한 출력 품질을 보장합니다. 주얼리, 덴탈, 시제품 제작 최적화.',
  openGraph: {
    title: 'P-Pro Series 3D 프린터 | (주)와우쓰리디 - 고정밀 MSLA-DLP 산업용 솔루션',
    description: '산업용 고정밀 MSLA-DLP 3D프린터 P-Pro Series. 9K/16K 초고해상도 해상도, 자동 온도 제어 시스템으로 완벽한 출력 품질을 보장합니다. 주얼리, 덴탈, 시제품 제작 최적화.',
  }
};

export default function PrinterPage() {
  return <PrinterContent />;
}
