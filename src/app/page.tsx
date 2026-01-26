"use client";

import Link from "next/link";
import { Box, Users, ArrowRight, CheckCircle2, MessageCircle, ChevronLeft, ChevronRight, Timer } from "lucide-react";
import clsx from "clsx";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    id: 0,
    badge: "New Service",
    title: "3D프린팅 AI 실시간 견적",
    subtitle: "당신의 상상력을 현실로",
    description: "STL, OBJ, 3MF 파일을 업로드하면 AI가 부피·표면적을 분석해 실시간 견적을 제공합니다. 클릭 한 번으로 시제품부터 양산까지.",
    image: "/images/ai-quote-system.png",
    ctaLink: "/#quote-system",
    gradient: "linear-gradient(135deg, #020617 0%, #1e293b 100%)",
    badgeColor: "rgba(34, 197, 94, 0.25)",
    badgeTextColor: "#4ade80",
    badgeBorder: "rgba(74, 222, 128, 0.4)"
  },
  {
    id: 1,
    badge: "Retail & Food",
    title: "WOW-Smart Manager",
    subtitle: "스마트 재고/매출 관리 팩",
    description: "도소매업, 요식업 사장님을 위한 재고/발주 및 매출 심층 분석 솔루션입니다. 복잡한 재고 수불부 작성, 이제 자동으로 해결하세요.",
    image: "/images/wow-smart-manager-hero.png",
    ctaLink: "/services/retail",
    gradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
    badgeColor: "rgba(37, 99, 235, 0.25)",
    badgeTextColor: "#93C5FD",
    badgeBorder: "rgba(147, 197, 253, 0.4)"
  },
  {
    id: 2,
    badge: "Education Tech",
    title: "NCS On-Track (온트랙)",
    subtitle: "스마트 아카데미 NCS매니지먼트",
    description: "학원, 교육센터터, 교육 서비스업을 위한 올인원 에듀테크 솔루션. NCS 학사 관리부터 비대면 온라인 시험(CBT)까지 한 번에 관리하세요.",
    image: "/images/lms-dashboard.png",
    ctaLink: "/services/academy",
    gradient: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)",
    badgeColor: "rgba(99, 102, 241, 0.25)",
    badgeTextColor: "#C7D2FE",
    badgeBorder: "rgba(199, 210, 254, 0.4)"
  },
  {
    id: 3,
    badge: "Exam & Certification",
    title: "WOW-CBT (와우CBT)",
    subtitle: "실전 모의고사 & 문제은행 시스템",
    description: "실전처럼 연습하고 한 번에 합격할 수 있도록, 실제 시험 환경을 그대로 구현한 CBT 모의고사 시스템입니다. 시험지 자동 생성, 즉시 채점, 오답 노트까지.",
    image: "/images/cbt-exam.png",
    ctaLink: "/services/cbt",
    gradient: "linear-gradient(135deg, #6B21A8 0%, #7C3AED 100%)",
    badgeColor: "rgba(139, 92, 246, 0.25)",
    badgeTextColor: "#DDD6FE",
    badgeBorder: "rgba(221, 214, 254, 0.4)"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 자동 슬라이드 전환
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // 5초마다 전환

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // 10초 후 다시 자동 재생
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <>
      {/* Hero Section with Slider */}
      <section
        className={styles.hero}
        style={{ background: currentSlideData.gradient }}
      >
        <div className={styles.heroSlider}>
          {/* Slide Content */}
          <div className={clsx("container", styles.heroContent)}>
            <div className={styles.heroTextArea}>
              <div
                className={styles.badge}
                style={{
                  background: currentSlideData.badgeColor,
                  color: currentSlideData.badgeTextColor,
                  borderColor: currentSlideData.badgeBorder
                }}
              >
                {currentSlideData.badge}
              </div>
              <h1 className={styles.heroTitle}>
                {currentSlideData.title}
              </h1>
              <p className={styles.heroSubtitle}>
                {currentSlideData.subtitle}
              </p>
              <p className={styles.heroDesc}>
                {currentSlideData.description}
              </p>
              <div className={styles.heroActions}>
                <Link href={currentSlideData.ctaLink} className={clsx("btn", "btn-cta", styles.btnLg)}>
                  자세히 보기
                </Link>
                <Link href="/services" className={clsx("btn", styles.btnOutlineLight, styles.btnLg)}>
                  모든 서비스 보기
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className={styles.heroImageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className={styles.sliderNavButton}
            onClick={prevSlide}
            aria-label="Previous slide"
            style={{ left: '2rem' }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={styles.sliderNavButton}
            onClick={nextSlide}
            aria-label="Next slide"
            style={{ right: '2rem' }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className={styles.sliderIndicators}>
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={clsx(
                  styles.indicator,
                  currentSlide === index && styles.indicatorActive
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Curve Separator */}
        <div className={styles.heroCurve}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Services Section - Alternating Layout */}
      <section className="section bg-white">
        <div className="container">
          <div className={clsx(styles.sectionHeader, "text-center", styles.mb16)}>
            <h2 className="section-title">맞춤형 스마트 솔루션</h2>
            <p className={styles.sectionSubtitle}>업종별 특화된 기능을 통해 사장님의 고민을 해결해 드립니다.</p>
          </div>

          <div className={styles.servicesList}>

            {/* Service 1: Retail/Food */}
            <div className={styles.serviceRow}>
              <div className={styles.serviceVisual}>
                <div className={styles.mockupWindow}>
                  <div className={clsx(styles.mockupContent, styles.blueGradient)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard-hero.png" alt="Retail Dashboard" className={styles.mockupImg} />
                  </div>
                </div>
              </div>
              <div className={styles.serviceContent}>
                <div className={clsx(styles.iconWrapper, styles.iconWrapperBlue)}>
                  <Box size={32} />
                </div>
                <h3>WOW-Smart Manager</h3>
                <p className={styles.serviceSubtitle}>
                  스마트 재고/매출 관리 팩
                </p>
                <p className={styles.serviceDesc}>
                  도소매업, 요식업 사장님을 위한 재고/발주 및 매출 심층 분석 솔루션입니다.
                  복잡한 재고 수불부 작성, 이제 자동으로 해결하세요.
                </p>
                <ul className={styles.featureList}>
                  <li><CheckCircle2 size={20} /> 실시간 재고 & 자동 발주 시스템</li>
                  <li><CheckCircle2 size={20} /> AI 기반 일별/월별 매출 트렌드 예측</li>
                  <li><CheckCircle2 size={20} /> 발주서 관리 및 배송 트랙킹까지 한눈에 OK</li>
                </ul>
                <Link href="/services/retail" className="btn btn-outline">
                  자세히 보기 <ArrowRight size={16} className={styles.ml2} />
                </Link>
              </div>
            </div>

            {/* Service 2: Education */}
            <div className={clsx(styles.serviceRow, styles.serviceRowReverse)}>
              <div className={styles.serviceVisual}>
                <div className={styles.mockupWindow}>
                  <div className={clsx(styles.mockupContent, styles.indigoGradient)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/lms-dashboard.png" alt="Education Dashboard" className={styles.mockupImg} />
                  </div>
                </div>
              </div>
              <div className={styles.serviceContent}>
                <div className={clsx(styles.iconWrapper, styles.iconWrapperIndigo)}>
                  <Users size={32} />
                </div>
                <h3>NCS On-Track (온트랙)</h3>
                <p className={styles.serviceSubtitle}>
                  스마트 아카데미 매니지먼트
                </p>
                <p className={styles.serviceDesc}>
                  학원, 교습소, 교육 서비스업을 위한 올인원 에듀테크 솔루션.
                  학생 출결부터 성적, 비대면 학습 관리까지 한 번에 관리하세요.
                </p>
                <ul className={styles.featureList}>
                  <li><CheckCircle2 size={20} /> NCS 기반 학사 관리 및 출결 자동화</li>
                  <li><CheckCircle2 size={20} /> 온라인 CBT 문제은행 & 과제 시스템</li>
                  <li><CheckCircle2 size={20} /> 수강생별 맞춤형 학습 성취도 리포트</li>
                </ul>
                <Link href="/services/academy" className="btn btn-outline">
                  자세히 보기 <ArrowRight size={16} className={styles.ml2} />
                </Link>
              </div>
            </div>

            {/* Service 3: WOW-CBT */}
            <div className={styles.serviceRow}>
              <div className={styles.serviceVisual}>
                <div className={styles.mockupWindow}>
                  <div className={clsx(styles.mockupContent, styles.purpleGradient)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/cbt-exam.png" alt="WOW-CBT 모의고사" className={styles.mockupImg} />
                  </div>
                </div>
              </div>
              <div className={styles.serviceContent}>
                <div className={clsx(styles.iconWrapper, styles.iconWrapperPurple)}>
                  <Timer size={32} />
                </div>
                <h3>WOW-CBT (와우CBT)</h3>
                <p className={styles.serviceSubtitle}>
                  실전 모의고사 & 문제은행 시스템
                </p>
                <p className={styles.serviceDesc}>
                  실전처럼 연습하고 한 번에 합격할 수 있도록, 실제 시험 환경을 그대로 구현한 CBT 모의고사 시스템입니다.
                  시험지 자동 생성, 즉시 채점, 오답 노트까지 한 곳에서 관리하세요.
                </p>
                <ul className={styles.featureList}>
                  <li><CheckCircle2 size={20} /> 실전 모의고사 시스템 (타이머·문항 이동·마킹)</li>
                  <li><CheckCircle2 size={20} /> 자동 출제 & 즉시 채점 시스템</li>
                  <li><CheckCircle2 size={20} /> 오답 노트 & 취약 유형 분석</li>
                </ul>
                <Link href="/services/cbt" className="btn btn-outline">
                  자세히 보기 <ArrowRight size={16} className={styles.ml2} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust/Stats Section */}
      <section className={clsx("section", "bg-light", styles.statsSection)}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={clsx(styles.statItem, "card")}>
              <div className={clsx(styles.statNumber, styles.textAccent)}>SaaS</div>
              <h3>월 구독형 서비스</h3>
              <p>초기 구축비 부담 없이<br />합리적인 월 요금으로 시작하세요</p>
            </div>
            <div className={clsx(styles.statItem, "card")}>
              <div className={clsx(styles.statNumber, styles.textAccent)}>Data</div>
              <h3>빅데이터 분석</h3>
              <p>데이터가 보여주는 인사이트로<br />경영 의사결정을 똑똑하게</p>
            </div>
            <div className={clsx(styles.statItem, "card")}>
              <div className={clsx(styles.statNumber, styles.textAccent)}>24/7</div>
              <h3>실시간 모니터링</h3>
              <p>언제 어디서나 접속하여<br />비즈니스 현황을 실시간으로 확인</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className={styles.floatingCta}>
        <Link href="/contact" className={styles.ctaButton}>
          <MessageCircle size={28} />
          <span className={styles.tooltip}>문의하기</span>
        </Link>
      </div>
    </>
  );
}
