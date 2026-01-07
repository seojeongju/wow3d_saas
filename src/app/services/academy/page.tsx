"use client";

import PricingTable from '@/components/PricingTable';
import { Users, ShieldCheck, BarChart3, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './academy.module.css';

export default function AcademyServicePage() {
  return (
    <div className={styles.academyPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.badge}>
                <span>Education Tech</span>
              </div>
              <h1 className={styles.heroTitle}>NCS On-Track (온트랙)</h1>
              <p className={styles.heroSubtitle}>스마트 아카데미 매니지먼트</p>
              <p className={styles.heroDesc}>
                학원, 교습소, 교육 기업을 위한 올인원 LMS.<br />
                NCS 학사 관리부터 비대면 온라인 시험(CBT)까지 한 번에.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.btnPrimary}>
                  무료 상담 신청 <ArrowRight size={18} />
                </Link>
                <a 
                  href="https://3dcookiehd.pages.dev/login" 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.btnSecondary}
                >
                  데모보기
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/lms-dashboard.png" alt="NCS On-Track Dashboard" className={styles.heroImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Users size={40} />
              </div>
              <h3>학사/출결 통합</h3>
              <p>학생 등하원 자동 알림 및 반 배치, 강사 스케줄링을 쉽고 편리하게.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <ShieldCheck size={40} />
              </div>
              <h3>CBT 문제은행</h3>
              <p>기출문제 기반의 온라인 시험 시스템으로 성적 관리 효율을 극대화합니다.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <BarChart3 size={40} />
              </div>
              <h3>AI 성취도 분석</h3>
              <p>데이터 기반의 학습 리포트를 생성하여 학부모 상담의 신뢰도를 높입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Image */}
      <section className={styles.dashboardSection}>
        <div className="container">
          <div className={styles.dashboardWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/lms-dashboard.png" alt="NCS On-Track Dashboard" className={styles.dashboardImg} />
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className={styles.detailSection}>
        <div className="container">
          
          {/* Feature 1: Academic Management */}
          <div className={styles.detailRow}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>01 Academic Management</span>
              <h2 className={styles.detailTitle}>
                NCS On-Track으로<br />학사 운영 자동화
              </h2>
              <p className={styles.detailDesc}>
                복잡한 행정 업무는 시스템에 맡기고 교육에만 집중하세요.
                <strong>NCS On-Track (온트랙)</strong>은 국가직무능력표준(NCS) 커리큘럼 설계를 완벽하게 지원합니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>스마트 출결:</strong> QR/비콘/지문인식 연동 및 학부모 안심 문자 발송</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>강의실 배정:</strong> 시각적인 타임라인 뷰로 빈 강의실과 강사 스케줄 관리</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/lms-dashboard.png" alt="Academic Management" className={styles.detailImg} />
            </div>
          </div>

          {/* Feature 2: CBT System */}
          <div className={`${styles.detailRow} ${styles.detailRowReverse}`}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>02 CBT System</span>
              <h2 className={styles.detailTitle}>온라인 문제은행 & 평가</h2>
              <p className={styles.detailDesc}>
                수만 개의 문제 DB를 활용해 3분 만에 시험지를 만들고,
                자동 채점과 오답 노트를 제공합니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>시험지 마법사:</strong> 단원/난이도/유형별 문제 자동 추출 및 랜덤 섞기</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>실전 모의고사:</strong> 실제 시험 환경과 동일한 타이머 및 UI 제공</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cbt-exam.png" alt="CBT System" className={styles.detailImg} />
            </div>
          </div>

          {/* Feature 3: Analytics Report */}
          <div className={styles.detailRow}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>03 Analytics Report</span>
              <h2 className={styles.detailTitle}>데이터로 증명하는 성적 향상</h2>
              <p className={styles.detailDesc}>
                감에 의존하는 상담은 이제 그만.
                객관적인 데이터와 추이 그래프로 학생의 강점과 약점을 분석합니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>종합 리포트:</strong> 출석률, 과제 수행도, 시험 성적을 한 장의 리포트로 생성</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>모바일 연동:</strong> 학부모 앱으로 리포트 즉시 전송 및 확인</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/student-report.png" alt="Analytics Report" className={styles.detailImg} />
            </div>
          </div>

          {/* Education Block */}
          <div className={styles.educationBlock}>
            <div className={styles.educationIcon}>
              <GraduationCap size={48} />
            </div>
            <h2 className={styles.educationTitle}>NCS 기반 체계적인 교육 관리</h2>
            <p className={styles.educationDesc}>
              국가직무능력표준(NCS) 커리큘럼 설계를 완벽하게 지원하고,<br />
              학생 개인별 학습 경로를 추적하여 맞춤형 교육을 실현하세요.
            </p>
            <div className={styles.educationTags}>
              <span className={styles.tag}>NCS 커리큘럼</span>
              <span className={styles.tag}>학습 경로 추적</span>
              <span className={styles.tag}>맞춤형 교육</span>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <div className="container">
          <PricingTable serviceName="NCS On-Track (온트랙)" />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>NCS On-Track (온트랙)으로 스마트한 학원 운영 시작</h2>
            <p className={styles.ctaDesc}>지금 바로 도입 상담을 신청하고 무료 체험 혜택을 받으세요.</p>
            <Link href="/contact" className={styles.ctaButton}>
              도입 상담 신청하기 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
