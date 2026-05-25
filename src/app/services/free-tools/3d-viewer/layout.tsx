import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D 도면 실시간 무료 뷰어 (STL Viewer)',
  description: '회원가입 및 설치 없이 3D 프린팅 STL 도면 파일을 브라우저에서 즉시 입체적으로 확인하고, 삼각형 폴리곤 개수 및 정밀 실측 mm 규격을 실시간으로 검사 및 측정하는 초경량 3D WebGL 뷰어입니다.',
  keywords: [
    '3D 뷰어',
    '무료 STL 뷰어',
    'STL 파일 뷰어',
    'STL 뷰어 온라인',
    '3D 프린터 도면 보기',
    '3D CAD 뷰어',
    '온라인 3D 뷰어',
    '와우쓰리디 무료 3D 도구',
    '무료 3D도면 뷰어',
    '3D stl 파일 열기',
    'Three.js STL 뷰어',
    '무료 3D 렌더링',
    '3D 프린터 출력 사전검사',
    '온라인 CAD 뷰어',
    'STL 크기 측정',
    '삼각형 폴리곤 개수 계산',
    '웹기반 stl 뷰어',
    '도면 사이즈 실측',
    '무료 3D 뷰어 프로그램'
  ],
  alternates: {
    canonical: 'https://wow3dsw.co.kr/services/free-tools/3d-viewer/',
  },
  openGraph: {
    title: '3D 도면 실시간 무료 뷰어 | (주)와우쓰리디',
    description: '설치 없이 STL 3D 도면 파일을 브라우저에서 즉시 실시간 회전 및 정밀 실측 크기를 측정하는 초경량 3D WebGL 뷰어입니다.',
    url: 'https://wow3dsw.co.kr/services/free-tools/3d-viewer/',
    type: 'website',
  }
};

export default function ThreeDViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
