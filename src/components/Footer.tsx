"use client";
import Link from "next/link"; // Added Link import just incase but using <a> in this file based on previous read. 
// Actually previous read used <a> tags? Let's check. Yes `<a>`. But usually Link is better in Next.js.
// I'll stick to <a> if that's what was there, or upgrade to Link. Let's upgrade to Link for consistency.

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-container mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="WoW Data Biz" className="footer-logo-img" />
            </div>
            {/* <h3>WoW Data Biz</h3> Removed text header since using logo */}
            <p>스마트상점 기술보급사업 공식 공급기업</p>
            <p className="copyright">© 2026 WoW Data Biz. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>서비스</h4>
              <Link href="/services">재고/매출 관리</Link>
              <Link href="/services">아카데미 관리</Link>
            </div>
            <div className="link-group">
              <h4>고객지원</h4>
              <Link href="/contact">문의하기</Link>
              <Link href="/pricing">자주 묻는 질문</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--primary-color);
          color: #fff;
          padding: 4rem 0 2rem;
          margin-top: auto;
        }
        .footer-content {
          display: grid;
          gap: 3rem;
        }
        
        .footer-logo-container {
          display: inline-block;
        }
        .footer-logo-img {
          height: 48px;
          filter: brightness(0) invert(1); /* Make logo white for dark footer */
          opacity: 0.9;
        }

        .footer-brand h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .footer-brand p {
          color: #94A3B8;
          font-size: 0.9rem;
        }
        .copyright {
          margin-top: 2rem;
          font-size: 0.8rem;
          opacity: 0.6;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .link-group h4 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        .link-group a {
          display: block;
          color: #94A3B8;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          text-decoration: none;
        }
        .link-group a:hover {
          color: #fff;
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr 2fr;
          }
          .footer-links {
            justify-self: end;
            gap: 4rem;
          }
        }
      `}</style>
    </footer>
  );
}
