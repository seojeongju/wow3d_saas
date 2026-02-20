"use client";

import PricingTable from '@/components/PricingTable';
import { Box, Users, BarChart3, Cloud, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './retail.module.css';

export default function RetailServicePage() {
  return (
    <div className={styles.retailPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.badge}>
                <span>Retail & Food</span>
              </div>
              <h1 className={styles.heroTitle}>WOW-Smart Manager</h1>
              <p className={styles.heroSubtitle}>스마트 재고/매출 관리 팩</p>
              <p className={styles.heroDesc}>
                도소매, 요식업 사장님을 위한 데이터 기반 경영 파트너.<br />
                재고부터 주문, 고객 관리까지 하나의 시스템으로 완성하세요.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.btnPrimary}>
                  무료 상담 신청 <ArrowRight size={18} />
                </Link>
                <a href="https://wow3d-stock-sales-manager.pages.dev/login" target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                  데모보기
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/wow-smart-manager-hero.jpg" alt="WOW-Smart Manager Dashboard" className={styles.heroImg} />
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
                <BarChart3 size={40} />
              </div>
              <h3>대시보드 & 지표</h3>
              <p>매출, 주문 수, 재고 현황을 실시간으로 파악하여 빠른 의사결정을 돕습니다.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Box size={40} />
              </div>
              <h3>자동 발주 알림</h3>
              <p>안전 재고 미만 시 알림을 보내 시기를 놓치지 않고 물품을 확보할 수 있습니다.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Cloud size={40} />
              </div>
              <h3>클라우드 ERP</h3>
              <p>PC, 태블릿, 모바일 어디서든 접속하여 매장 상황을 모니터링하세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Image */}
      <section className={styles.dashboardSection}>
        <div className="container">
          <div className={styles.dashboardWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard-hero.jpg" alt="WOW-Smart Manager Dashboard" className={styles.dashboardImg} />
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className={styles.detailSection}>
        <div className="container">

          {/* Feature 1: Product Management */}
          <div className={styles.detailRow}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>01 Product Management</span>
              <h2 className={styles.detailTitle}>
                복잡한 상품 옵션도<br />체계적으로 정리
              </h2>
              <p className={styles.detailDesc}>
                색상, 사이즈, 소재 등 다양한 옵션이 있는 상품도 문제없습니다.
                엑셀 대량 등록과 바코드 연동으로 쉽고 빠르게 등록하세요.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>다중 옵션 관리:</strong> SKU별 재고 추적 및 가격 차등 설정</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>이미지 갤러리:</strong> 상품별 고화질 이미지 보관 및 키오스크 연동</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/product-mgmt.jpg" alt="Product Management" className={styles.detailImg} />
            </div>
          </div>

          {/* Feature 2: Inventory Control */}
          <div className={`${styles.detailRow} ${styles.detailRowReverse}`}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>02 Inventory Control</span>
              <h2 className={styles.detailTitle}>빈틈없는 재고 추적</h2>
              <p className={styles.detailDesc}>
                실시간 입출고 기록은 기본, 창고별 재고 이동과
                고가품 시리얼 넘버 추적까지 지원하여 로스를 최소화합니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>실시간 수불부:</strong> 입고, 출고, 반품 내역 자동 기록</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>유통기한/시리얼:</strong> 선입선출 관리 및 개별 상품 이력 추적</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/inventory-mgmt.jpg" alt="Inventory Management" className={styles.detailImg} />
            </div>
          </div>

          {/* Feature 3: Order Processing */}
          <div className={styles.detailRow}>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>03 Order Processing</span>
              <h2 className={styles.detailTitle}>주문부터 배송까지 원스톱</h2>
              <p className={styles.detailDesc}>
                온/오프라인 주문을 통합 관리하고, 택배 송장 출력부터 배송 추적까지
                한 번에 처리하여 업무 시간을 단축합니다.
              </p>
              <ul className={styles.detailList}>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>주문 통합 리스트:</strong> 매장 POS, 전화, 엑셀 주문을 한 곳에서 관리</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span><strong>거래명세서 출력:</strong> 기업 고객용 명세서 및 세금계산서 연동 지원</span>
                </li>
              </ul>
            </div>
            <div className={styles.detailImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/order-mgmt.png" alt="Order Processing" className={styles.detailImg} />
            </div>
          </div>

          {/* CRM Block */}
          <div className={styles.crmBlock}>
            <div className={styles.crmIcon}>
              <Users size={48} />
            </div>
            <h2 className={styles.crmTitle}>단골을 만드는 CRM</h2>
            <p className={styles.crmDesc}>
              고객별 구매 패턴을 분석하여 맞춤 쿠폰을 발송하고,<br />
              기념일 챙겨주기 기능으로 감동 서비스를 실천하세요.
            </p>
            <div className={styles.crmTags}>
              <span className={styles.tag}>고객 등급 관리</span>
              <span className={styles.tag}>포인트/적립금</span>
              <span className={styles.tag}>SMS 마케팅</span>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <div className="container">
          <PricingTable serviceName="WOW-Smart Manager" serviceId="retail" />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>WOW-Smart Manager로 매장 관리가 쉬워집니다</h2>
            <p className={styles.ctaDesc}>와우데이터비즈 전문 컨설턴트가 무료로 진단해 드립니다.</p>
            <Link href="/contact" className={styles.ctaButton}>
              무료 상담 신청하기 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
