"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo mb-4">
              <span className="logo-wow">WOW</span>
              <span className="logo-databiz">DataBiz</span>
            </div>
            <p>스마트상점 기술보급사업 공식 공급기업</p>
            <p className="copyright">© 2026 WoW Data Biz. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>서비스</h4>
              <Link href="/services/retail">재고/매출 관리</Link>
              <Link href="/services/academy">아카데미 관리</Link>
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
        
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
        }
        
        .logo-wow {
            color: white;
        }
        
        .logo-databiz {
            background: rgba(37, 99, 235, 0.3);
            color: #93C5FD;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 1.3rem;
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
