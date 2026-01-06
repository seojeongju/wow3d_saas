"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/services', label: '서비스 소개' },
    { href: '/pricing', label: '도입 안내' },
    { href: '/about', label: '회사 소개' },
    { href: '/contact', label: '문의하기' },
  ];

  return (
    <>
      <nav className={clsx('navbar', scrolled && 'scrolled', isOpen && 'menu-open')}>
        <div className="container nav-container">
          <Link href="/" className="logo">
            WoW<span className="logo-accent">DataBiz</span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx('nav-link', pathname === link.href && 'active')}
              >
                {link.label}
              </Link>
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
            <Link
              key={link.href}
              href={link.href}
              className={clsx('mobile-link', pathname === link.href && 'active')}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
              <ChevronRight size={16} className="mobile-chevron" />
            </Link>
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

        .logo {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--primary-color); /* Need to ensure visibility on dark hero if initial state is transparent */
          letter-spacing: -0.5px;
          z-index: 1001;
          position: relative;
        }
        
        .logo-accent {
          color: var(--accent-color);
        }

        /* Adjust logo color for transparent header on dark hero? 
           For now, assumed hero text is white, but logo in PRD was dark. 
           Let's keep logo dark or make it adaptive. 
           Simple fix: Scrolled -> Dark Text, Top/Transparent -> White Text IF Hero is dark.
           But current Hero is dark. Let's make logo text white initially if transparent?
           Actually, let's stick to safe 'white background on scroll' and 'transparent on top'.
           If hero is dark, text needs to be white initially.
        */
        
        /* Adaptive Theme Logic for Logo & Links */
        .navbar:not(.scrolled):not(.menu-open) .logo {
           color: white; 
        }
        .navbar:not(.scrolled):not(.menu-open) .nav-link {
           color: rgba(255,255,255,0.8);
        }
        .navbar:not(.scrolled):not(.menu-open) .nav-link:hover {
           color: white;
        }
        .navbar:not(.scrolled):not(.menu-open) .mobile-toggle {
           color: white;
        }

        .navbar.scrolled .logo,
        .navbar.menu-open .logo {
          color: var(--primary-color);
        }
        
        /* Desktop Menu */
        .desktop-menu {
          display: none;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-main);
          font-size: 0.95rem;
          transition: all 0.2s;
          position: relative;
        }
        
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
          font-size: 1.5rem;
          font-weight: 600;
          padding: 1.2rem 0;
          border-bottom: 1px solid #f1f5f9;
          color: var(--primary-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mobile-chevron {
          color: #cbd5e1;
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
