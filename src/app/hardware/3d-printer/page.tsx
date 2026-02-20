"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import styles from "../hardware.module.css";

/* ============================================================
   실제 wow3dhd.co.kr  MSLA-DLP 3D Printer 제품 데이터
   모델: MSLA P10 (flagship) · MSLA P7 (compact)
   ============================================================ */

const heroSlogan = "상상하는 모든 것을 현실로";
const heroSub = "마이크로 단위의 정밀함으로 피규어·주얼리·덴탈·미니어처를 구현하는 차세대 MSLA·DLP 3D 프린터";

/* ─────────────── 모델 카드 ─────────────── */
const models = [
    {
        id: "P10",
        name: "MSLA P10",
        badge: "Flagship",
        color: "blue",
        tagline: "10인치 8K 초대형 빌드 · 주얼리 / 프로토타입",
        highlights: [
            { k: "LCD", v: "10인치 8K 고해상도 Mono LCD" },
            { k: "XY 해상도", v: "14.85 μm (마이크로미터)" },
            { k: "Z축 정밀도", v: "7 μm 이내" },
            { k: "빌드 볼륨", v: "228 × 128 × 250 mm" },
            { k: "인쇄 정확도", v: "0.05 mm" },
            { k: "인쇄 성공률", v: "최대 99%" },
        ],
        features: [
            "산업용 리드 스크류 + 고정밀 듀얼 가이드 레일",
            "자체 온도 조절 가열 시스템 — 외부 온도 무관 안정 출력",
            "그레이스케일 XY 픽셀 관리로 부드러운 표면 구현",
            "압력 완화 홀 제작 플랫폼 — 레진 박리 원활",
            "오프라인 내장 저장소 + 개방형 커스텀 모듈 지원",
            "이미지 처리 기술로 층 밀림 최소화",
        ],
    },
    {
        id: "P7",
        name: "MSLA P7",
        badge: "Compact",
        color: "purple",
        tagline: "6.6인치 4K · 주얼리 주조 / 피규어",
        highlights: [
            { k: "LCD", v: "6.6인치 4K 고해상도 Mono LCD" },
            { k: "XY 정확도", v: "9 μm (그레이스케일 조정)" },
            { k: "인쇄 정확도", v: "0.02 mm 이내" },
            { k: "레이어 두께", v: "25 ~ 150 μm 가변" },
            { k: "출력 온도", v: "실내 30°C 자동 유지" },
            { k: "광 균일도", v: "85% 향상된 빛 균일도" },
        ],
        features: [
            "DLP 수준 세부 성능 — 주얼리 주조 모델 생산 표준 충족",
            "균일한 광원으로 인쇄 정확도 0.02 mm 이내 제어",
            "인쇄실 내부 30°C 유지 — 추운 날씨 고성공률 보장",
            "머리카락 굵기 수준의 미세 디테일·선명한 모서리 표현",
            "다양한 레진 완벽 호환 — 표현의 영역 확장",
            "직관적 UI — 비전문가도 쉬운 사용 설계",
        ],
    },
];

/* ─────────────── 공통 특징 ─────────────── */
const commonFeatures = [
    { icon: "🎯", name: "초고정밀 출력", val: "마이크로 단위 정밀도로\n피규어·주얼리·미니어처 완벽 구현" },
    { icon: "⚡", name: "고속 레이어 경화", val: "전체 레이어 동시 경화 방식\n기존 FDM 대비 획기적 속도 향상" },
    { icon: "🌡️", name: "자체 온도 관리", val: "내장 가열 시스템으로\n외부 온도 무관 안정적 출력" },
    { icon: "💡", name: "85% 빛 균일도", val: "향상된 광 균일도로\n품질 저하 없는 전면 고른 경화" },
    { icon: "🧪", name: "레진 범용 호환", val: "일반·덴탈·캐스터블·피규어 레진\n다양한 소재 제한 없이 지원" },
    { icon: "🔒", name: "최대 99% 성공률", val: "압력 완화 플랫폼 + 듀얼 가이드\n실패 없는 안정적 장시간 출력" },
];

/* ─────────────── 활용 분야 ─────────────── */
const useCases = [
    { icon: "💍", name: "주얼리 / 공예", val: "캐스터블 레진 원형 제작\n9μm 정밀도로 주조 표준 충족" },
    { icon: "🎨", name: "피규어 / 미니어처", val: "선명한 모서리·머리카락 굵기 디테일\n수집품·아트 피규어 고품질 출력" },
    { icon: "🦷", name: "덴탈 (치과)", val: "치아 보철·교정 트레이·임시 크라운\n가장 빠른 덴탈 전용 DLP 솔루션" },
    { icon: "🏭", name: "프로토타입 제작", val: "시제품 신속 반복 검증\n0.05mm 정확도로 기능성 파트 출력" },
    { icon: "🎓", name: "3D프린팅 교육", val: "NCS 연계 3D프린팅 실습 교육\n활용법부터 소재 교육까지 원스톱" },
    { icon: "🔬", name: "R&D / 연구", val: "마이크로 스케일 연구 모델\n반복 정밀 출력으로 연구 효율화" },
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

            {/* ── Hero ── */}
            <section className={styles.detailHero}>
                <div className={styles.detailHeroContent}>
                    <span className={styles.detailBadge}>WOW3DHD · MSLA / DLP 3D Printer</span>
                    <h1 className={styles.detailTitle}>
                        {heroSlogan}<br />
                        <span className={styles.heroGrad}>MSLA · DLP 3D 프린터</span>
                    </h1>
                    <p className={styles.detailDesc}>{heroSub}</p>
                </div>
            </section>

            <div className={styles.detailBody}>

                {/* ── 모델 카드 ── */}
                <section>
                    <h2 className={styles.sectionTitle}>제품 라인업</h2>
                    <div className={styles.modelGrid}>
                        {models.map(m => (
                            <div key={m.id} className={`${styles.modelCard} ${styles[`model_${m.color}`]}`}>
                                <div className={styles.modelCardTop}>
                                    <span className={`${styles.modelBadge} ${styles[`badge_${m.color}`]}`}>{m.badge}</span>
                                    <h3 className={styles.modelName}>{m.name}</h3>
                                    <p className={styles.modelTagline}>{m.tagline}</p>
                                </div>

                                {/* 핵심 스펙 */}
                                <div className={styles.modelSpecs}>
                                    {m.highlights.map(h => (
                                        <div key={h.k} className={styles.modelSpecRow}>
                                            <span className={styles.modelSpecKey}>{h.k}</span>
                                            <span className={styles.modelSpecVal}>{h.v}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* 주요 기능 */}
                                <ul className={styles.modelFeatureList}>
                                    {m.features.map(f => (
                                        <li key={f} className={styles.modelFeatureItem}>
                                            <span className={styles.modelFeatureDot} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 공통 특징 ── */}
                <section>
                    <h2 className={styles.sectionTitle}>공통 핵심 특징</h2>
                    <div className={styles.featureGrid}>
                        {commonFeatures.map(f => (
                            <div key={f.name} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <div className={styles.featureName}>{f.name}</div>
                                <div className={styles.featureVal} style={{ whiteSpace: 'pre-line' }}>{f.val}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 비교 스펙표 ── */}
                <section>
                    <h2 className={styles.sectionTitle}>모델 사양 비교</h2>
                    <div className={styles.tableWrap}>
                        <table className={styles.specTable}>
                            <thead>
                                <tr>
                                    <th>사양 항목</th>
                                    <th>MSLA P10 (Flagship)</th>
                                    <th>MSLA P7 (Compact)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["LCD", "10인치 8K Mono LCD", "6.6인치 4K Mono LCD"],
                                    ["XY 해상도", "14.85 μm", "9 μm (그레이스케일 조정)"],
                                    ["Z축 정밀도", "7 μm 이내", "–"],
                                    ["인쇄 정확도", "0.05 mm", "0.02 mm 이내"],
                                    ["빌드 볼륨", "228 × 128 × 250 mm", "피규어/주얼리 최적화"],
                                    ["레이어 두께", "–", "25 ~ 150 μm"],
                                    ["광 균일도", "향상된 빛 균일도", "85% 향상"],
                                    ["온도 관리", "자체 가열 시스템", "30°C 실내 자동 유지"],
                                    ["인쇄 성공률", "최대 99%", "고성공률 (한냉지 포함)"],
                                    ["주요 용도", "주얼리·프로토타입·덴탈", "주얼리·피규어·미니어처"],
                                ].map(([item, p10, p7]) => (
                                    <tr key={item}>
                                        <td className={styles.specKey}>{item}</td>
                                        <td>{p10}</td>
                                        <td>{p7}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── 활용 분야 ── */}
                <section>
                    <h2 className={styles.sectionTitle}>활용 분야</h2>
                    <div className={styles.featureGrid}>
                        {useCases.map(u => (
                            <div key={u.name} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{u.icon}</div>
                                <div className={styles.featureName}>{u.name}</div>
                                <div className={styles.featureVal} style={{ whiteSpace: 'pre-line' }}>{u.val}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>데모 출력 & 무료 상담 신청</h2>
                    <p className={styles.ctaDesc}>
                        MSLA P10 / P7 도입을 검토 중이신가요?<br />
                        용도에 맞는 최적 모델과 레진을 전문 담당자가 1:1로 맞춤 추천해 드립니다.
                    </p>
                    <Link href="/contact/" className={styles.ctaBtn}>
                        무료 상담 신청 <ArrowRight size={16} />
                    </Link>
                </section>

            </div>
        </div>
    );
}
