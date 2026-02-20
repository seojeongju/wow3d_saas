"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import styles from "./printer.module.css";

/* ══════════════════════════════════════════════
   DATA — Magforms 실제 스펙 기반 (한국어)
══════════════════════════════════════════════ */

const MODELS = [
    {
        id: "p10pro",
        name: "P10 Pro",
        tag: "FLAGSHIP",
        tagColor: "#2563eb",
        subtitle: "애니메이션·피규어 초고속 데스크탑 3D 프린터",
        pitch: "P10 Pro — 사용자 친화적 설계로 작업 효율을 높이세요.",
        accentColor: "#2563eb",
        gradFrom: "#1e3a5f",
        gradTo: "#0f172a",
        features: [
            {
                icon: "🎯",
                title: "99% 출력 성공률",
                desc: "제작 플랫폼에 압력 완화 홀을 추가하여 레진 압력을 줄이고, 전용 레진 파라미터로 기계와 소재의 완벽한 매칭을 실현합니다.",
            },
            {
                icon: "🏗️",
                title: "업계 최대 빌드 볼륨",
                desc: "10인치 제품군 중 최대 크기인 228×128×250mm 빌드 볼륨으로 더 크고 더 많은 모델을 한 번에 출력하세요.",
            },
            {
                icon: "⚙️",
                title: "산업용 Z축 모듈 · 스틸 외장",
                desc: "산업용 고정밀 듀얼 가이드 레일 + 리드 스크류로 0.01mm 이내 정밀도 제어. 서비스 수명을 대폭 연장합니다.",
            },
            {
                icon: "🔩",
                title: "빠른 분리식 설치",
                desc: "절단 없이 빠른 분리 설치 — 비파괴 소재의 논스틱 표면으로 출력물 제거가 쉽고 안전합니다.",
            },
            {
                icon: "🌡️",
                title: "그레이스케일 XY 픽셀 관리",
                desc: "Imadjust™ 기술로 XY 픽셀을 그레이스케일 조정하여 DLP 프린터 수준의 정밀 디테일을 구현합니다.",
            },
            {
                icon: "📦",
                title: "오프라인·오픈 시스템",
                desc: "기기에서 직접 파라미터 설정 가능. 내장 저장소로 오프라인 출력 지원. 맞춤 모듈을 포함한 개방형 시스템.",
            },
        ],
        specs: [
            ["빌드 볼륨 (W×D×H)", "228 × 128 × 250 mm"],
            ["XY 해상도 (Imadjust™)", "14.85 μm"],
            ["Z축 정밀도", "0.01 mm 이내"],
            ["LCD", "10인치 13312×5120 Mono LCD"],
            ["레이어 두께", "소재 따라 가변"],
            ["내부 온도", "자체 가열 시스템"],
            ["광원", "405nm UV LED"],
            ["출력 성공률", "최대 99%"],
            ["무게", "약 9 kg"],
        ],
    },
    {
        id: "p13pro",
        name: "P13 Pro",
        tag: "LARGE FORMAT",
        tagColor: "#059669",
        subtitle: "대형 신발 금형·산업 파츠 전용 대형 LCD 프린터",
        pitch: "302.4×161.98×380mm — 신발 금형 최대 사이즈를 동시에 3개 인쇄.",
        accentColor: "#059669",
        gradFrom: "#064e3b",
        gradTo: "#0f172a",
        features: [
            {
                icon: "📐",
                title: "302.4×161.98×380mm 대형 빌드",
                desc: "일반 신발 금형 3개를 동시에 출력. 최대 380mm 신발 금형 사이즈까지 지원합니다.",
            },
            {
                icon: "🖥️",
                title: "기기 직접 파라미터 설정",
                desc: "오픈 시스템 + 커스텀 모듈 탑재. 내장 저장소로 오프라인 출력을 실현합니다.",
            },
            {
                icon: "✨",
                title: "대형 파츠 고품질 유지",
                desc: "대형 출력에서도 높은 정밀도와 매끈한 표면 — 프린팅 라인이 거의 보이지 않습니다.",
            },
            {
                icon: "🌡️",
                title: "듀얼 히팅 아웃렛",
                desc: "2개의 히팅 아웃렛으로 챔버 내 열을 균일하게 분산. 저온 환경에서도 높은 성공률을 보장합니다.",
            },
            {
                icon: "💡",
                title: "자동 감지 조명",
                desc: "자동 감지 설계로 어두운 환경에서도 출력실을 선명하게 확인. 레진 경화 영향 없음(테스트 완료).",
            },
            {
                icon: "🔮",
                title: "초저항 픽셀 마스킹",
                desc: "16.8×24.8μm의 초정밀 픽셀 마스킹으로 복잡한 대형 파츠의 세부 묘사를 완벽 재현합니다.",
            },
        ],
        specs: [
            ["빌드 볼륨 (W×D×H)", "302.4 × 161.98 × 380 mm"],
            ["XY 해상도 (Imadjust™)", "16.8 × 24.8 μm"],
            ["LCD", "13인치 Mono LCD"],
            ["레이어 두께", "소재 따라 가변"],
            ["내부 온도", "듀얼 히팅 시스템"],
            ["광원", "405nm UV LED"],
            ["특이사항", "신발 금형 최대 3개 동시 출력"],
            ["파라미터 설정", "기기 직접 설정 + 오프라인"],
        ],
    },
    {
        id: "p7pro",
        name: "P7 Pro",
        tag: "JEWELRY",
        tagColor: "#7c3aed",
        subtitle: "주얼리 주조 전문 · 강력하고 신뢰할 수 있는 전문가용",
        pitch: "9μm 정밀도 — DLP 프린팅 수준의 디테일로 주얼리 주조 표준을 충족합니다.",
        accentColor: "#7c3aed",
        gradFrom: "#2e1065",
        gradTo: "#0f172a",
        features: [
            {
                icon: "💍",
                title: "9μm DLP 수준 정밀도",
                desc: "그레이스케일 조정 프로그램(Imadjust™)으로 9μm 정확도 달성. DLP 프린터에 비견되는 디테일 성능으로 주얼리 주조 표준을 충족합니다.",
            },
            {
                icon: "🌡️",
                title: "한냉지 보장 성공률",
                desc: "인쇄실 내부를 30°C로 유지하는 온도 관리 시스템. 추운 날씨에도 높은 성공률을 유지하며 다양한 소재에 적합합니다.",
            },
            {
                icon: "💡",
                title: "균일 광원 · 0.02mm 이내",
                desc: "P7 Pro의 균일한 광원이 인쇄 정확도를 0.02mm 이내로 제어하여 주얼리 같은 정밀 모델의 표면 디테일을 더욱 선명하게 표현합니다.",
            },
            {
                icon: "📏",
                title: "25~150μm 가변 레이어",
                desc: "용도에 맞게 25~150μm 범위에서 레이어 두께를 자유롭게 조절. 속도와 정밀도 사이의 최적점을 선택하세요.",
            },
            {
                icon: "🧪",
                title: "폭넓은 레진 호환성",
                desc: "캐스터블·일반·덴탈 레진 등 다양한 소재와 호환. 온도 독립적으로 폭넓은 재료 사용이 가능합니다.",
            },
            {
                icon: "✨",
                title: "선명한 모서리 · 미세 디테일",
                desc: "머리카락 굵기 수준의 미세한 디테일과 선명한 모서리 표현. 85% 향상된 빛 균일도가 뒷받침합니다.",
            },
        ],
        specs: [
            ["빌드 볼륨 (W×D×H)", "주얼리·피규어 최적화"],
            ["XY 해상도 (Imadjust™)", "9 μm"],
            ["인쇄 정확도", "0.02 mm 이내"],
            ["LCD", "6.6인치 4K Mono LCD"],
            ["레이어 두께", "25 ~ 150 μm"],
            ["내부 온도", "30°C 자동 유지"],
            ["광원", "405nm UV LED"],
            ["빛 균일도", "85% 향상"],
        ],
    },
];

/* 레진 시리즈 */
const RESIN_SERIES = [
    {
        id: "general",
        name: "범용 레진",
        color: "#2563eb",
        desc: "일상적인 프로토타입·교육·디자인 검증에 최적화된 경제적인 범용 레진 시리즈.",
        products: [
            { name: "X110", use: "표준 범용", feature: "저취·세척 용이·빠른 경화" },
            { name: "W900", use: "인성 강화", feature: "높은 충격 강도·우수한 유연성" },
            { name: "RC600", use: "캐스터블", feature: "연소 잔재물 최소화·주조용" },
        ],
    },
    {
        id: "engineering",
        name: "엔지니어링 레진",
        color: "#059669",
        desc: "ABS·PLA 수준의 기계적 물성을 갖춘 기능성 파츠 제작용 고성능 레진 시리즈.",
        products: [
            { name: "Rigid110", use: "경질 ABS형", feature: "고강도·내열·치수 안정성" },
            { name: "ABS110", use: "ABS형", feature: "내충격·복잡 파츠 적합" },
            { name: "Elastic600", use: "탄성체형", feature: "고탄성·반복 변형 내구성" },
        ],
    },
    {
        id: "jewelry",
        name: "주얼리&조각 레진",
        color: "#d97706",
        desc: "주얼리 주조·피규어·미니어처에 특화된 초정밀 캐스터블 레진 시리즈.",
        products: [
            { name: "RC900", use: "골드·실버 주조", feature: "완전 연소·잔재 0.01% 미만" },
            { name: "RC800", use: "고정밀 캐스터블", feature: "극세 디테일·내열성 우수" },
            { name: "RC600", use: "범용 캐스터블", feature: "연소 잔재물 최소화" },
        ],
    },
    {
        id: "dental",
        name: "덴탈 레진",
        color: "#dc2626",
        desc: "치과 임상에서 즉시 사용 가능한 의료급 덴탈 전용 레진 시리즈.",
        products: [
            { name: "DM550", use: "임시 크라운·브릿지", feature: "생체 적합·내열·내마모성" },
        ],
    },
    {
        id: "clear",
        name: "클리어 레진",
        color: "#0891b2",
        desc: "고투명도가 필요한 광학 파츠·디스플레이 케이스·예술 작품용 투명 레진.",
        products: [
            { name: "CRYS100", use: "고투명 크리스탈", feature: "95% 투과율·황변 저항성" },
        ],
    },
];

/* 기술 우위 */
const TECH_ADVANTAGES = [
    {
        icon: "🔬",
        title: "그레이스케일 XY 픽셀 조정",
        desc: "XY 픽셀의 그레이스케일 조정을 통해 DLP 프린터로 출력한 것과 동일한 모델 디테일 성능을 구현합니다.",
    },
    {
        icon: "📈",
        title: "6μm 정밀도 · 높은 성공률",
        desc: "안정적인 출력으로 고성공률을 유지하며, 모델 정확도는 6μm까지 도달 가능합니다.",
    },
    {
        icon: "🌡️",
        title: "온도 독립적 다소재 출력",
        desc: "외부 온도에 관계없이 다양한 소재를 안정적으로 출력할 수 있는 자체 온도 관리 시스템.",
    },
    {
        icon: "🛠️",
        title: "전문가 A/S 지원 체계",
        desc: "전문 엔지니어와 숙련된 기술자로 구성된 사후지원 팀이 기술적 백업을 제공합니다.",
    },
];

export default function PrinterPage() {
    const [activeModel, setActiveModel] = useState("p10pro");
    const [activeResin, setActiveResin] = useState("general");

    const model = MODELS.find((m) => m.id === activeModel)!;
    const resin = RESIN_SERIES.find((r) => r.id === activeResin)!;

    return (
        <div className={styles.page}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link href="/">홈</Link>
                <ChevronRight size={13} />
                <Link href="/hardware/">하드웨어 소개</Link>
                <ChevronRight size={13} />
                <span>MSLA-DLP 3D 프린터</span>
            </nav>

            {/* ── 상단 히어로 ── */}
            <section className={styles.pageHero}>
                <div className={styles.pageHeroInner}>
                    <span className={styles.pageBadge}>WOW3DHD · PROFESSIONAL SERIES</span>
                    <h1 className={styles.pageTitle}>
                        전문가를 위한<br />
                        <span className={styles.pageTitleGrad}>MSLA · DLP 3D 프린터</span>
                    </h1>
                    <p className={styles.pageDesc}>
                        피규어·주얼리·덴탈·대형 산업 파츠까지 — 산업에 적용 가능한 솔루션을 제공합니다.
                    </p>

                    {/* 모델 탭 */}
                    <div className={styles.modelTabRow}>
                        {MODELS.map((m) => (
                            <button
                                key={m.id}
                                className={`${styles.modelTab} ${activeModel === m.id ? styles.modelTabActive : ""}`}
                                style={activeModel === m.id ? { "--tab-color": m.accentColor } as React.CSSProperties : {}}
                                onClick={() => setActiveModel(m.id)}
                            >
                                <span className={styles.modelTabTag} style={{ background: m.tagColor }}>{m.tag}</span>
                                {m.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 모델 상세 패널 ── */}
            <section
                className={styles.modelPanel}
                style={{
                    background: `linear-gradient(170deg, ${model.gradFrom} 0%, ${model.gradTo} 100%)`,
                }}
            >
                <div className={styles.modelPanelInner}>
                    {/* 좌: 텍스트 */}
                    <div className={styles.modelPanelLeft}>
                        <span
                            className={styles.modelPanelTag}
                            style={{ background: model.tagColor + "33", color: model.accentColor, border: `1px solid ${model.accentColor}55` }}
                        >
                            {model.tag}
                        </span>
                        <h2 className={styles.modelPanelName}>{model.name}</h2>
                        <p className={styles.modelPanelSubtitle}>{model.subtitle}</p>
                        <p className={styles.modelPanelPitch}>{model.pitch}</p>

                        {/* 핵심 스펙 빠른 표 */}
                        <div className={styles.modelQuickSpecs}>
                            {model.specs.slice(0, 4).map(([k, v]) => (
                                <div key={k} className={styles.modelQuickSpec}>
                                    <span className={styles.mqKey}>{k}</span>
                                    <span className={styles.mqVal}>{v}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/contact/" className={styles.modelCta} style={{ background: model.accentColor }}>
                            도입 문의하기 <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* 우: 특징 그리드 */}
                    <div className={styles.modelPanelRight}>
                        {model.features.map((f) => (
                            <div key={f.title} className={styles.modelFeatureCard}>
                                <div className={styles.mfcIcon}>{f.icon}</div>
                                <div>
                                    <div className={styles.mfcTitle}>{f.title}</div>
                                    <div className={styles.mfcDesc}>{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 전체 스펙 비교표 ── */}
            <section className={styles.compareSection}>
                <div className={styles.compareInner}>
                    <h2 className={styles.sectionHeading}>모델 사양 비교</h2>
                    <div className={styles.tableScroll}>
                        <table className={styles.compareTable}>
                            <thead>
                                <tr>
                                    <th className={styles.ctHead}>사양</th>
                                    {MODELS.map((m) => (
                                        <th key={m.id} className={styles.ctHead} style={activeModel === m.id ? { color: m.accentColor } : {}}>
                                            {m.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: "빌드 볼륨", vals: ["228×128×250 mm", "302.4×161.98×380 mm", "주얼리 최적화"] },
                                    { label: "XY 해상도", vals: ["14.85 μm", "16.8×24.8 μm", "9 μm (Imadjust™)"] },
                                    { label: "인쇄 정확도", vals: ["0.01 mm 이내", "고정밀", "0.02 mm 이내"] },
                                    { label: "LCD", vals: ["10인치 8K Mono", "13인치 Mono", "6.6인치 4K Mono"] },
                                    { label: "레이어 두께", vals: ["소재 의존", "소재 의존", "25~150 μm"] },
                                    { label: "내부 온도", vals: ["자체 가열", "듀얼 히팅", "30°C 자동 유지"] },
                                    { label: "출력 성공률", vals: ["최대 99%", "고성공률", "한냉지 고성공률"] },
                                    { label: "주요 용도", vals: ["피규어·프로토타입", "신발 금형·산업 파츠", "주얼리·덴탈"] },
                                ].map((row) => (
                                    <tr key={row.label}>
                                        <td className={styles.ctKey}>{row.label}</td>
                                        {row.vals.map((v, i) => (
                                            <td
                                                key={i}
                                                className={`${styles.ctVal} ${MODELS[i].id === activeModel ? styles.ctValActive : ""}`}
                                                style={MODELS[i].id === activeModel ? { borderTop: `2px solid ${model.accentColor}` } : {}}
                                            >
                                                {v}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 레진 소재 시리즈 ── */}
            <section className={styles.resinSection}>
                <div className={styles.resinInner}>
                    <h2 className={styles.sectionHeading}>호환 레진 소재 시리즈</h2>
                    <p className={styles.sectionSub}>405nm UV 광원 기반 — 산업·주얼리·덴탈 응용에 최적화된 전문가용 레진</p>

                    {/* 레진 탭 */}
                    <div className={styles.resinTabs}>
                        {RESIN_SERIES.map((r) => (
                            <button
                                key={r.id}
                                className={`${styles.resinTab} ${activeResin === r.id ? styles.resinTabActive : ""}`}
                                style={activeResin === r.id ? { borderColor: r.color, color: r.color } : {}}
                                onClick={() => setActiveResin(r.id)}
                            >
                                {r.name}
                            </button>
                        ))}
                    </div>

                    {/* 레진 패널 */}
                    <div className={styles.resinPanel}>
                        <div className={styles.resinPanelHeader} style={{ borderLeft: `4px solid ${resin.color}` }}>
                            <h3 className={styles.resinPanelTitle} style={{ color: resin.color }}>{resin.name}</h3>
                            <p className={styles.resinPanelDesc}>{resin.desc}</p>
                        </div>
                        <div className={styles.resinCards}>
                            {resin.products.map((p) => (
                                <div key={p.name} className={styles.resinCard} style={{ borderTop: `3px solid ${resin.color}` }}>
                                    <div className={styles.rcName}>{p.name}</div>
                                    <div className={styles.rcUse} style={{ color: resin.color }}>{p.use}</div>
                                    <div className={styles.rcFeature}>{p.feature}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 기술 우위 ── */}
            <section className={styles.techSection}>
                <div className={styles.techInner}>
                    <h2 className={styles.sectionHeading} style={{ color: "#ffffff" }}>핵심 기술 우위</h2>
                    <div className={styles.techGrid}>
                        {TECH_ADVANTAGES.map((t) => (
                            <div key={t.title} className={styles.techCard}>
                                <div className={styles.techIcon}>{t.icon}</div>
                                <h3 className={styles.techTitle}>{t.title}</h3>
                                <p className={styles.techDesc}>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaInner}>
                    <h2 className={styles.ctaTitle}>데모 출력 & 무료 도입 상담</h2>
                    <p className={styles.ctaDesc}>
                        용도에 맞는 최적 모델과 레진을 전문 담당자가 1:1로 맞춤 추천해 드립니다.<br />
                        WOW3DHD · (주)와우쓰리디에 문의하세요.
                    </p>
                    <Link href="/contact/" className={styles.ctaBtn}>
                        무료 상담 신청 <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
