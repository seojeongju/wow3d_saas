"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Navbar.module.css';

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string; description?: string }[];
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  // 홈(/) 이외의 페이지는 항상 불투명 네비게이션 표시
  const isHeroPage = pathname === '/';
  const isNavOpaque = !isHeroPage || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // 초기 스크롤 위치 확인
    handleScroll();

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks: NavLink[] = [
    {
      href: '/services/',
      label: 'AI S/W 솔루션',
      children: [
        { href: '/services/retail/', label: 'AI 재고/생산관리시스템 (Smart Manager)', description: '실시간 매장 관리 및 데이터 분석 솔루션' },
        { href: '/services/academy/', label: 'HRD학사관리시스템 (On-Track)', description: 'NCS 기반 직업훈련기관 전용 행정망' },
        { href: '/services/cbt/', label: '문제은행 솔루션 (CBT)', description: '컴퓨터 기반 시험 및 교육 평가 시스템' },
        { href: '/services/printing/', label: 'AI 실시간 자동 견적 시스템', description: '3D 프린팅 자동 견적 및 발주 관리' },
      ]
    },
    {
      href: '/hardware/',
      label: '제품 (Hardware)',
      children: [
        { href: '/hardware/3d-printer/', label: 'MSLA-DLP 3D 프린터', description: '9K/16K 초정밀 MSLA 3D 프린팅 프로 시리즈' },
        { href: '/hardware/hologram/', label: '3D 홀로그램 디스플레이', description: '시선을 사로잡는 혁신적인 3D 디스플레이 솔루션' },
      ]
    },
    {
      href: '/pricing/',
      label: '비즈니스 가이드',
      children: [
        { href: '/pricing/', label: '도입 안내', description: '솔루션 도입 절차 및 혜택 안내' },
        { href: '/contact/', label: '구축문의', description: '솔루션 도입 및 맞춤형 시스템 구축 상담' },
        { href: '/gov-support/', label: '정부지원사업 안내', description: '스마트제조, 스마트공장 등 정부지원 사업 안내' },
      ]
    },
    {
      href: '/services/academy/',
      label: '교육 센터',
      children: [
        { href: '/services/academy/center/', label: '홍대 교육 센터 안내', description: '와우쓰리디 홍대센터 교육 과정 및 시설 안내' },
      ]
    },
    {
      href: '/archive/',
      label: '고객지원',
      children: [
        { href: '/archive/', label: '자료실 (매뉴얼)', description: '제품 매뉴얼, 소프트웨어 가이드 및 드라이버' },
        { href: '/contact/', label: '1:1 문의/기술지원', description: '전문 엔지니어의 빠른 기술 지원 및 상담' },
      ]
    },
    { href: '/about/', label: '회사 소개' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setDropdownOpen(null);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mobile-menu]') && !target.closest('[data-mobile-toggle]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <nav className={clsx(styles.navbar, isNavOpaque && styles.scrolled, isOpen && styles.menuOpen)}>
        <div className={clsx("container", styles.navContainer)}>
          <Link href="/" className={styles.logoLink} onClick={handleLinkClick}>
            <div className={clsx(styles.logoWrapper)}>
              <div className={clsx(styles.brandLogo, (isNavOpaque || isOpen) && styles.scrolled)}>
                <span className={styles.logoWow}>WOW</span>
                <span className={styles.logoDatabiz}>DataBiz</span>
              </div>
              <span className={clsx(styles.logoCompany, (isNavOpaque || isOpen) && styles.scrolled)}>
                (주)와우쓰리디
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {navLinks.map((link) => (
              <div key={link.href} className={styles.navItemGroup}>
                <Link
                  href={link.href}
                  className={clsx(
                    styles.navLink,
                    'flex items-center gap-1',
                    pathname.startsWith(link.href) && link.href !== '/' && styles.active
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className={clsx(styles.chevron, 'transition-transform')} />}
                </Link>

                {/* Desktop Dropdown Menu */}
                {link.children && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownPanel}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.dropdownItem}
                        >
                          <div className={styles.dropdownItemContent}>
                            <span className={styles.dropdownItemLabel}>{child.label}</span>
                            {child.description && <span className={styles.dropdownItemDesc}>{child.description}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            <Link href="/contact" className={clsx(styles.btnNavCta, isNavOpaque ? styles.btnSolid : styles.btnGlass)}>
              무료 상담 신청 <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={clsx(styles.mobileToggle, (isNavOpaque || isOpen) && styles.dark)}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            data-mobile-toggle
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(styles.mobileMenuOverlay, isOpen && styles.open)}
        data-mobile-menu
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileMenuContainer}>
          {navLinks.map((link) => (
            <div key={link.href} className={styles.mobileNavGroup}>
              <div className={styles.mobileLinkWrapper}>
                <Link
                  href={link.children ? '#' : link.href}
                  className={clsx(styles.mobileLink, pathname === link.href && styles.active)}
                  onClick={(e) => {
                    if (link.children) {
                      e.preventDefault();
                      setDropdownOpen(dropdownOpen === link.href ? null : link.href);
                    } else {
                      handleLinkClick();
                    }
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === link.href ? null : link.href)}
                    className={styles.mobileDropdownTrigger}
                  >
                    <ChevronDown size={20} className={clsx('transition-transform', dropdownOpen === link.href && 'rotate-180')} />
                  </button>
                )}
              </div>

              {/* Mobile Submenu */}
              {link.children && (
                <div className={clsx(styles.mobileSubmenu, dropdownOpen === link.href && styles.open)}>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={styles.mobileSublink}
                      onClick={handleLinkClick}
                    >
                      <div className={styles.mobileSublinkContent}>
                        <span className={styles.mobileSublinkLabel}>{child.label}</span>
                        {child.description && <span className={styles.mobileSublinkDesc}>{child.description}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className={styles.mobilectaContainer}>
            <Link href="/contact" onClick={handleLinkClick} className={styles.btnMobileCta}>
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
