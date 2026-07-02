"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, ChevronDown, Home, LayoutGrid, MessageCircle, Info, Box } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Navbar.module.css';
import { mainNavLinks } from '@/lib/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // 홈(/) 이외의 페이지는 항상 불투명 네비게이션 표시
  const isHeroPage = pathname === '/';
  const isNavOpaque = !isHeroPage || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      // 스크롤 방향에 따라 하단 바 표시/숨김
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowBottomNav(false); // 아래로 스크롤 시 숨김
      } else {
        setShowBottomNav(true); // 위로 스크롤 시 표시
      }
      setLastScrollY(currentScrollY);
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
  }, [lastScrollY]);

  const navLinks = mainNavLinks;

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

  // 메뉴 열림 시 배경 스크롤 잠금
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const toggleDropdown = (href: string) => {
    setDropdownOpen((prev) => (prev === href ? null : href));
  };

  return (
    <>
      <nav className={clsx(styles.navbar, isNavOpaque && styles.scrolled, isOpen && styles.menuOpen)}>
        <div className={clsx("container", styles.navContainer)}>
          <Link href="/" className={styles.logoLink} onClick={handleLinkClick}>
            <div className={clsx(styles.logoWrapper)}>
              <div className={clsx(styles.brandLogo, (isNavOpaque || isOpen) && styles.scrolled)}>
                <span className={styles.logoWow}>WOW</span>
                <span className={styles.logoDatabiz}>3D</span>
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
        <div className={styles.mobileMenuScroll}>
          <div className={styles.mobileMenuContainer}>
            {navLinks.map((link) => {
              const isExpanded = dropdownOpen === link.href;
              return (
                <div key={link.href} className={styles.mobileNavGroup}>
                  <div
                    className={clsx(
                      styles.mobileLinkWrapper,
                      link.children && styles.hasChildren,
                      isExpanded && styles.expanded
                    )}
                  >
                    {link.children ? (
                      <button
                        type="button"
                        className={clsx(
                          styles.mobileLink,
                          styles.mobileLinkButton,
                          pathname.startsWith(link.href) && link.href !== '/' && styles.active
                        )}
                        onClick={() => toggleDropdown(link.href)}
                        aria-expanded={isExpanded}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          size={18}
                          className={clsx(styles.mobileChevron, isExpanded && styles.rotated)}
                          aria-hidden
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={clsx(styles.mobileLink, pathname === link.href && styles.active)}
                        onClick={handleLinkClick}
                      >
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </div>

                  {link.children && (
                    <div className={clsx(styles.mobileSubmenu, isExpanded && styles.open)}>
                      <div className={styles.mobileSubmenuInner}>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={styles.mobileSublink}
                            onClick={handleLinkClick}
                          >
                            <div className={styles.mobileSublinkContent}>
                              <span className={styles.mobileSublinkLabel}>{child.label}</span>
                              {child.description && (
                                <span className={styles.mobileSublinkDesc}>{child.description}</span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.mobileMenuFooter}>
          <Link href="/contact" onClick={handleLinkClick} className={styles.btnMobileCta}>
            무료 상담 신청하기
          </Link>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation Bar */}
      <div className={clsx(styles.bottomNav, !showBottomNav && styles.hide)}>
        <Link href="/" className={clsx(styles.bottomNavItem, pathname === '/' && styles.active)} onClick={handleLinkClick}>
          <Home size={22} />
          <span>홈</span>
        </Link>
        <button 
          className={clsx(styles.bottomNavItem, isOpen && styles.active)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <LayoutGrid size={22} />
          <span>전체메뉴</span>
        </button>
        <Link href="/services/" className={clsx(styles.bottomNavItem, pathname.startsWith('/services') && styles.active)}>
          <Box size={22} />
          <span>솔루션</span>
        </Link>
        <Link href="/contact" className={clsx(styles.bottomNavItem, pathname === '/contact' && styles.active)}>
          <MessageCircle size={22} />
          <span>문의</span>
        </Link>
        <Link href="/about" className={clsx(styles.bottomNavItem, pathname.startsWith('/about') && styles.active)} onClick={handleLinkClick}>
          <Info size={22} />
          <span>회사소개</span>
        </Link>
      </div>
    </>
  );
}
