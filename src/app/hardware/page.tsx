"use client";

import Link from "next/link";
import { Cpu, Monitor, ArrowRight } from "lucide-react";
import styles from "./hardware.module.css";

const hardwareItems = [
    {
        href: "/hardware/3d-printer/",
        icon: <Cpu size={40} />,
        badge: "MSLA / DLP",
        title: "MSLA-DLP 3D Print",
        desc: "광경화 수지 기반의 고정밀 MSLA·DLP 방식 산업용 3D 프린터 솔루션. 교육기관 및 소상공인을 위한 최적화된 출력 품질과 스피드를 제공합니다.",
        tags: ["고정밀 출력", "광경화 수지", "산업용", "교육용"],
        color: "blue",
    },
    {
        href: "/hardware/hologram/",
        icon: <Monitor size={40} />,
        badge: "Hologram",
        title: "3D Hologram Display",
        desc: "LED 팬 방식의 3D 홀로그램 디스플레이. 제품 전시, 교육 콘텐츠, 광고 등 다양한 분야에서 몰입감 있는 시각 경험을 선사합니다.",
        tags: ["LED 팬 방식", "360° 디스플레이", "광고·전시", "교육 콘텐츠"],
        color: "purple",
    },
];

export default function HardwarePage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroBadge}>Hardware Solutions</span>
                    <h1 className={styles.heroTitle}>
                        혁신적인 <span className={styles.heroAccent}>하드웨어</span> 솔루션
                    </h1>
                    <p className={styles.heroDesc}>
                        (주)와우쓰리디의 첨단 하드웨어 제품으로 교육 현장과 비즈니스를 한 단계 업그레이드하세요.
                    </p>
                </div>
            </section>

            {/* Cards */}
            <section className={styles.cardSection}>
                <div className={styles.container}>
                    <div className={styles.cardGrid}>
                        {hardwareItems.map((item) => (
                            <Link key={item.href} href={item.href} className={`${styles.card} ${styles[`card_${item.color}`]}`}>
                                <div className={styles.cardTop}>
                                    <div className={styles.cardIconWrap}>{item.icon}</div>
                                    <span className={styles.cardBadge}>{item.badge}</span>
                                </div>
                                <h2 className={styles.cardTitle}>{item.title}</h2>
                                <p className={styles.cardDesc}>{item.desc}</p>
                                <div className={styles.cardTags}>
                                    {item.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                                </div>
                                <div className={styles.cardCta}>
                                    자세히 보기 <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
