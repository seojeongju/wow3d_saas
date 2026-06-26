// ✅ 서버 컴포넌트 (use client 제거) — JSON-LD가 SSR로 즉시 렌더되어 검색엔진에 완전 노출
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Box,
  QrCode,
  Calculator,
  CalendarDays,
  Lock,
  ShieldCheck,
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

// ─── JSON-LD 구조화 데이터 (AEO + SEO) ────────────────────────────────────────
const jsonLdItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'WOW3D 무료 비즈니스 프로그램 목록',
  description:
    '소상공인 및 소기업의 업무 생산성과 디지털 경영 전환을 돕기 위해 무상 제공하는 소프트웨어 유틸리티 도구 목록입니다.',
  url: 'https://wow3dsw.co.kr/services/free-tools/',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '이미지 SVG 변환기',
      description:
        'PNG, JPG 등 일반 이미지를 픽셀 깨짐이 없는 SVG 벡터 파일로 무료 변환. 설치 없이 브라우저에서 즉시 사용 가능.',
      url: 'https://wow3dsw.co.kr/services/free-tools/image-to-svg/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '3D 도면 실시간 뷰어',
      description:
        '설치 없이 STL 3D 파일을 브라우저에서 바로 열어 회전·확대하고 mm 실측 규격을 즉각 확인하는 무료 3D 뷰어.',
      url: 'https://wow3dsw.co.kr/services/free-tools/3d-viewer/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '매장용 스마트 QR 생성기',
      description:
        '소상공인 매장을 위한 맞춤형 QR코드 생성기. 와이파이 연동, 예약 페이지, 테이블 오더 QR을 커스텀 디자인으로 무료 제작.',
      url: 'https://wow3dsw.co.kr/services/free-tools/qr-builder/',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: '3D 프린팅 단가 계산기',
      description:
        '필라멘트 사양·난이도 기반 3D 프린팅 아웃소싱 예상 단가 계산기. 투명한 공정 비용 시뮬레이션 제공.',
      url: 'https://wow3dp.co.kr',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: '팀 일정관리 (TeamCanvas)',
      description:
        '팀원 간 일정을 한눈에 공유·관리하는 협업 캘린더. 개인·팀 일정을 색상별 구분, 실시간 스케줄 확인. 설치 없이 무료 사용.',
      url: 'https://teamcanvas.pages.dev/',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: '규제인증 AI 진단 (Certi-Mate)',
      description:
        'KC 인증, 식약처 허가, 해외 규제 등 제품 정보를 입력하면 AI가 필요한 법적 절차와 비용, 기간을 분석해 주는 무료 진단 서비스.',
      url: 'https://compliance-saas-5jq.pages.dev/',
    },
  ],
};

// SoftwareApplication 스키마 — 구글 리치 결과 / 네이버 AI 답변(AEO)에 활용
const jsonLdSoftwareApps = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '이미지 SVG 변환기',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    description:
      'PNG, JPG 이미지를 무료로 SVG 벡터 파일로 변환하는 온라인 도구.',
    url: 'https://wow3dsw.co.kr/services/free-tools/image-to-svg/',
    provider: { '@type': 'Organization', name: '(주)와우쓰리디' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '팀 일정관리 (TeamCanvas)',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    description:
      '팀원 간 일정을 공유·관리하는 협업 캘린더 웹 앱. 무료, 설치 불필요.',
    url: 'https://teamcanvas.pages.dev/',
    provider: { '@type': 'Organization', name: '(주)와우쓰리디' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '규제인증 AI 진단 (Certi-Mate)',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    description:
      'KC 인증, 식약처 허가, 해외 규제 등 제품 정보를 입력하면 AI가 필요한 법적 절차와 비용, 기간을 분석해 주는 무료 진단 서비스.',
    url: 'https://compliance-saas-5jq.pages.dev/',
    provider: { '@type': 'Organization', name: '(주)와우쓰리디' },
  },
];

// FAQ 스키마 — 네이버·구글 AI 개요(AEO) 및 FAQ 리치 결과 대응
const jsonLdFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '와우쓰리디 무료 프로그램은 정말 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 회원가입·설치 없이 모두 100% 무료입니다. 소상공인·스타트업 지원을 위해 (주)와우쓰리디가 무상 제공합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '무료 이미지 SVG 변환기는 어디서 사용하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'https://wow3dsw.co.kr/services/free-tools/image-to-svg/ 에서 브라우저로 즉시 사용 가능합니다. PNG, JPG 파일을 SVG 벡터 형식으로 무료 변환합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '팀 일정관리 프로그램 TeamCanvas는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TeamCanvas는 팀원 간 일정을 공유·관리하는 협업 캘린더 웹 앱입니다. 개인 일정과 팀 프로젝트 일정을 색상별로 구분하고 실시간으로 확인할 수 있으며, 설치 없이 웹에서 무료로 사용할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '3D 파일(STL)을 무료로 볼 수 있는 프로그램이 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '와우쓰리디 3D 도면 실시간 뷰어(https://wow3dsw.co.kr/services/free-tools/3d-viewer/)에서 STL 파일을 설치 없이 브라우저에서 무료로 열어볼 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'QR코드를 무료로 만들 수 있는 사이트는?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '와우쓰리디 스마트 QR 생성기(https://wow3dsw.co.kr/services/free-tools/qr-builder/)에서 무료로 QR코드를 만들 수 있습니다. 와이파이 연동, 예약 페이지 연결, 테이블 오더 등 소상공인에 특화된 기능을 제공합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '제품 규제인증을 무료로 진단해주는 프로그램이 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 규제인증 AI 진단 프로그램인 Certi-Mate(https://compliance-saas-5jq.pages.dev/)를 통해 제품 정보 입력만으로 AI가 KC인증, 식약처 허가 등 필요한 규제 절차와 비용을 무료로 즉각 진단해 드립니다.',
      },
    },
  ],
};

export default function FreeToolsHubPage() {
  // 무료 도구 목록 배열
  const tools: ToolItem[] = [
    {
      id: 'image-to-svg',
      title: '이미지 SVG 변환기',
      description:
        'PNG, JPG 등 일반 이미지를 픽셀 깨짐이 전혀 없는 고해상도 SVG 벡터 파일로 실시간 변환해 줍니다. 100% 로컬 브라우저 구동으로 파일 유출 없이 안전하게 작동합니다.',
      icon: <Sparkles size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: '/services/free-tools/image-to-svg/',
    },
    {
      id: '3d-viewer',
      title: '3D 도면 실시간 뷰어',
      description:
        '설치 없이 웹 브라우저 상에서 직접 3D 프린터 설계 도면(STL) 파일을 업로드하여 입체 형상을 자유롭게 회전/확대하고 실측 규격 mm 크기를 즉각 측정 및 검사합니다.',
      icon: <Box size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: '/services/free-tools/3d-viewer/',
    },
    {
      id: 'qr-builder',
      title: '매장용 스마트 QR 생성기',
      description:
        '고객용 무료 와이파이 자동 연동 QR부터 예약 페이지 연결, 테이블 오더 연동 등 소상공인 매장에 유용한 맞춤형 다기능 스마트 QR 코드를 실시간 커스텀 디자인하고 빌드합니다.',
      icon: <QrCode size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: '/services/free-tools/qr-builder/',
    },
    {
      id: 'cost-calculator',
      title: '3D 프린팅 단가 계산기',
      description:
        '시제품 출력을 위해 모델링 파일 및 필라멘트 사양을 기반으로 가공비, 재료비, 난이도를 정밀 계산하여 아웃소싱 전 예상 공정 단가를 투명하게 시뮬레이션합니다.',
      icon: <Calculator size={28} />,
      badgeText: '견적 서비스 연동',
      isActive: true,
      href: 'https://wow3dp.co.kr',
      isExternal: true,
    },
    {
      id: 'team-canvas',
      title: '팀 일정관리 (TeamCanvas)',
      description:
        '팀원 간 일정을 한눈에 공유·관리하는 협업 캘린더 도구입니다. 개인 일정과 팀 프로젝트 일정을 색상별로 구분하고, 실시간으로 팀원의 스케줄을 확인할 수 있습니다. 설치 없이 웹에서 바로 사용 가능합니다.',
      icon: <CalendarDays size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: 'https://teamcanvas.pages.dev/',
      isExternal: true,
    },
    {
      id: 'certi-mate',
      title: '규제인증 AI 진단 (Certi-Mate)',
      description:
        '제품 사양을 입력하면 AI가 KC 인증, 식약처 허가, 해외 규제 등 필수 규제 항목을 즉시 분석하여 비용, 기간, 필요한 행정 서류 준비 절차를 무료로 설계합니다.',
      icon: <ShieldCheck size={28} />,
      badgeText: '서비스 제공 중',
      isActive: true,
      href: 'https://compliance-saas-5jq.pages.dev/',
      isExternal: true,
    },
  ];

  return (
    <div className={styles.container}>
      {/* ── SEO / AEO 구조화 데이터 (SSR 렌더 — 검색엔진 즉시 인식) ── */}

      {/* 1) ItemList 스키마 — 구글/네이버 목록 리치 결과 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />

      {/* 2) SoftwareApplication 스키마 — 앱 리치 결과 (별점, 가격, 플랫폼) */}
      {jsonLdSoftwareApps.map((app, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
        />
      ))}

      {/* 3) FAQ 스키마 — 네이버 AI·구글 AI 개요(AEO) 답변 직접 노출 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      {/* ── 1. 메인 히어로 소개 영역 ── */}
      <header className={styles.heroSection}>
        <span className={styles.heroBadge}>비즈니스 업무 지원</span>
        <h1 className={styles.heroTitle}>WOW3D 무료 프로그램 센터</h1>
        <p className={styles.heroDesc}>
          소상공인 및 스타트업의 비즈니스 혁신과 제조 경쟁력 강화를 돕기 위해,
          (주)와우쓰리디가 무상으로 공급하는 고기능 유틸리티 도구입니다.
          회원가입 없이 즉시 무료 사용이 가능합니다.
        </p>
      </header>

      {/* ── 2. 도구 그리드 카드 영역 ── */}
      <main className={styles.grid}>
        {tools.map((tool) => (
          <article
            key={tool.id}
            className={clsx(
              styles.card,
              tool.isActive ? styles.activeCard : styles.comingSoonCard
            )}
          >
            {/* 활성화 및 대기 배지 */}
            <span
              className={clsx(
                styles.badge,
                tool.isActive ? styles.badgeActive : styles.badgeInactive
              )}
            >
              {tool.badgeText}
            </span>

            <div className={styles.cardHeader}>
              <div
                className={clsx(
                  styles.iconWrapper,
                  tool.isActive ? styles.activeIcon : styles.inactiveIcon
                )}
              >
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
                  <Link
                    href={tool.href}
                    className={clsx(styles.btnAction, styles.btnActive)}
                  >
                    지금 사용하기 <ArrowRight size={16} />
                  </Link>
                )
              ) : (
                <button
                  className={clsx(styles.btnAction, styles.btnInactive)}
                  disabled
                >
                  <Lock size={14} /> 추후 업데이트 예정
                </button>
              )}
            </div>
          </article>
        ))}
      </main>

      {/* ── 3. FAQ 섹션 (AEO: 네이버·구글 AI 답변 소스로 활용) ── */}
      <section
        className={styles.faqSection}
        aria-label="자주 묻는 질문"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <h2 className={styles.faqTitle}>자주 묻는 질문 (FAQ)</h2>
        <div className={styles.faqList}>
          {jsonLdFAQ.mainEntity.map((faq, idx) => (
            <details
              key={idx}
              className={styles.faqItem}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary className={styles.faqQuestion} itemProp="name">
                {faq.name}
              </summary>
              <div
                className={styles.faqAnswer}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{faq.acceptedAnswer.text}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
