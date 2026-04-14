import type { Metadata } from 'next';
import HologramContent from './HologramContent';

export const metadata: Metadata = {
  title: '3D 홀로그램 디스플레이 | (주)와우쓰리디 - 고휘도 LED 팬 전시 솔루션',
  description: '시선을 사로잡는 3D 홀로그램 디스플레이 솔루션. 고휘도 LED 팬 기술로 구현하는 압도적인 몰입감과 선명한 입체 영상을 전시, 홍보, 교육 현장에서 만나보세요.',
  openGraph: {
    title: '3D 홀로그램 디스플레이 | (주)와우쓰리디 - 고휘도 LED 팬 전시 솔루션',
    description: '시선을 사로잡는 3D 홀로그램 디스플레이 솔루션. 고휘도 LED 팬 기술로 구현하는 압도적인 몰입감과 선명한 입체 영상을 전시, 홍보, 교육 현장에서 만나보세요.',
  }
};

export default function HologramPage() {
  return <HologramContent />;
}
