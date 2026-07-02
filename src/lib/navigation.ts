export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavSection = {
  id: string;
  href: string;
  label: string;
  children: NavChild[];
  /** 이 경로 prefix에 해당 섹션 서브메뉴 표시 */
  pathPrefixes: string[];
};

export const mainNavSections: NavSection[] = [
  {
    id: 'services',
    href: '/services',
    label: 'AI S/W 솔루션',
    pathPrefixes: ['/services'],
    children: [
      { href: '/services/retail', label: 'Smart Manager', description: 'AI 재고/생산관리시스템' },
      { href: '/services/academy', label: 'On-Track', description: 'HRD학사관리시스템' },
      { href: '/services/cbt', label: 'CBT', description: '문제은행 솔루션' },
      { href: '/services/printing', label: '자동 견적', description: 'AI 3D 프린팅 견적 시스템' },
      { href: '/services/free-tools', label: '무료 프로그램', description: '무료 비즈니스 웹 도구' },
    ],
  },
  {
    id: 'hardware',
    href: '/hardware',
    label: '제품 (Hardware)',
    pathPrefixes: ['/hardware'],
    children: [
      { href: '/hardware/3d-printer', label: '3D 프린터', description: 'MSLA-DLP 3D 프린터' },
      { href: '/hardware/hologram', label: '홀로그램', description: '3D 홀로그램 디스플레이' },
    ],
  },
  {
    id: 'business',
    href: '/pricing',
    label: '비즈니스 가이드',
    pathPrefixes: ['/pricing', '/gov-support', '/contact'],
    children: [
      { href: '/pricing', label: '도입 안내', description: '솔루션 도입 절차 및 혜택' },
      { href: '/contact', label: '구축문의', description: '맞춤형 시스템 구축 상담' },
      { href: '/gov-support', label: '정부지원사업', description: '스마트공장·제조 지원 안내' },
    ],
  },
  {
    id: 'education',
    href: '/services/academy/center',
    label: '교육 센터',
    pathPrefixes: ['/services/academy/center'],
    children: [
      { href: '/services/academy/center', label: '홍대 교육 센터', description: '교육 과정 및 시설 안내' },
    ],
  },
  {
    id: 'support',
    href: '/archive',
    label: '고객지원',
    pathPrefixes: ['/archive'],
    children: [
      { href: '/archive', label: '자료실', description: '매뉴얼·가이드·드라이버' },
      { href: '/contact', label: '1:1 문의', description: '기술지원 및 상담' },
    ],
  },
  {
    id: 'about',
    href: '/about',
    label: '회사 소개',
    pathPrefixes: ['/about'],
    children: [
      { href: '/about', label: '기업 개요', description: '회사 소개 및 사업 영역' },
      { href: '/about/history', label: '성장 연혁', description: '2016년부터 현재까지' },
      { href: '/about/technology', label: '제품·기술', description: '제품, 지재권, 보유 장비' },
      { href: '/about/certifications', label: '인증·지정', description: '벤처·ISO·HRD 등' },
      { href: '/about/achievements', label: '사업 실적', description: '정부지원·R&D 이력' },
      { href: '/about/locations', label: '센터 안내', description: '서울·구미·전주 거점' },
    ],
  },
];

/** 헤더 Navbar용 (description 포함 전체 라벨) */
export const mainNavLinks = mainNavSections.map((section) => ({
  href: section.href,
  label: section.label,
  children: section.children.map((child) => ({
    ...child,
    label: navLabelForHeader(section.id, child),
  })),
}));

function navLabelForHeader(sectionId: string, child: NavChild): string {
  if (sectionId === 'services') {
    const full: Record<string, string> = {
      '/services/retail': 'AI 재고/생산관리시스템 (Smart Manager)',
      '/services/academy': 'HRD학사관리시스템 (On-Track)',
      '/services/cbt': '문제은행 솔루션 (CBT)',
      '/services/printing': 'AI 실시간 자동 견적 시스템',
      '/services/free-tools': '무료 프로그램',
    };
    return full[child.href] ?? child.label;
  }
  if (sectionId === 'hardware') {
    const full: Record<string, string> = {
      '/hardware/3d-printer': 'MSLA-DLP 3D 프린터',
      '/hardware/hologram': '3D 홀로그램 디스플레이',
    };
    return full[child.href] ?? child.label;
  }
  if (sectionId === 'business') {
    const full: Record<string, string> = {
      '/pricing': '도입 안내',
      '/contact': '구축문의',
      '/gov-support': '정부지원사업 안내',
    };
    return full[child.href] ?? child.label;
  }
  if (sectionId === 'education') {
    return '홍대 교육 센터 안내';
  }
  if (sectionId === 'support') {
    const full: Record<string, string> = {
      '/archive': '자료실 (매뉴얼)',
      '/contact': '1:1 문의/기술지원',
    };
    return full[child.href] ?? child.label;
  }
  return child.label;
}

export const aboutSubNavItems = mainNavSections.find((s) => s.id === 'about')!.children;
export const servicesSubNavItems = mainNavSections.find((s) => s.id === 'services')!.children;
export const hardwareSubNavItems = mainNavSections.find((s) => s.id === 'hardware')!.children;
export const businessSubNavItems = mainNavSections.find((s) => s.id === 'business')!.children;
export const educationSubNavItems = mainNavSections.find((s) => s.id === 'education')!.children;
export const supportSubNavItems = mainNavSections.find((s) => s.id === 'support')!.children;

/** @deprecated about.data 호환 — navigation.ts 사용 권장 */
export const aboutNavItems = aboutSubNavItems;

const SECTION_MATCH_ORDER: string[] = [
  'education',
  'services',
  'hardware',
  'business',
  'support',
  'about',
];

export function getSectionForPath(pathname: string): NavSection | null {
  for (const id of SECTION_MATCH_ORDER) {
    const section = mainNavSections.find((s) => s.id === id);
    if (!section) continue;
    if (section.pathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
      if (id === 'services' && pathname.startsWith('/services/academy/center')) {
        continue;
      }
      return section;
    }
  }
  return null;
}

export function isSubNavActive(pathname: string, href: string): boolean {
  const normalized = href.endsWith('/') ? href.slice(0, -1) : href;
  const path = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (normalized === '/about' || normalized === '/services' || normalized === '/hardware' || normalized === '/archive' || normalized === '/pricing') {
    return path === normalized;
  }
  return path === normalized || path.startsWith(`${normalized}/`);
}
