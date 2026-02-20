"use client";

import Link from "next/link";
import { Cpu, Zap, Target, Layers, Thermometer, ArrowRight, ChevronRight } from "lucide-react";
import styles from "../hardware.module.css";

const features = [
    { icon: "🎯", name: "출력 정밀도", val: "XY 해상度 0.05mm 이하\n초정밀 광경화 방식" },
    { icon: "⚡", name: "출력 속도", val: "레이어 당 1~3초\n고속 연속 출력 지원" },
    { icon: "🧪", name: "소재 호환성", val: "표준 405nm 광경화 수지\n가변 점도 레진 지원" },
    { icon: "📐", name: "빌드 사이즈", val: "최대 192×120×200mm\n대형 모델 분할 출력 가능" },
    { icon: "🖥️", name: "제어 시스템", val: "4K 모노 LCD / DLP 광원\nWi-Fi 원격 제어 지원" },
    { icon: "🔧", name: "유지 보수", val: "모듈식 FEP 교체 구조\n간편한 세척/후경화 시스템" },
];

const specs = [
    { key: "광원 방식", val: "MSLA (Mono LCD) / DLP 광학 엔진" },
    { key: "광원 파장", val: "405nm UV LED" },
    { key: "XY 해상도", val: "최대 4K (3840×2400px)" },
    { key: "레이어 두께", val: "0.01 ~ 0.3mm 가변" },
    { key: "빌드 볼륨", val: "192 × 120 × 200 mm" },
    { key: "출력 속도", val: "30~50mm/hr (일반 모드 기준)" },
    { key: "지원 소재", val: "405nm 광경화 수지 (ABS-Like, Dental, Castable 등)" },
    { key: "연결 방식", val: "USB, Wi-Fi, LAN" },
    { key: "슬라이싱 SW", val: "Chitubox / LycheeS​licer 호환" },
    { key: "전원", val: "AC 100-240V, 50/60Hz" },
    { key: "무게", val: "약 7.5kg" },
    { key: "외형 크기", val: "270 × 220 × 440 mm" },
];

export default function PrinterPage() {
    return (
        <div className={styles.detailPage}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link href="/">홈</Link>
                <ChevronRight size={14} />
                <Link href="/hardware/">하드웨어 소개</Link>
                <ChevronRight size={14} />
                <span>MSLA-DLP 3D Print</span>
            </nav>

            {/* Hero */}
            <section className={styles.detailHero}>
                <div className={styles.detailHeroContent}>
                    <span className={styles.detailBadge}>MSLA / DLP 3D Printer</span>
                    <h1 className={styles.detailTitle}>
                        고정밀 산업용 MSLA·DLP<br />3D 프린터 솔루션
                    </h1>
                    <p className={styles.detailDesc}>
                        광경화 수지 방식의 초정밀 3D 프린터로 제품 시제품, 치과·교육용 모델, 맞춤형 부품 제작까지
                        다양한 분야에 적용 가능한 (주)와우쓰리디의 하드웨어 솔루션입니다.
                    </p>
                </div>
            </section>

            <div className={styles.detailBody}>
                {/* Features */}
                <section>
                    <h2 className={styles.sectionTitle}>주요 특징</h2>
                    <div className={styles.featureGrid}>
                        {features.map(f => (
                            <div key={f.name} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <div className={styles.featureName}>{f.name}</div>
                                <div className={styles.featureVal} style={{ whiteSpace: 'pre-line' }}>{f.val}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Specs */}
                <section>
                    <h2 className={styles.sectionTitle}>상세 사양</h2>
                    <table className={styles.specTable}>
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>사양</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specs.map(s => (
                                <tr key={s.key}>
                                    <td className={styles.specKey}>{s.key}</td>
                                    <td>{s.val}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>도입 문의 & 데모 신청</h2>
                    <p className={styles.ctaDesc}>
                        MSLA-DLP 3D 프린터 도입을 검토 중이신가요? 전문 담당자가 맞춤 상담을 제공합니다.
                    </p>
                    <Link href="/contact/" className={styles.ctaBtn}>
                        무료 상담 신청 <ArrowRight size={16} />
                    </Link>
                </section>
            </div>
        </div>
    );
}
