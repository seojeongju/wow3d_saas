"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import {
  equipmentHighlights,
  intellectualProperties,
  ipFilterOptions,
  products,
} from "../about.data";
import AboutContactCta from "../AboutContactCta";
import AboutPageHeader from "../AboutPageHeader";
import styles from "../about.module.css";

export default function TechnologyContent() {
  const [ipFilter, setIpFilter] = useState<(typeof ipFilterOptions)[number]>("전체");
  const [showAllIp, setShowAllIp] = useState(false);

  const filteredIp = useMemo(() => {
    if (ipFilter === "전체") return intellectualProperties;
    return intellectualProperties.filter((item) => item.type === ipFilter);
  }, [ipFilter]);

  const visibleIp = showAllIp ? filteredIp : filteredIp.slice(0, 6);

  return (
    <div className={styles.aboutPage}>
      <AboutPageHeader
        title="제품 · 기술"
        description="하드웨어·소프트웨어·제작 인프라와 지식재산권을 한곳에서 확인하세요"
      />

      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>제품 및 솔루션</h2>
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

      <section className={styles.ipSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>보유 기술 · 지식재산권</h2>
            <p className={styles.sectionSubtitle}>
              홀로그램·3D프린팅·NFC·AI 융합 핵심 특허 및 디자인권
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

      <AboutContactCta />
    </div>
  );
}
