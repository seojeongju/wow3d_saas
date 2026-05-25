"use client";

import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Box, 
  QrCode, 
  Calculator,
  Lock
} from 'lucide-react';
import clsx from 'clsx';
import styles from './hub.module.css';

// 무료 유틸리티 카드 정보 인터페이스
interface ToolItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badgeText: string;
  isActive: boolean;
  href: string;
  isExternal?: boolean;
}

export default function FreeToolsHubPage() {
  // 무료 도구 목록 배열 (추후 계속 늘려갈 수 있는 확장성 확보 구조)
  const tools: ToolItem[] = [
    {
      id: 'image-to-svg',
      title: '이미지 SVG 변환기',
      description: 'PNG, JPG 등 일반 이미지를 픽셀 깨짐이 전혀 없는 고해상도 SVG 벡터 파일로 실시간 변환해 줍니다. 100% 로컬 브라우저 구동으로 파일 유출 없이 안전하게 작동합니다.',
      icon: <Sparkles size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: '/services/free-tools/image-to-svg/'
    },
    {
      id: '3d-viewer',
      title: '3D 도면 실시간 뷰어',
      description: '설치 없이 웹 브라우저 상에서 직접 3D 프린터 설계 도면(STL) 파일을 업로드하여 입체 형상을 자유롭게 회전/확대하고 실측 규격 mm 크기를 즉각 측정 및 검사합니다.',
      icon: <Box size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: '/services/free-tools/3d-viewer/'
    },
    {
      id: 'qr-builder',
      title: '매장용 스마트 QR 생성기',
      description: '고객용 무료 와이파이 자동 연동 QR부터 예약 페이지 연결, 테이블 오더 연동 등 소상공인 매장에 유용한 맞춤형 다기능 스마트 QR 코드를 실시간 커스텀 디자인하고 빌드합니다.',
      icon: <QrCode size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: '/services/free-tools/qr-builder/'
    },
    {
      id: 'cost-calculator',
      title: '3D 프린팅 단가 계산기',
      description: '시제품 출력을 위해 모델링 파일 및 필라멘트 사양을 기반으로 가공비, 재료비, 난이도를 정밀 계산하여 아웃소싱 전 예상 공정 단가를 투명하게 시뮬레이션합니다.',
      icon: <Calculator size={28} />,
      badgeText: '견적 서비스 연동',
      isActive: true,
      href: 'https://wow3dp.co.kr',
      isExternal: true
    }
  ];

  return (
    <div className={styles.container}>
      {/* AEO 최적화를 위한 JSON-LD 구조화 데이터 인젝션 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "WOW3D 무료 비즈니스 프로그램 목록",
            "description": "소상공인 및 소기업의 업무 생산성과 디지털 경영 전환을 돕기 위해 무상 제공하는 소프트웨어 유틸리티 도구 목록입니다.",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "이미지 SVG 변환기",
                "url": "https://wow3dsw.co.kr/services/free-tools/image-to-svg/"
              }
            ]
          })
        }}
      />

      {/* 1. 메인 히어로 소개 영역 */}
      <header className={styles.heroSection}>
        <span className={styles.heroBadge}>비즈니스 업무 지원</span>
        <h1 className={styles.heroTitle}>WOW3D 무료 프로그램 센터</h1>
        <p className={styles.heroDesc}>
          소상공인 및 스타트업의 비즈니스 혁신과 제조 경쟁력 강화를 돕기 위해, (주)와우쓰리디가 무상으로 공급하는 고기능 유틸리티 도구입니다. 회원가입 없이 즉시 무료 사용이 가능합니다.
        </p>
      </header>

      {/* 2. 도구 그리드 카드 영역 */}
      <main className={styles.grid}>
        {tools.map((tool) => (
          <article 
            key={tool.id} 
            className={clsx(styles.card, tool.isActive ? styles.activeCard : styles.comingSoonCard)}
          >
            {/* 활성화 및 대기 배지 */}
            <span className={clsx(styles.badge, tool.isActive ? styles.badgeActive : styles.badgeInactive)}>
              {tool.badgeText}
            </span>

            <div className={styles.cardHeader}>
              <div className={clsx(styles.iconWrapper, tool.isActive ? styles.activeIcon : styles.inactiveIcon)}>
                {tool.icon}
              </div>
              <h2 className={styles.toolTitle}>{tool.title}</h2>
              <p className={styles.toolDesc}>{tool.description}</p>
            </div>

            <div className={styles.cardFooter}>
              {tool.isActive ? (
                tool.isExternal ? (
                  <a 
                    href={tool.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={clsx(styles.btnAction, styles.btnActive)}
                  >
                    지금 사용하기 <ArrowRight size={16} />
                  </a>
                ) : (
                  <Link href={tool.href} className={clsx(styles.btnAction, styles.btnActive)}>
                    지금 사용하기 <ArrowRight size={16} />
                  </Link>
                )
              ) : (
                <button className={clsx(styles.btnAction, styles.btnInactive)} disabled>
                  <Lock size={14} /> 추후 업데이트 예정
                </button>
              )}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
