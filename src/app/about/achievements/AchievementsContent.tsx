"use client";

import { useMemo, useState } from "react";
import { achievementYears, developmentAchievements } from "../about.data";
import AboutContactCta from "../AboutContactCta";
import AboutPageHeader from "../AboutPageHeader";
import styles from "../about.module.css";

export default function AchievementsContent() {
  const [yearFilter, setYearFilter] = useState<(typeof achievementYears)[number]>("전체");

  const filteredAchievements = useMemo(() => {
    if (yearFilter === "전체") return developmentAchievements;
    return developmentAchievements.filter((item) => item.year === yearFilter);
  }, [yearFilter]);

  return (
    <div className={styles.aboutPage}>
      <AboutPageHeader
        title="개발 · 사업 실적"
        description="정부지원사업·산학협력·R&D 주요 수행 이력을 연도별로 확인하세요"
        bg="achievements"
      />

      <section className={styles.achievementSection}>
        <div className="container">
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

      <AboutContactCta />
    </div>
  );
}
