"use client";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>WoW Data Biz</h3>
            <p>스마트상점 기술보급사업 공식 공급기업</p>
            <p className="copyright">© 2026 WoW Data Biz. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>서비스</h4>
              <a href="/services">재고/매출 관리</a>
              <a href="/services">아카데미 관리</a>
            </div>
            <div className="link-group">
              <h4>고객지원</h4>
              <a href="/contact">문의하기</a>
              <a href="/pricing">자주 묻는 질문</a>
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
