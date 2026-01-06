"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

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
      <nav className={clsx('navbar', scrolled && 'scrolled', isOpen && 'menu-open')}>
        <div className="container nav-container">
          <Link href="/" className="logo-link" onClick={handleLinkClick}>
            <div className={clsx("brand-logo", (scrolled || isOpen) ? "scrolled" : "")}>
              <span className="logo-wow">WOW</span>
              <span className="logo-databiz">DataBiz</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {navLinks.map((link) => (
              <div key={link.href} className="nav-item-group relative">
                <Link
                  href={link.href}
                  className={clsx(
                    'nav-link flex items-center gap-1',
                    pathname.startsWith(link.href) && link.href !== '/' && 'active'
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="chevron transition-transform" />}
                </Link>

                {/* Desktop Dropdown Menu */}
                {link.children && (
                  <div className="dropdown-menu">
                    <div className="dropdown-panel">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="dropdown-item"
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
          <div className="desktop-actions">
            <Link href="/contact" className={clsx("btn-nav-cta", scrolled ? "btn-solid" : "btn-glass")}>
              무료 상담 신청 <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={clsx("mobile-toggle", (scrolled || isOpen) ? "text-slate-900" : "text-white")}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={clsx('mobile-menu-overlay', isOpen && 'open')}>
        <div className="mobile-menu-container">
          {navLinks.map((link) => (
            <div key={link.href} className="mobile-nav-group">
              <div className="mobile-link-wrapper">
                <Link
                  href={link.children ? '#' : link.href}
                  className={clsx('mobile-link', pathname === link.href && 'active')}
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
                    className="mobile-dropdown-trigger"
                  >
                    <ChevronDown size={20} className={clsx('transition-transform', dropdownOpen === link.href && 'rotate-180')} />
                  </button>
                )}
              </div>

              {/* Mobile Submenu */}
              {link.children && (
                <div className={clsx('mobile-submenu', dropdownOpen === link.href ? 'open' : '')}>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="mobile-sublink"
                      onClick={handleLinkClick}
                    >
                      - {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-cta-container">
            <Link href="/contact" onClick={handleLinkClick} className="btn-mobile-cta">
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 80px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .navbar.scrolled, .navbar.menu-open {
          height: 70px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .nav-container {
          height: 100%;
          transition: height 0.3s ease;
        }

        /* Logo Styling */
        .brand-logo {
             display: flex;
             align-items: center;
             gap: 0.5rem;
             font-weight: 800;
             font-size: 1.5rem;
             letter-spacing: -0.5px;
        }
        
        .logo-wow {
            color: white;
            transition: color 0.3s ease;
        }
        
        .logo-databiz {
            background: white;
            color: #2563EB;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 1.3rem;
            transition: all 0.3s ease;
        }
        
        .brand-logo.scrolled .logo-wow {
            color: #0F172A;
        }
        
        .brand-logo.scrolled .logo-databiz {
            background: #2563EB;
            color: white;
        }

        /* Desktop Menu */
        .desktop-menu {
          display: none;
        }
        
        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.2s;
          padding: 0.5rem 1rem;
          position: relative;
          color: rgba(255,255,255,0.95);
        }
        .nav-link:hover {
          color: white;
        }

        /* Scrolled State */
        .navbar.scrolled .nav-link,
        .navbar.menu-open .nav-link {
          color: #475569;
        }
        .navbar.scrolled .nav-link:hover,
        .navbar.menu-open .nav-link:hover {
          color: var(--primary-color);
        }

        .nav-link.active {
          font-weight: 700;
          color: white !important;
        }
        .navbar.scrolled .nav-link.active {
          color: var(--accent-color) !important;
        }

        /* Dropdown Logic - Fixed Hover */
        .nav-item-group {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          padding-top: 5px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          pointer-events: none;
        }
        
        .nav-item-group:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        
        .nav-item-group:hover .chevron {
            transform: rotate(180deg);
        }
        
        .dropdown-panel {
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
          border: 1px solid #f1f5f9;
          overflow: hidden;
          min-width: 240px;
          padding: 0.5rem;
        }

        .dropdown-item {
          display: block;
          padding: 0.75rem 1rem;
          color: #475569;
          font-size: 0.9rem;
          border-radius: 6px;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .dropdown-item:hover {
          background: #f1f5f9;
          color: var(--accent-color);
        }

        /* Buttons & Actions */
        .desktop-actions {
          display: none;
        }
        .btn-nav-cta {
          padding: 0.6rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .btn-glass {
           background: rgba(255,255,255,0.15);
           border: 1px solid rgba(255,255,255,0.3);
           color: white;
           backdrop-filter: blur(4px);
        }
        .btn-glass:hover {
           background: white;
           color: var(--primary-color);
        }

        .btn-solid {
           background: var(--primary-color);
           color: white;
        }
        .btn-solid:hover {
           background: var(--primary-light);
           transform: translateY(-1px);
        }
        
        /* Mobile Toggle */
        .mobile-toggle {
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
        }

        /* Mobile Menu */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: white;
          z-index: 1000;
          transform: translateY(-100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          padding-top: 80px;
          overflow-y: auto;
        }
        .mobile-menu-overlay.open {
          transform: translateY(0);
        }
        .mobile-menu-container {
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .mobile-nav-group {
          border-bottom: 1px solid #f1f5f9;
        }
        .mobile-link-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-link {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary-color);
          padding: 1.25rem 0;
          flex: 1;
        }
        .mobile-link.active {
          color: var(--accent-color);
        }
        .mobile-dropdown-trigger {
          background: none;
          border: none;
          padding: 1rem;
          color: #94a3b8;
        }
        .mobile-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #f8fafc;
          border-radius: 8px;
        }
        .mobile-submenu.open {
          max-height: 300px;
          margin-bottom: 1rem;
        }
        .mobile-sublink {
            display: block;
            padding: 0.75rem 1.5rem;
            color: #475569;
            font-size: 0.95rem;
        }
        .mobile-sublink:hover {
            color: var(--accent-color);
        }
        .btn-mobile-cta {
          display: block;
          width: 100%;
          text-align: center;
          padding: 1rem;
          background: var(--accent-cta);
          color: white;
          border-radius: 12px;
          font-weight: 700;
          margin-top: 2rem;
        }

        @media (min-width: 900px) {
          .desktop-menu { display: flex; }
          .desktop-actions { display: block; }
          .mobile-toggle { display: none; }
        }
      `}</style>
    </>
  );
}
