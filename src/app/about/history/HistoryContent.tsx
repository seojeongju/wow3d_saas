"use client";

import clsx from "clsx";
import {
  Award,
  Building2,
  GraduationCap,
  Microscope,
  Rocket,
  Shield,
  Sparkles,
  Cpu,
} from "lucide-react";
import { growthMilestonesDesc } from "../about.data";
import AboutContactCta from "../AboutContactCta";
import AboutPageHeader from "../AboutPageHeader";
import styles from "../about.module.css";

const milestoneIcons = [Rocket, Cpu, Shield, Award, Microscope, Building2, GraduationCap];

export default function HistoryContent() {
  return (
    <div className={styles.aboutPage}>
      <AboutPageHeader
        eyebrow="Our Journey"
        title="성장 연혁"
        description="3D프린팅 교육에서 AI·홀로그램·스마트제조 융합 기업으로 성장한 여정"
        dark
      />

      <section className={styles.timelineSection}>
        <div className={styles.timelineBg} aria-hidden />
        <div className="container">
          <div className={styles.timelineTrack}>
            <div className={styles.timelineRail} aria-hidden>
              <div className={styles.timelineRailGlow} />
            </div>
            <ol className={styles.timelineList}>
              {growthMilestonesDesc.map((item, index) => {
                const Icon = milestoneIcons[index] ?? Sparkles;
                const isLatest = index === 0;
                return (
                  <li
                    key={item.year + item.title}
                    className={styles.timelineEntry}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className={styles.timelineYearCol}>
                      <time className={styles.timelineYear} dateTime={item.year.split("–")[0]}>
                        {item.year}
                      </time>
                      <span className={clsx(styles.timelineNode, isLatest && styles.timelineNodeLatest)} />
                    </div>
                    <article className={clsx(styles.timelineCard, isLatest && styles.timelineCardLatest)}>
                      <div className={styles.timelineCardTop}>
                        <div className={clsx(styles.timelineIcon, isLatest && styles.timelineIconLatest)}>
                          <Icon size={22} />
                        </div>
                        <span className={styles.timelineTag}>{item.tag}</span>
                        {isLatest && <span className={styles.timelineNow}>NOW</span>}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <AboutContactCta />
    </div>
  );
}
