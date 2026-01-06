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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { href: '/', label: '홈' },
    {
      href: '/services',
      label: '서비스 소개',
      children: [
        { href: '/services/retail', label: '스마트 재고/매출 관리 팩' },
        { href: '/services/academy', label: '스마트 아카데미 매니지먼트' },
      ]
    },
    { href: '/pricing', label: '도입 안내' },
    { href: '/about', label: '회사 소개' },
    { href: '/contact', label: '문의하기' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setDropdownOpen(null);
  };

  return (
    <>
      <nav className={clsx(styles.navbar, scrolled && styles.scrolled, isOpen && styles.menuOpen)}>
        <div className={clsx("container", styles.navContainer)}>
          <Link href="/" className={styles.logoLink} onClick={handleLinkClick}>
            <div className={clsx(styles.brandLogo, (scrolled || isOpen) && styles.scrolled)}>
              <span className={styles.logoWow}>WOW</span>
              <span className={styles.logoDatabiz}>DataBiz</span>
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
            <Link href="/contact" className={clsx(styles.btnNavCta, scrolled ? styles.btnSolid : styles.btnGlass)}>
              무료 상담 신청 <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={clsx(styles.mobileToggle, (scrolled || isOpen) && styles.dark)}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={clsx(styles.mobileMenuOverlay, isOpen && styles.open)}>
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
