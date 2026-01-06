"use client";

import Link from "next/link";
import { Box, Users, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section with Rounded Bottom */}
      <section className="hero">
        <div className="container hero-content">
          <div className="badge">AI 데이터분석 </div>
          <h1>
            데이터로 완성하는<br />
            <span className="highlight">소상공인 디지털 전환</span>
          </h1>
          <p className="hero-desc">
            매출 분석부터 재고, 고객 관리까지. <br className="mobile-only" />
            정부 지원으로 시작하는 가장 확실한 스마트 경영 솔루션, <strong>와우데이터비즈</strong>입니다.
          </p>
          <div className="hero-actions">
            <Link href="/pricing" className="btn btn-cta btn-lg">
              무료 체험하기
            </Link>
            <Link href="/services" className="btn btn-outline-light btn-lg">
              서비스 자세히 보기
            </Link>
          </div>
        </div>
        {/* Curve Separator */}
        <div className="hero-curve">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Services Section - Alternating Layout */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h2 className="section-title">맞춤형 스마트 솔루션</h2>
            <p className="section-subtitle">업종별 특화된 기능을 통해 사장님의 고민을 해결해 드립니다.</p>
          </div>

          <div className="services-list">

            {/* Service 1: Retail/Food */}
            <div className="service-row">
              <div className="service-visual">
                <div className="mockup-window">
                  {/* Placeholder for screenshot */}
                  <div className="mockup-content blue-gradient">
                    <span className="mockup-label">Dashboard UI</span>
                  </div>
                </div>
              </div>
              <div className="service-content">
                <div className="icon-wrapper blue">
                  <Box size={32} />
                </div>
                <h3>스마트 재고/매출 관리 팩</h3>
                <p className="service-desc">
                  도소매업, 요식업 사장님을 위한 재고/발주 및 매출 심층 분석 솔루션입니다.
                  복잡한 재고 수불부 작성, 이제 자동으로 해결하세요.
                </p>
                <ul className="feature-list">
                  <li><CheckCircle2 size={20} /> 실시간 재고 & 자동 발주 시스템</li>
                  <li><CheckCircle2 size={20} /> AI 기반 일별/월별 매출 트렌드 예측</li>
                  <li><CheckCircle2 size={20} /> 발주서 관리 및 배송 트랙킹까지 한눈에 OK</li>
                </ul>
                <Link href="/services" className="btn btn-outline">
                  자세히 보기 <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Service 2: Education */}
            <div className="service-row reverse">
              <div className="service-visual">
                <div className="mockup-window">
                  {/* Placeholder for screenshot */}
                  <div className="mockup-content indigo-gradient">
                    <span className="mockup-label">LMS / CBT System</span>
                  </div>
                </div>
              </div>
              <div className="service-content">
                <div className="icon-wrapper indigo">
                  <Users size={32} />
                </div>
                <h3>스마트 아카데미 매니지먼트</h3>
                <p className="service-desc">
                  학원, 교습소, 교육 서비스업을 위한 올인원 에듀테크 솔루션.
                  학생 출결부터 성적, 비대면 학습 관리까지 한 번에 관리하세요.
                </p>
                <ul className="feature-list">
                  <li><CheckCircle2 size={20} /> NCS 기반 학사 관리 및 출결 자동화</li>
                  <li><CheckCircle2 size={20} /> 온라인 CBT 문제은행 & 과제 시스템</li>
                  <li><CheckCircle2 size={20} /> 수강생별 맞춤형 학습 성취도 리포트</li>
                </ul>
                <Link href="/services" className="btn btn-outline">
                  자세히 보기 <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust/Stats Section */}
      <section className="section bg-light stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item card">
              <div className="stat-number text-accent">SaaS</div>
              <h3>월 구독형 서비스</h3>
              <p>초기 구축비 부담 없이<br />합리적인 월 요금으로 시작하세요</p>
            </div>
            <div className="stat-item card">
              <div className="stat-number text-accent">Data</div>
              <h3>빅데이터 분석</h3>
              <p>데이터가 보여주는 인사이트로<br />경영 의사결정을 똑똑하게</p>
            </div>
            <div className="stat-item card">
              <div className="stat-number text-accent">2년</div>
              <h3>정부 지원 혜택</h3>
              <p>소상공인 기술보급사업을 통해<br />최대 2년까지 국비 지원 가능</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="floating-cta">
        <Link href="/contact" className="cta-button">
          <MessageCircle size={28} />
          <span className="tooltip">문의하기</span>
        </Link>
      </div>

      <style jsx>{`
        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          color: white;
          padding-top: 8rem;
          padding-bottom: 0;
          position: relative;
          text-align: center;
          overflow: hidden;
        }
        .hero-content {
          padding-bottom: 10rem; /* Space for curve */
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          position: relative;
        }
        .hero-curve {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          line-height: 0;
        }
        .hero-curve svg {
          display: block;
          width: 100%;
          height: 150px;
        }
        .badge {
          background: rgba(255, 255, 255, 0.1);
          color: #60A5FA;
          padding: 0.6rem 1.2rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
        }
        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 2rem;
          letter-spacing: -0.03em;
        }
        .highlight {
          color: transparent;
          background-clip: text;
          background-image: linear-gradient(to right, #60A5FA, #A78BFA);
          -webkit-background-clip: text;
        }
        .hero-desc {
          font-size: 1.25rem;
          color: #CBD5E1;
          max-width: 700px;
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }
        .btn-outline-light {
          border: 2px solid rgba(255,255,255,0.3);
          color: white;
          background: transparent;
        }
        .btn-outline-light:hover {
          background: white;
          color: #0F172A;
          border-color: white;
        }

        /* Service Section */
        .section-header {
           margin-bottom: 5rem;
        }
        .section-subtitle {
          color: var(--text-muted);
          font-size: 1.2rem;
        }
        .services-list {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }
        .service-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .service-row.reverse .service-content {
          order: 2; /* Content first on grid, but visuals first on mobile? handled by media query */
        }
        .service-content {
          text-align: left;
        }
        .icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .icon-wrapper.blue { background: #DBEAFE; color: #2563EB; }
        .icon-wrapper.indigo { background: #E0E7FF; color: #4F46E5; }
        
        .service-content h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-main);
        }
        .service-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .feature-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 1.05rem;
          color: var(--text-main);
        }
        .feature-list li svg { color: var(--accent-cta); }
        
        .mockup-window {
          background: #f1f5f9;
          border-radius: 1rem;
          padding: 1rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .mockup-content {
          height: 300px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
        }
        .blue-gradient { background: linear-gradient(135deg, #3B82F6, #2563EB); }
        .indigo-gradient { background: linear-gradient(135deg, #6366F1, #4F46E5); }
        .mockup-label { opacity: 0.8; }

        /* Stats Section */
        .stats-section {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .stat-item {
          text-align: center;
          padding: 3rem 2rem;
          border: none;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .text-accent { color: var(--accent-cta); }
        .stat-item h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        /* Floating CTA */
        .floating-cta {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 100;
        }
        .cta-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-cta);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(230, 57, 70, 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .cta-button:hover {
          transform: scale(1.1) rotate(5deg);
        }
        .tooltip {
          position: absolute;
          right: 70px;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.875rem;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          white-space: nowrap;
        }
        .cta-button:hover .tooltip {
          opacity: 1;
        }

        /* Utilities */
        .ml-2 { margin-left: 0.5rem; }
        .mobile-only { display: block; }
        .mb-16 { margin-bottom: 4rem; }

        @media (min-width: 900px) {
          h1 { font-size: 4rem; }
          .service-row { grid-template-columns: 1fr 1fr; }
          .stats-grid { grid-template-columns: 1fr 1fr 1fr; }
          .mobile-only { display: none; }
          /* Alternate Order */
          .service-row.reverse .service-content { order: 1; }
          .service-row.reverse .service-visual { order: 2; }
          /* Normal Order */
          .service-row .service-content { order: 2; }
          .service-row .service-visual { order: 1; }
        }
      `}</style>
    </>
  );
}
