"use client";
import PricingTable from '@/components/PricingTable';
import { Box, Users, BarChart3, Cloud, ShieldCheck, Timer, BookOpen, LineChart } from 'lucide-react';
import Link from 'next/link';
import styles from './services.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      {/* Services Header */}
      <section className={styles.bgGradient}>
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">서비스 소개</h1>
          <p className="text-xl opacity-90">소상공인부터 기업까지, 데이터 기반의 스마트한 경영 관리</p>
        </div>
      </section>

      {/* Retail / Food Section - Smart Inventory/Sales Management Pack */}
      <section className={styles.serviceDetailSection} id="retail">
        <div className="container">

          {/* Section Hero */}
          <div className={styles.sectionIntro}>
            <span className={styles.sectionLabel}>Retail & Food</span>
            <h2 className="text-4xl font-extrabold mb-2 text-slate-900">WOW-Smart Manager</h2>
            <p className="text-xl font-semibold mb-6 text-blue-600">스마트 재고/매출 관리 팩</p>
            <p className="intro-text text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              주얼리, 소형 전자제품 등 <strong>재고 관리가 핵심인 판매 업체</strong>를 위한 올인원 ERP.<br />
              복잡한 상품 등록부터 주문 처리, 고객 관리까지 하나의 시스템으로 해결하세요.
            </p>
          </div>

          {/* Hero Image */}
          <div className="hero-image-wrapper mb-20 shadow-2xl rounded-xl overflow-hidden border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard-hero.png" alt="SaaS ERP Dashboard" className="w-full h-auto object-cover" />
          </div>

          {/* Core Features Grid - Introduction */}
          <div className="mb-24">
            <h3 className="text-2xl font-bold text-center mb-10 text-slate-800">한눈에 보는 비즈니스 현황</h3>
            <div className={`${styles.featuresGrid} ${styles.threeCol}`}>
              <div className={styles.featureCard}>
                <BarChart3 size={40} className="text-blue-600 mb-4 mx-auto" />
                <h3>대시보드 & 주요 지표</h3>
                <p>총 매출, 주문 수, 재고 경고 등 비즈니스 핵심 지표를 카드 형태로 한눈에 파악하세요.</p>
              </div>
              <div className={styles.featureCard}>
                <Box size={40} className="text-blue-600 mb-4 mx-auto" />
                <h3>실시간 재고 알림</h3>
                <p>안전 재고 이하로 떨어진 상품을 즉시 확인하고 발주 시기를 놓치지 않도록 돕습니다.</p>
              </div>
              <div className={styles.featureCard}>
                <Cloud size={40} className="text-blue-600 mb-4 mx-auto" />
                <h3>어디서나 접속 가능</h3>
                <p>클라우드 기반 시스템으로 언제 어디서든 PC, 태블릿으로 접속하여 업무를 처리할 수 있습니다.</p>
              </div>
            </div>
          </div>

          <div className={`${styles.divider} mb-24`} />

          {/* Detailed Features - Alternating Rows */}
          <div>

            {/* Feature 1: Product Management */}
            <div className={`${styles.featureRow} mb-24`}>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-blue-600 text-sm font-bold uppercase tracking-wider block mb-2">01 Product Management</span>
                  쉽고 강력한 상품 관리
                </h3>
                <p className={styles.featureDesc}>
                  수천 개의 상품도 문제없습니다. 복잡한 옵션과 카테고리를 체계적으로 정리하세요.
                </p>
                <ul className={styles.featureList}>
                  <li><strong>상품 및 옵션 등록:</strong> 상품명, 가격, SKU는 물론 사이즈/색상 등 변형 옵션까지 상세하게 설정 가능합니다.</li>
                  <li><strong>이미지 관리:</strong> 상품 이미지를 업로드하여 시각적으로 쉽게 구분할 수 있습니다.</li>
                  <li><strong>대량 등록 지원:</strong> 엑셀(CSV) 업로드를 통해 기존 데이터를 한 번에 이관하고 등록할 수 있습니다.</li>
                </ul>
              </div>
              <div className="feature-image shadow-xl rounded-lg overflow-hidden border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/product-mgmt.png" alt="Product Management UI" className="w-full h-auto" />
              </div>
            </div>

            {/* Feature 2: Inventory Management */}
            <div className={`${styles.featureRow} ${styles.reverse} mb-24`}>
              <div className={`${styles.featureImage} shadow-xl rounded-lg overflow-hidden border border-slate-100`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/inventory-mgmt.png" alt="Inventory Management UI" className="w-full h-auto" />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-blue-600 text-sm font-bold uppercase tracking-wider block mb-2">02 Inventory Control</span>
                  빈틈없는 재고 관리
                </h3>
                <p className={styles.featureDesc}>
                  실시간 수량 파악은 기본, 고가 제품을 위한 시리얼 넘버 추적까지 지원합니다.
                </p>
                <ul className={styles.featureList}>
                  <li><strong>실시간 입출고:</strong> 재고의 이동을 실시간으로 기록하고 확인할 수 있습니다.</li>
                  <li><strong>시리얼 넘버 관리:</strong> 주얼리나 전자제품 같은 고가 상품은 고유 시리얼 넘버로 개별 관리하여 분실을 방지합니다.</li>
                  <li><strong>재고 경고 시스템:</strong> 설정한 안전 재고 수량 도달 시 자동으로 알림을 띄워 품절을 예방합니다.</li>
                </ul>
              </div>
            </div>

            {/* Feature 3: Order Management */}
            <div className={`${styles.featureRow} mb-24`}>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-blue-600 text-sm font-bold uppercase tracking-wider block mb-2">03 Order Processing</span>
                  매끄러운 주문 처리 흐름
                </h3>
                <p className={styles.featureDesc}>
                  주문 접수부터 배송 완료까지, 모든 단계를 직관적으로 관리하세요.
                </p>
                <ul className={styles.featureList}>
                  <li><strong>주문 상태 파이프라인:</strong> 대기 → 처리중 → 배송중 → 완료의 명확한 프로세스로 누락을 방지합니다.</li>
                  <li><strong>송장 및 명세서:</strong> 택배 송장 번호 입력 및 거래명세서 원클릭 출력을 지원합니다.</li>
                  <li><strong>수동 주문 생성:</strong> 전화나 이메일 등을 통한 오프라인 주문도 통합하여 관리할 수 있습니다.</li>
                </ul>
              </div>
              <div className="feature-image shadow-xl rounded-lg overflow-hidden border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/order-mgmt.png" alt="Order Management UI" className="w-full h-auto" />
              </div>
            </div>

            {/* Feature 4: Customer Management (Text Only Block) */}
            <div className="feature-text-block bg-slate-50 p-10 rounded-2xl text-center max-w-4xl mx-auto mb-20 border border-slate-200">
              <Users size={48} className="text-blue-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-slate-800">고객 관계 관리 (CRM)</h3>
              <p className="text-slate-600 mb-6">
                단순한 판매를 넘어 단골 고객을 만드세요. 고객별 구매 이력을 조회하고, 배송지 정보를 체계적으로 관리하여 맞춤형 서비스를 제공할 수 있습니다.
              </p>
              <div className="flex justify-center gap-4 text-sm font-medium text-slate-500">
                <span className="px-3 py-1 bg-white rounded shadow-sm border">고객 프로필</span>
                <span className="px-3 py-1 bg-white rounded shadow-sm border">주문 이력 조회</span>
                <span className="px-3 py-1 bg-white rounded shadow-sm border">배송지 관리</span>
              </div>
            </div>

          </div>

          <PricingTable serviceName="재고/매출 관리" serviceId="retail" />
        </div>
      </section>

      <div className={styles.divider} />

      {/* Education Section */}
      <section className={styles.serviceDetailSection} id="education">
        <div className="container">
          <div className={styles.sectionIntro}>
            <span className={`${styles.sectionLabel} text-indigo-600`}>Education</span>
            <h2 className="text-4xl font-extrabold mb-2 text-slate-900">NCS On-Track (온트랙)</h2>
            <p className="text-xl font-semibold mb-6 text-indigo-600">스마트 아카데미 매니지먼트</p>
            <p className={styles.introText}>
              학원 운영의 핵심은 <strong>체계적인 학생 관리</strong>입니다. <br />
              <strong>NCS On-Track (온트랙)</strong>으로 NCS 기반 학사 관리부터 비대면 문제은행까지 한 번에 해결하세요.
            </p>
          </div>

          <div className="mb-24">
            <h3 className="text-2xl font-bold text-center mb-10 text-slate-800">에듀테크의 시작</h3>
            <div className={`${styles.featuresGrid} ${styles.threeCol}`}>
              <div className={styles.featureCard}>
                <Users size={40} className="text-indigo-600 mb-4 mx-auto" />
                <h3>NCS On-Track 학사/출결 통합</h3>
                <p>국가직무능력표준(NCS) 기반 커리큘럼 설계 및 QR코드/비콘을 이용한 자동 출결.</p>
              </div>
              <div className={styles.featureCard}>
                <ShieldCheck size={40} className="text-indigo-600 mb-4 mx-auto" />
                <h3>CBT 문제은행 보안</h3>
                <p>안전한 환경에서의 온라인 시험(CBT) 진행 및 자동 채점, 오답 노트 기능을 제공합니다.</p>
              </div>
              <div className={styles.featureCard}>
                <BarChart3 size={40} className="text-indigo-600 mb-4 mx-auto" />
                <h3>학습 성취도 리포트</h3>
                <p>개인별 학습 데이터를 분석하여 학생 및 학부모에게 맞춤형 성적 리포트를 발송합니다.</p>
              </div>
            </div>
          </div>

          {/* Detailed Features for Education */}
          <div>

            {/* Feature 1: LMS Dashboard */}
            <div className={`${styles.featureRow} mb-24`}>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider block mb-2">01 ACADEMIC MANAGEMENT</span>
                  NCS On-Track으로 학사/출결 관리
                </h3>
                <p className={styles.featureDesc}>
                  <strong>NCS On-Track (온트랙)</strong>으로 복잡한 학사 행정 업무를 자동화하고 학습 관리에 집중하세요.
                </p>
                <ul className={`${styles.featureList} ${styles.indigo}`}>
                  <li><strong>스마트 출결:</strong> 학생별 고유 QR코드 또는 비콘으로 등하원 시간을 자동 기록하고 학부모에게 알림을 발송합니다.</li>
                  <li><strong>커리큘럼 설계:</strong> NCS 기준에 맞춘 체계적인 강의 계획서 작성 및 진도 관리가 가능합니다.</li>
                  <li><strong>강사 및 강의실 관리:</strong> 강사의 스케줄과 강의실 배정을 시각적인 타임라인으로 관리합니다.</li>
                </ul>
              </div>
              <div className={`${styles.featureImage} shadow-xl rounded-lg overflow-hidden border border-slate-100`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/lms-dashboard.png" alt="LMS Dashboard" className="w-full h-auto" />
              </div>
            </div>

            {/* Feature 2: CBT System */}
            <div className={`${styles.featureRow} ${styles.reverse} mb-24`}>
              <div className={`${styles.featureImage} shadow-xl rounded-lg overflow-hidden border border-slate-100`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cbt-exam.png" alt="CBT Exam Interface" className="w-full h-auto" />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider block mb-2">02 CBT SYSTEM</span>
                  온라인 문제은행 & 평가
                </h3>
                <p className={styles.featureDesc}>
                  실전과 동일한 환경의 온라인 시험(CBT) 시스템을 구축하세요.
                </p>
                <ul className={`${styles.featureList} ${styles.indigo}`}>
                  <li><strong>자동 출제 마법사:</strong> 단원별, 난이도별 문제는 물론 기출 문제를 섞어 나만의 시험지를 3분 만에 생성합니다.</li>
                  <li><strong>자동 채점:</strong> 시험 종료 즉시 점수가 산출되며, 객관식뿐만 아니라 단답형 채점도 지원합니다.</li>
                  <li><strong>오답 노트:</strong> 틀린 문제와 유사한 유형의 문제를 자동으로 추천하여 반복 학습을 유도합니다.</li>
                </ul>
              </div>
            </div>

            {/* Feature 3: Student Report */}
            <div className={`${styles.featureRow} mb-24`}>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider block mb-2">03 ANALYTICS REPORT</span>
                  데이터 기반 성취도 분석
                </h3>
                <p className={styles.featureDesc}>
                  단순한 점수가 아닌, 학생의 성장을 데이터로 보여주세요.
                </p>
                <ul className={`${styles.featureList} ${styles.indigo}`}>
                  <li><strong>종합 성적 리포트:</strong> 과목별 성취도, 누적 등수, 출석률을 종합한 프리미엄 리포트를 생성합니다.</li>
                  <li><strong>AI 취약점 분석:</strong> 학생이 자주 틀리는 유형을 분석하여 개인별 맞춤 학습 전략을 제안합니다.</li>
                  <li><strong>학부모 소통:</strong> 모바일 앱을 통해 리포트를 전송하고 실시간 상담이 가능합니다.</li>
                </ul>
              </div>
              <div className="feature-image shadow-xl rounded-lg overflow-hidden border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/student-report.png" alt="Student Report UI" className="w-full h-auto" />
              </div>
            </div>

          </div>

          <PricingTable serviceName="NCS On-Track (온트랙)" serviceId="cbt" />
        </div>
      </section>

      <div className="divider" />

      {/* WOW-CBT Section */}
      <section className={styles.serviceDetailSection} id="cbt">
        <div className="container">

          {/* Section Hero */}
          <div className={styles.sectionIntro}>
            <span className={`${styles.sectionLabel} text-purple-600`}>Certification · CBT</span>
            <h2 className="text-4xl font-extrabold mb-2 text-slate-900">WOW-CBT (와우CBT)</h2>
            <p className="text-xl font-semibold mb-6 text-purple-600">자격증 대비 모의고사 · 문제은행</p>
            <p className="intro-text text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              실전처럼 연습하고 한 번에 합격할 수 있도록, 실제 시험 환경을 그대로 구현한 CBT 모의고사 시스템입니다.<br />
              시험지 자동 생성, 즉시 채점, 오답 노트까지.
            </p>
          </div>

          {/* Hero Image */}
          <div className="hero-image-wrapper mb-20 shadow-2xl rounded-xl overflow-hidden border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cbt-exam.png" alt="WOW-CBT 모의고사 화면" className="w-full h-auto object-cover" />
          </div>

          <div className="mb-24">
            <h3 className="text-2xl font-bold text-center mb-10 text-slate-800">학습 흐름을 끊지 않는 핵심 기능</h3>
            <div className={`${styles.featuresGrid} ${styles.threeCol}`}>
              <div className={styles.featureCard}>
                <Timer size={40} className="text-purple-600 mb-4 mx-auto" />
                <h3>실전 모의고사</h3>
                <p>타이머·마킹·문항 이동 등 실제 시험과 유사한 UI로 실전 대비가 가능합니다.</p>
              </div>
              <div className={styles.featureCard}>
                <BookOpen size={40} className="text-purple-600 mb-4 mx-auto" />
                <h3>오답 노트</h3>
                <p>틀린 문제는 자동으로 저장되고 유형별로 묶어 반복 학습할 수 있습니다.</p>
              </div>
              <div className={styles.featureCard}>
                <LineChart size={40} className="text-purple-600 mb-4 mx-auto" />
                <h3>취약 유형 분석</h3>
                <p>정답률/소요시간 기반으로 약점을 분석해 개선 포인트를 명확히 제시합니다.</p>
              </div>
            </div>
          </div>

          <div className={`${styles.divider} mb-24`} />

          {/* Detailed Features - Alternating Rows */}
          <div>

            {/* Feature 1: Question Bank */}
            <div className={`${styles.featureRow} mb-24`}>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-purple-600 text-sm font-bold uppercase tracking-wider block mb-2">01 Question Bank</span>
                  문제은행 & 시험지 자동 생성
                </h3>
                <p className={styles.featureDesc}>
                  단원/난이도/유형 기준으로 문제를 선택하고, 랜덤 섞기까지 한 번에 처리합니다.
                </p>
                <ul className={styles.featureList}>
                  <li><strong>문제 데이터 구조:</strong> 문제/해설/정답(객관식·단답형 등) 데이터 구조를 완벽 지원합니다.</li>
                  <li><strong>출제 비중 설정:</strong> 단원별·난이도별 출제 비중 설정 및 랜덤 출제가 가능합니다.</li>
                  <li><strong>시험지 템플릿:</strong> 모의고사부터 실전 시험까지 다양한 템플릿 구성을 지원합니다.</li>
                </ul>
              </div>
              <div className="feature-image shadow-xl rounded-lg overflow-hidden border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cbt-exam.png" alt="문제은행 시스템" className="w-full h-auto" />
              </div>
            </div>

            {/* Feature 2: Grading & Review */}
            <div className={`${styles.featureRow} ${styles.reverse} mb-24`}>
              <div className={`${styles.featureImage} shadow-xl rounded-lg overflow-hidden border border-slate-100`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/student-report.png" alt="채점 및 리포트" className="w-full h-auto" />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>
                  <span className="text-purple-600 text-sm font-bold uppercase tracking-wider block mb-2">02 Grading & Review</span>
                  즉시 채점 & 오답 복습 루프
                </h3>
                <p className={styles.featureDesc}>
                  시험 종료 즉시 채점 결과가 제공되고, 오답 노트로 바로 복습이 이어집니다.
                </p>
                <ul className={styles.featureList}>
                  <li><strong>자동 채점:</strong> 시험 종료와 동시에 정답 확인 및 상세 해설을 제공합니다.</li>
                  <li><strong>오답 재학습:</strong> 틀린 유형을 분석해 유사 문제를 추천하여 학습 효율을 높입니다.</li>
                  <li><strong>학습 리포트:</strong> 개인별 취약점과 목표 점수 달성률을 데이터로 제시합니다.</li>
                </ul>
              </div>
            </div>

            {/* Feature 3: Security & Build */}
            <div className="feature-text-block bg-slate-50 p-10 rounded-2xl text-center max-w-4xl mx-auto mb-20 border border-slate-200">
              <ShieldCheck size={48} className="text-purple-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-slate-800">안전하고 신뢰할 수 있는 시험 운영</h3>
              <p className="text-slate-600 mb-6">
                교육기관과 기업 환경에 맞춘 강력한 보안 옵션을 제공합니다. <br />
                철저한 접근 제어와 데이터 보호로 공정한 시험 환경을 구축하세요.
              </p>
              <div className="flex justify-center gap-4 text-sm font-medium text-slate-500">
                <span className="px-3 py-1 bg-white rounded shadow-sm border">권한 관리</span>
                <span className="px-3 py-1 bg-white rounded shadow-sm border">접근 제어</span>
                <span className="px-3 py-1 bg-white rounded shadow-sm border">온프라미스 지원</span>
              </div>
            </div>

          </div>

          <PricingTable serviceName="WOW-CBT (와우CBT)" serviceId="cbt" />
        </div>
      </section>

      <section className="cta-section bg-slate-50 py-20 text-center">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">아직 고민되시나요?</h2>
          <p className="mb-8 text-slate-600">전문 컨설턴트가 사장님 매장에 딱 맞는 솔루션을 추천해 드립니다.</p>
          <Link href="/contact" className="btn btn-primary btn-lg bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition">
            무료 컨설팅 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
