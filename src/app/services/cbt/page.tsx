"use client";

import Link from "next/link";
import PricingTable from "@/components/PricingTable";
import { Timer, BookOpen, LineChart, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import styles from "./cbt.module.css";

export default function WowCbtServicePage() {
  return (
    <div className={styles.cbtPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.badge}>
                <span>Exam & Certification</span>
              </div>
              <h1 className={styles.heroTitle}>WOW-CBT (와우CBT)</h1>
              <p className={styles.heroSubtitle}>실전 모의고사 & 문제은행 시스템</p>
              <p className={styles.heroDesc}>
                실전처럼 연습하고 한 번에 합격할 수 있도록, 실제 시험 환경을 그대로 구현한 CBT 모의고사 시스템입니다.<br />
                시험지 자동 생성, 즉시 채점, 오답 노트까지.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.btnPrimary}>
                  무료 상담 신청 <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wow-cbt-webmain.pages.dev/"
                  className={styles.btnSecondary}
                  target="_blank"
                  rel="noreferrer"
                >
                  데모 보기
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cbt-exam.png" alt="WOW-CBT 모의고사 화면" className={styles.heroImg} />
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
                <Timer size={40} />
              </div>
              <h3>실전 모의고사</h3>
              <p>실제 시험처럼 타이머·문항 이동·마킹 흐름을 그대로 제공해 긴장감 있는 실전 대비가 가능합니다.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <BookOpen size={40} />
              </div>
              <h3>오답 노트</h3>
              <p>틀린 문제는 자동 저장되고, 유형/단원별로 묶어서 복습할 수 있어 반복 학습 효율이 크게 올라갑니다.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <LineChart size={40} />
              </div>
              <h3>취약 유형 분석</h3>
              <p>점수만 보지 않습니다. 자주 틀리는 유형을 분석해 개선 포인트를 명확하게 제시합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Image */}
      <section className={styles.dashboardSection}>
        <div className="container">
          <div className={styles.dashboardWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cbt-exam.png" alt="WOW-CBT 모의고사" className={styles.dashboardImg} />
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className={styles.detailSection}>
        <div className="container">
          
          {/* Feature 1: Question Bank */}
          <div className={styles.detailRow}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>01 Question Bank</span>
              <h2 className={styles.detailTitle}>
                문제은행 & 시험지<br />자동 생성
              </h2>
              <p className={styles.detailDesc}>
                단원/난이도/유형 기준으로 문제를 선택하고, 랜덤 섞기와 배점 설정까지 한 번에.
                운영자는 시험지를 빠르게 만들고, 학습자는 다양한 조합으로 반복 훈련합니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>문제 데이터 구조:</strong> 문제/해설/정답(객관식·단답형 등) 데이터 구조 지원</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>출제 비중 설정:</strong> 단원별·난이도별 출제 비중 설정 및 랜덤 출제</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>시험지 템플릿:</strong> 회차별 시험지 템플릿 구성(모의고사/단원평가/실전시험)</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cbt-exam.png" alt="문제은행/시험지 생성" className={styles.detailImg} />
            </div>
          </div>

          {/* Feature 2: Grading & Review */}
          <div className={`${styles.detailRow} ${styles.detailRowReverse}`}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>02 Grading & Review</span>
              <h2 className={styles.detailTitle}>즉시 채점 & 오답 복습 루프</h2>
              <p className={styles.detailDesc}>
                시험 종료 즉시 채점 결과가 제공되고, 오답 노트로 바로 복습이 이어집니다.
                학습 흐름이 끊기지 않도록 "시험 → 분석 → 복습" 루프를 설계했습니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>자동 채점:</strong> 자동 채점 및 문항별 정답률/소요시간 확인</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>오답 재학습:</strong> 오답 유형별 재학습(유사 유형 추천/반복 풀이 흐름)</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>학습 리포트:</strong> 개인별 학습 리포트로 목표 점수까지의 경로 제시</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/student-report.png" alt="채점/리포트 화면" className={styles.detailImg} />
            </div>
          </div>

          {/* Feature 3: Operation Options */}
          <div className={styles.detailRow}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>03 Operation Options</span>
              <h2 className={styles.detailTitle}>기관/기업 운영을 위한 구축 옵션</h2>
              <p className={styles.detailDesc}>
                교육기관, 기업 교육, 시험 운영 환경에 맞춰 설치형(온프라미스)과 보안 옵션을
                함께 제안합니다. 운영 안정성과 접근 제어를 최우선으로 설계합니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>접근 제어:</strong> 계정/권한(관리자·강사·학습자) 기반 접근 제어</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>보안 정책:</strong> 시험 보안 정책 옵션(접속 제한/세션 관리 등)</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>온프라미스:</strong> 설치형(온프라미스) 구축 및 커스터마이징 지원</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/lms-dashboard.png" alt="운영/관리 대시보드" className={styles.detailImg} />
            </div>
          </div>

          {/* Security Block */}
          <div className={styles.securityBlock}>
            <div className={styles.securityIcon}>
              <ShieldCheck size={48} />
            </div>
            <h2 className={styles.securityTitle}>안전하고 신뢰할 수 있는 시험 시스템</h2>
            <p className={styles.securityDesc}>
              교육기관과 기업 환경에 맞춘 보안 옵션을 제공하고,<br />
              설치형(온프라미스) 구축으로 데이터 보안을 완벽하게 관리하세요.
            </p>
            <div className={styles.securityTags}>
              <span className={styles.tag}>접근 제어</span>
              <span className={styles.tag}>데이터 보안</span>
              <span className={styles.tag}>온프라미스 구축</span>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <div className="container">
          <PricingTable serviceName="WOW-CBT (와우CBT)" />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>WOW-CBT로 시험 운영과 학습 효율을 동시에</h2>
            <p className={styles.ctaDesc}>운영 환경(학원/기관/기업/자격증 대비)에 맞춰 데모와 도입 방안을 제안해 드립니다.</p>
            <Link href="/contact" className={styles.ctaButton}>
              무료 상담 신청하기 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
