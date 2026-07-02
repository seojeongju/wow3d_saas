"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  Calendar,
  ChevronRight,
  Cpu,
  Factory,
  Globe,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import styles from "./about.module.css";
import {
  achievementYears,
  businessAreas,
  centers,
  certifications,
  companyProfile,
  developmentAchievements,
  equipmentHighlights,
  growthMilestones,
  intellectualProperties,
  ipFilterOptions,
  products,
} from "./about.data";

export default function AboutContent() {
  const [ipFilter, setIpFilter] = useState<(typeof ipFilterOptions)[number]>("전체");
  const [yearFilter, setYearFilter] = useState<(typeof achievementYears)[number]>("전체");
  const [showAllIp, setShowAllIp] = useState(false);

  const filteredIp = useMemo(() => {
    if (ipFilter === "전체") return intellectualProperties;
    return intellectualProperties.filter((item) => item.type === ipFilter);
  }, [ipFilter]);

  const visibleIp = showAllIp ? filteredIp : filteredIp.slice(0, 6);

  const filteredAchievements = useMemo(() => {
    if (yearFilter === "전체") return developmentAchievements;
    return developmentAchievements.filter((item) => item.year === yearFilter);
  }, [yearFilter]);

  const registeredIpCount = intellectualProperties.filter((i) => i.status === "registered").length;

  return (
    <div className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Building2 size={20} />
              <span>Company Profile 2026</span>
            </div>
            <h1 className={styles.heroTitle}>
              3D프린팅을 넘어<br />
              <span className={styles.highlight}>글로벌 융합 기술</span>의 중심으로
            </h1>
            <p className={styles.heroDesc}>{companyProfile.vision}</p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <strong>2016</strong>
                <span>사업 시작</span>
              </div>
              <div className={styles.statItem}>
                <strong>3</strong>
                <span>전국 센터</span>
              </div>
              <div className={styles.statItem}>
                <strong>{registeredIpCount}+</strong>
                <span>등록 지재권</span>
              </div>
              <div className={styles.statItem}>
                <strong>10+</strong>
                <span>인증·지정</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className={styles.overviewSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>기업 개요</h2>
            <p className={styles.sectionSubtitle}>2026년 회사소개서 기준</p>
          </div>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}><Building2 size={24} /></div>
              <div className={styles.cardContent}>
                <h3>기업명</h3>
                <p className={styles.cardValue}>{companyProfile.name}</p>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}><Users size={24} /></div>
              <div className={styles.cardContent}>
                <h3>대표이사</h3>
                <p className={styles.cardValue}>{companyProfile.ceo}</p>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}><Calendar size={24} /></div>
              <div className={styles.cardContent}>
                <h3>설립일</h3>
                <p className={styles.cardValue}>{companyProfile.founded}</p>
                <p className={styles.cardNote}>{companyProfile.foundedNote}</p>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}><Award size={24} /></div>
              <div className={styles.cardContent}>
                <h3>사업자등록번호</h3>
                <p className={styles.cardValue}>{companyProfile.businessNumber}</p>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}><Factory size={24} /></div>
              <div className={styles.cardContent}>
                <h3>업태</h3>
                <p className={styles.cardValue}>{companyProfile.businessType}</p>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <div className={styles.cardIcon}><Users size={24} /></div>
              <div className={styles.cardContent}>
                <h3>인력 현황</h3>
                <p className={styles.cardValue}>
                  구미 {companyProfile.employees.gumi}명 · 홍대 {companyProfile.employees.seoul}명
                </p>
                <p className={styles.cardNote}>외부자문 {companyProfile.employees.advisors}명</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className={styles.businessSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>사업 영역</h2>
            <p className={styles.sectionSubtitle}>{companyProfile.mainBusiness}</p>
          </div>
          <div className={styles.businessGrid}>
            {businessAreas.map((area) => (
              <div key={area.title} className={styles.businessCard}>
                <div className={styles.businessIcon}>
                  {area.title === "개발" && <Cpu size={28} />}
                  {area.title === "FAB/LAB" && <Wrench size={28} />}
                  {area.title === "교육" && <GraduationCap size={28} />}
                </div>
                <h3>{area.title}</h3>
                <ul>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>성장 연혁</h2>
            <p className={styles.sectionSubtitle}>
              3D프린팅 교육에서 AI·홀로그램·스마트제조 융합 기업으로 성장
            </p>
          </div>
          <div className={styles.timeline}>
            {growthMilestones.map((item, index) => (
              <div key={item.year + item.title} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span className={styles.timelineDot} />
                  {index < growthMilestones.length - 1 && <span className={styles.timelineLine} />}
                </div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>제품 및 기술</h2>
            <p className={styles.sectionSubtitle}>하드웨어·소프트웨어·교육을 아우르는 통합 솔루션</p>
          </div>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <Link key={product.title} href={product.link} className={styles.productCard}>
                <div className={styles.productIcon}><Sparkles size={24} /></div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <span className={styles.productLink}>자세히 보기 <ChevronRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IP & Technology */}
      <section className={styles.ipSection} id="ip">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>보유 기술 · 지식재산권</h2>
            <p className={styles.sectionSubtitle}>
              홀로그램·3D프린팅·NFC·AI 융합 핵심 특허 및 디자인권 보유
            </p>
          </div>
          <div className={styles.tabBar} role="tablist" aria-label="지식재산권 필터">
            {ipFilterOptions.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={ipFilter === option}
                className={ipFilter === option ? styles.tabActive : styles.tab}
                onClick={() => {
                  setIpFilter(option);
                  setShowAllIp(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className={styles.ipGrid}>
            {visibleIp.map((item) => (
              <div key={item.number} className={styles.ipCard}>
                <div className={styles.ipCardHeader}>
                  <span className={styles.ipType}>{item.type}</span>
                  <span className={item.status === "registered" ? styles.ipRegistered : styles.ipPending}>
                    {item.status === "registered" ? "등록" : "출원"}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p className={styles.ipNumber}>{item.number}</p>
              </div>
            ))}
          </div>
          {filteredIp.length > 6 && (
            <div className={styles.sectionAction}>
              <button type="button" className={styles.outlineBtn} onClick={() => setShowAllIp((v) => !v)}>
                {showAllIp ? "접기" : `전체 ${filteredIp.length}건 보기`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className={styles.certSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>인증 · 지정 현황</h2>
            <p className={styles.sectionSubtitle}>벤처·여성기업, ISO 9001, HRD·데이터사업자 등 공신력 확보</p>
          </div>
          <div className={styles.certGrid}>
            {certifications.map((cert) => (
              <div key={cert.name} className={styles.certCard}>
                <div className={styles.certIcon}><Shield size={22} /></div>
                <h3>{cert.name}</h3>
                <p className={styles.certDate}>{cert.date}</p>
                <p className={styles.certOrg}>{cert.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className={styles.equipmentSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>보유 장비</h2>
            <p className={styles.sectionSubtitle}>MSLA-DLP·FDM 3D프린터, CNC·레이저 등 제작 인프라</p>
          </div>
          <div className={styles.equipmentGrid}>
            {equipmentHighlights.map((group) => (
              <div key={group.category} className={styles.equipmentCard}>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Achievements */}
      <section className={styles.achievementSection} id="achievements">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>개발 · 사업 실적</h2>
            <p className={styles.sectionSubtitle}>정부지원사업·산학협력·R&D 주요 수행 이력</p>
          </div>
          <div className={styles.tabBar} role="tablist" aria-label="사업연도 필터">
            {achievementYears.map((year) => (
              <button
                key={year}
                type="button"
                role="tab"
                aria-selected={yearFilter === year}
                className={yearFilter === year ? styles.tabActive : styles.tab}
                onClick={() => setYearFilter(year)}
              >
                {year}
              </button>
            ))}
          </div>
          <div className={styles.achievementList}>
            {filteredAchievements.map((item) => (
              <article key={`${item.year}-${item.name}-${item.project}`} className={styles.achievementCard}>
                <div className={styles.achievementMeta}>
                  <span className={styles.achievementYear}>{item.year}</span>
                  <span className={styles.achievementField}>{item.field}</span>
                </div>
                <h3>{item.name}</h3>
                <p className={styles.achievementProject}>{item.project}</p>
                <div className={styles.achievementFooter}>
                  <span>{item.org}</span>
                  <span>{item.period}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Global & Vision */}
      <section className={styles.visionSection}>
        <div className="container">
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}><Target size={36} /></div>
              <h2>미션</h2>
              <p>
                3D프린팅·홀로그램·AI 기술을 융합하여 제조·서비스·교육 분야의
                디지털 전환을 실현하고, 중소기업·소상공인의 경쟁력을 높입니다.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}><Globe size={36} /></div>
              <h2>글로벌 확장</h2>
              <p>
                베트남·르완다 MOU 체결 등 해외 네트워크를 확대하며,
                스마트제조·홀로그램 콘텐츠의 글로벌 시장 진출을 추진합니다.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}><Lightbulb size={36} /></div>
              <h2>핵심 역량</h2>
              <p>
                NFC·GPS 위치기반 서비스, AI 데이터 가공, 제품디자인·시제품 제작,
                정부 스마트제조·서비스 공급까지 One-Stop 솔루션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Centers */}
      <section className={styles.centersSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>전국 센터 안내</h2>
            <p className={styles.sectionSubtitle}>서울·구미·전주 3개 거점에서 연구·교육·제작 서비스 제공</p>
          </div>
          <div className={styles.centersGrid}>
            {centers.map((center) => (
              <div key={center.name} className={styles.centerCard}>
                <div className={styles.centerIcon}><MapPin size={22} /></div>
                <h3>{center.name}</h3>
                <p className={styles.centerSubtitle}>{center.subtitle}</p>
                <p className={styles.centerAddress}>{center.address}</p>
                <div className={styles.centerContact}>
                  <a href={`tel:${center.tel.replace(/-/g, "")}`}>
                    <Phone size={16} /> {center.tel}
                  </a>
                  <a href={center.url} target="_blank" rel="noreferrer">
                    <Globe size={16} /> {center.url.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactCard}>
            <h2>와우쓰리디와 함께하세요</h2>
            <p>솔루션 도입, 제품 개발, 교육·시제품 제작 등 무엇이든 문의해 주세요.</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={20} className={styles.contactIcon} />
                <a href="tel:0231443137">02-3144-3137</a>
                <span className={styles.contactDivider}>·</span>
                <a href="tel:0544643137">054-464-3137</a>
              </div>
              <div className={styles.contactItem}>
                <Mail size={20} className={styles.contactIcon} />
                <a href="mailto:3dcookidhd@naver.com">3dcookidhd@naver.com</a>
              </div>
            </div>
            <div className={styles.contactActions}>
              <Link href="/contact" className={styles.ctaButton}>문의하기</Link>
              <Link href="/gov-support" className={styles.ctaButtonSecondary}>정부지원 안내</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
