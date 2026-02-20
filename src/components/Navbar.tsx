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
  children?: { href: string; label: string }[];
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
    { href: '/', label: '홈' },
    {
      href: '/services/',
      label: '소프트웨어 소개',
      children: [
        { href: '/services/retail/', label: 'WOW-Smart Manager' },
        { href: '/services/academy/', label: 'NCS On-Track (온트랙)' },
        { href: '/services/cbt/', label: 'WOW-CBT (와우CBT)' },
        { href: '/services/printing/', label: '3D프린팅 AI 실시간 견적' },
      ]
    },
    {
      href: '/hardware/',
      label: '하드웨어 소개',
      children: [
        { href: '/hardware/3d-printer/', label: 'MSLA-DLP 3D Print' },
        { href: '/hardware/hologram/', label: '3D Hologram Display' },
      ]
    },
    { href: '/pricing/', label: '도입 안내' },
    { href: '/archive/', label: '자료실(게시판)' },
    { href: '/about/', label: '회사 소개' },
    { href: '/contact/', label: '문의하기' },
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
                          {child.label}
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
                      - {child.label}
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
