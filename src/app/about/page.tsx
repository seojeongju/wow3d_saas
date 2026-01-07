"use client";

import Link from "next/link";
import { Building2, Target, Users, Award, MapPin, Phone, Mail, TrendingUp, Shield, Zap, Heart } from "lucide-react";
import styles from "./about.module.css";

const coreValues = [
  {
    icon: <Target size={32} />,
    title: "혁신",
    description: "최신 기술을 활용한 차별화된 솔루션으로 고객의 비즈니스 성장을 지원합니다."
  },
  {
    icon: <Shield size={32} />,
    title: "신뢰",
    description: "안정적이고 보안성 높은 시스템으로 고객 데이터를 안전하게 보호합니다."
  },
  {
    icon: <Zap size={32} />,
    title: "효율",
    description: "복잡한 업무 프로세스를 자동화하여 시간과 비용을 절감합니다."
  },
  {
    icon: <Heart size={32} />,
    title: "고객 중심",
    description: "고객의 니즈를 정확히 파악하고 맞춤형 솔루션을 제공합니다."
  }
];

const services = [
  {
    name: "WOW-Smart Manager",
    description: "스마트 재고/매출 관리 팩",
    link: "/services/retail"
  },
  {
    name: "NCS On-Track (온트랙)",
    description: "스마트 아카데미 매니지먼트",
    link: "/services/academy"
  },
  {
    name: "WOW-CBT (와우CBT)",
    description: "실전 모의고사 & 문제은행 시스템",
    link: "/services/cbt"
  }
];

const centers = [
  {
    name: "홍대센터",
    address: "서울시 마포구 독막로 93 상수빌딩 4층",
    icon: <MapPin size={20} />
  },
  {
    name: "구미센터",
    address: "경북 구미시 산호대로 253 구미첨단의료기술타워 606호",
    icon: <MapPin size={20} />
  },
  {
    name: "전주센터",
    address: "전북특별자치도 전주시 덕진구 반룡로 109 테크노빌A동 207호",
    icon: <MapPin size={20} />
  }
];

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Building2 size={20} />
              <span>회사 소개</span>
            </div>
            <h1 className={styles.heroTitle}>
              데이터 기반 스마트 경영 솔루션<br />
              <span className={styles.highlight}>(주)와우쓰리디</span>
            </h1>
            <p className={styles.heroDesc}>
              소상공인부터 기업까지, 비즈니스의 성장을 돕는 혁신적인 SaaS 플랫폼을 제공합니다.<br />
              우리는 고객의 경영 효율화와 디지털 전환을 위한 최고의 파트너가 되겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className={styles.overviewSection}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}>
                <Building2 size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3>상호명</h3>
                <p className={styles.cardValue}>(주)와우쓰리디</p>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}>
                <Users size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3>대표자</h3>
                <p className={styles.cardValue}>김순희</p>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}>
                <Award size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3>사업자등록번호</h3>
                <p className={styles.cardValue}>849-88-01659</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>
                <Target size={40} />
              </div>
              <h2>미션</h2>
              <p>
                최신 기술과 데이터 분석을 통해<br />
                고객의 비즈니스 성장과 경영 효율화를 실현합니다.
              </p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>
                <TrendingUp size={40} />
              </div>
              <h2>비전</h2>
              <p>
                대한민국 모든 기업이 쉽게 접근할 수 있는<br />
                스마트 경영 솔루션의 선도 기업이 되겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>핵심 가치</h2>
            <p className={styles.sectionSubtitle}>
              와우쓰리디가 추구하는 가치와 원칙입니다
            </p>
          </div>
          <div className={styles.valuesGrid}>
            {coreValues.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>제공 서비스</h2>
            <p className={styles.sectionSubtitle}>
              업종별 특화된 스마트 경영 솔루션을 제공합니다
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <Link key={index} href={service.link} className={styles.serviceCard}>
                <div className={styles.serviceContent}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <span className={styles.serviceLink}>자세히 보기 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Centers Section */}
      <section className={styles.centersSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>센터 안내</h2>
            <p className={styles.sectionSubtitle}>
              전국 3개 센터에서 서비스를 제공하고 있습니다
            </p>
          </div>
          <div className={styles.centersGrid}>
            {centers.map((center, index) => (
              <div key={index} className={styles.centerCard}>
                <div className={styles.centerIcon}>{center.icon}</div>
                <h3>{center.name}</h3>
                <p>{center.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactCard}>
            <h2>문의하기</h2>
            <p>궁금한 점이 있으신가요? 언제든지 문의해 주세요.</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={20} className={styles.contactIcon} />
                <a href="tel:02-3144-3137">02-3144-3137</a>
              </div>
              <div className={styles.contactItem}>
                <Mail size={20} className={styles.contactIcon} />
                <a href="mailto:3dcookidhd@naver.com">3dcookidhd@naver.com</a>
              </div>
            </div>
            <Link href="/contact" className={styles.ctaButton}>
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
