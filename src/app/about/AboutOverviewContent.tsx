import Link from "next/link";
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
  Shield,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import {
  aboutNavItems,
  businessAreas,
  companyProfile,
  intellectualProperties,
} from "./about.data";
import AboutContactCta from "./AboutContactCta";
import styles from "./about.module.css";

const hubIcons = [Building2, Cpu, Award, Shield, Factory, Globe] as const;

export default function AboutOverviewContent() {
  const registeredIpCount = intellectualProperties.filter((i) => i.status === "registered").length;
  const hubItems = aboutNavItems.filter((item) => item.href !== "/about");

  return (
    <div className={styles.aboutPage}>
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

      <section className={styles.hubSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>더 알아보기</h2>
            <p className={styles.sectionSubtitle}>관심 주제별로 상세 정보를 확인하세요</p>
          </div>
          <div className={styles.hubGrid}>
            {hubItems.map((item, index) => {
              const Icon = hubIcons[index] ?? Building2;
              return (
                <Link key={item.href} href={item.href} className={styles.hubCard}>
                  <div className={styles.hubIcon}><Icon size={24} /></div>
                  <div className={styles.hubContent}>
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                  </div>
                  <ChevronRight size={20} className={styles.hubArrow} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

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

      <AboutContactCta />
    </div>
  );
}
