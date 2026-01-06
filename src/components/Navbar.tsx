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
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // For mobile mostly, or desktop click
  const pathname = usePathname();

  // Scroll effect for navbar
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

  return (
    <>
      <nav className={clsx('navbar', scrolled && 'scrolled', isOpen && 'menu-open')}>
        <div className="container nav-container">
          <Link href="/" className="logo-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="WoW Data Biz" className="logo-img" />
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {navLinks.map((link) => (
              <div key={link.href} className="nav-item-group relative group">
                <Link
                  href={link.href}
                  className={clsx('nav-link flex items-center gap-1', pathname.startsWith(link.href) && link.href !== '/' && 'active')}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Dropdown Menu */}
                {link.children && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 min-w-[240px]">
                    <div className="bg-white rounded-lg shadow-xl border border-slate-100 p-2 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
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

          {/* New Modern Feature: Desktop CTA */}
          <div className="desktop-actions">
            <Link href="/contact" className="btn-nav-cta">
              무료 상담 신청 <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
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
            <div key={link.href} className="mobile-nav-group border-b border-slate-100">
              <div className="flex justify-between items-center w-full">
                <Link
                  href={link.children ? '#' : link.href} // If dropdown, prevent click or make it toggle? Let's toggle.
                  className={clsx('mobile-link flex-1', pathname === link.href && 'active')}
                  onClick={(e) => {
                    if (link.children) {
                      e.preventDefault();
                      setDropdownOpen(dropdownOpen === link.href ? null : link.href);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === link.href ? null : link.href)}
                    className="p-4"
                  >
                    <ChevronDown size={18} className={clsx('transition-transform', dropdownOpen === link.href && 'rotate-180')} />
                  </button>
                )}
              </div>

              {/* Mobile Submenu */}
              {link.children && (
                <div className={clsx('mobile-submenu bg-slate-50', dropdownOpen === link.href ? 'block' : 'hidden')}>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-3 text-slate-600 text-sm border-l-2 border-transparent hover:border-blue-500 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-cta-container">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-mobile-cta">
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

        .navbar.scrolled {
          height: 70px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .nav-container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-link {
          display: flex;
          align-items: center;
          z-index: 1001;
        }

        .logo-img {
          height: 48px; /* Adjust based on logo aspect ratio */
          width: auto;
          object-fit: contain;
        }
        
        /* Desktop Menu */
        .desktop-menu {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        
        .nav-item-group {
          position: relative;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-main);
          font-size: 0.95rem;
          transition: all 0.2s;
          position: relative;
          cursor: pointer;
        }
        
        /* Underline effect */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--accent-cta);
          transition: width 0.2s ease;
          border-radius: 2px;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          font-weight: 700;
          color: var(--accent-color);
        }
        
        /* Adaptive Theme Logic for Links */
        .navbar:not(.scrolled):not(.menu-open) .nav-link {
           color: rgba(255,255,255,0.9);
        }
        .navbar:not(.scrolled):not(.menu-open) .nav-link:hover {
           color: white;
        }
        .navbar:not(.scrolled):not(.menu-open) .mobile-toggle {
           color: white;
        }


        /* Desktop Actions */
        .desktop-actions {
          display: none;
        }
        .btn-nav-cta {
          padding: 0.6rem 1.2rem;
          background: var(--primary-color);
          color: white;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        .btn-nav-cta:hover {
          background: var(--primary-light);
          transform: translateY(-1px);
        }
        /* Special case: When top transparent, make CTA distinct */
        .navbar:not(.scrolled) .btn-nav-cta {
           background: rgba(255,255,255,0.15);
           backdrop-filter: blur(4px);
           border: 1px solid rgba(255,255,255,0.3);
           color: white;
        }
        .navbar:not(.scrolled) .btn-nav-cta:hover {
           background: white;
           color: var(--primary-color);
        }


        /* Mobile Toggle */
        .mobile-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-main);
          z-index: 1001;
          position: relative;
        }

        /* Mobile Menu Overlay w/ Backdrop Blur */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          z-index: 1000;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          padding-top: 100px;
          opacity: 0;
        }

        .mobile-menu-overlay.open {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu-container {
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
        }

        .mobile-link {
          font-size: 1.2rem;
          font-weight: 600;
          padding: 1.2rem 0;
          color: var(--primary-color);
        }
        .mobile-chevron {
          color: #cbd5e1;
        }
        
        .mobile-submenu {
          padding-left: 0.5rem;
        }

        .mobile-cta-container {
          margin-top: 2rem;
        }
        .btn-mobile-cta {
          display: block;
          width: 100%;
          padding: 1.2rem;
          background: var(--accent-cta);
          color: white;
          text-align: center;
          font-weight: 700;
          border-radius: 12px;
          font-size: 1.1rem;
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
