import type { Metadata } from 'next';
import HardwareContent from './HardwareContent';

export const metadata: Metadata = {
  title: '하드웨어 솔루션 | (주)와우쓰리디 - 고정밀 3D프린터 및 홀로그램 디스플레이',
  description: '(주)와우쓰리디의 첨단 하드웨어 제품을 만나보세요. 고정밀 MSLA-DLP 3D프린터와 몰입감 넘치는 3D 홀로그램 디스플레이 솔루션을 제공합니다.',
  openGraph: {
    title: '하드웨어 솔루션 | (주)와우쓰리디 - 고정밀 3D프린터 및 홀로그램 디스플레이',
    description: '(주)와우쓰리디의 첨단 하드웨어 제품을 만나보세요. 고정밀 MSLA-DLP 3D프린터와 몰입감 넘치는 3D 홀로그램 디스플레이 솔루션을 제공합니다.',
  }
};

export default function HardwarePage() {
  return <HardwareContent />;
}
