"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Cpu, Thermometer, Zap, Wifi } from "lucide-react";
import styles from "./printer.module.css";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════
   DATA — P-Pro Series 스펙 (PDF 2026-02-19 기준)
══════════════════════════════════════════════════════════════════ */

const MODELS = [
  {
    id: "p7pro",
    name: "P7 Pro",
    series: "9K Series",
    tag: "COMPACT & PRECISION",
    tagColor: "#7c3aed",
    subtitle: "소형 고정밀 — 복잡한 모델에 최적화",
    pitch: "9μm 픽셀·153×77×160mm 빌드 볼륨. 주얼리·피규어 전문 컴팩트 프로급.",
    accentColor: "#7c3aed",
    gradFrom: "#2e1065",
    gradTo: "#0f172a",
    image: "/images/3d-printer/p7-pro.png",
    printerSize: "230 × 230 × 446 mm",
    netWeight: "7.8 kg",
    buildVolume: "153 × 77 × 160 mm",
    lcdResolution: "8520 × 4320 (9K)",
    pixelSize: "9 μm",
    laserSpot: "18 μm",
    features: [
      { icon: "💍", title: "9μm DLP급 정밀도", desc: "Imadjust™ 그레이스케일로 9μm 정확도. 주얼리 주조 표준 충족." },
      { icon: "🌡️", title: "38°C 자동 가열", desc: "내부 자동 가열 38°C. 한냉지에서도 안정적 출력." },
      { icon: "💡", title: "xMat 405nm 광원", desc: "균일한 405nm UV LED로 표면 디테일 선명." },
      { icon: "📏", title: "25~150μm 레이어", desc: "용도별 25~150μm 가변 레이어 두께." },
    ],
    specs: [
      ["빌드 볼륨 (W×D×H)", "153 × 77 × 160 mm"],
      ["LCD 해상도", "8520 × 4320 (9K)"],
      ["픽셀 크기 (Imadjust™)", "9 μm"],
      ["레이저 스팟", "18 μm"],
      ["레이어 두께", "25 ~ 150 μm"],
      ["광원", "405nm UV LED (xMat)"],
      ["기기 크기", "230 × 230 × 446 mm"],
      ["순중량", "7.8 kg"],
      ["전원", "DC 24V 5A, 130W"],
    ],
  },
  {
    id: "p10pro",
    name: "P10 Pro",
    series: "8K Series",
    tag: "VERSATILE MEDIUM",
    tagColor: "#2563eb",
    subtitle: "중형 올라운더 — 볼륨과 디테일의 균형",
    pitch: "228×128×250mm 빌드·14.85μm. 애니메이션·피규어 초고속 데스크탑용.",
    accentColor: "#2563eb",
    gradFrom: "#1e3a5f",
    gradTo: "#0f172a",
    image: "/images/3d-printer/p10-pro.png",
    printerSize: "365 × 380 × 610 mm",
    netWeight: "25.5 kg",
    buildVolume: "228 × 128 × 250 mm",
    lcdResolution: "7680 × 4320 (8K)",
    pixelSize: "14.85 μm",
    laserSpot: "29.7 μm",
    features: [
      { icon: "🎯", title: "99% 출력 성공률", desc: "압력 완화 홀·전용 레진 파라미터로 기계-소재 완벽 매칭." },
      { icon: "🏗️", title: "10인치 최대 빌드", desc: "228×128×250mm로 더 크고 많은 모델을 한 번에 출력." },
      { icon: "🌡️", title: "38°C 챔버 가열", desc: "에어 히팅 프린트 챔버로 환경 18~28°C 대응." },
      { icon: "📦", title: "활성탄 필터 내장", desc: "Built-in Active Carbon으로 작업 환경 개선." },
    ],
    specs: [
      ["빌드 볼륨 (W×D×H)", "228 × 128 × 250 mm"],
      ["LCD 해상도", "7680 × 4320 (8K)"],
      ["픽셀 크기 (Imadjust™)", "14.85 μm"],
      ["레이저 스팟", "29.7 μm"],
      ["레이어 두께", "25 ~ 150 μm"],
      ["광원", "405nm UV LED"],
      ["기기 크기", "365 × 380 × 610 mm"],
      ["순중량", "25.5 kg"],
      ["전원", "220-240 VAC, 350W"],
    ],
  },
  {
    id: "p13pro",
    name: "P13 Pro",
    series: "16K Series",
    tag: "LARGE & ULTRA RES",
    tagColor: "#059669",
    subtitle: "대형·초고해상도 — 산업용 최상급",
    pitch: "302×162×380mm 빌드·10×13μm. 신발 금형·대형 산업 파츠 전용.",
    accentColor: "#059669",
    gradFrom: "#064e3b",
    gradTo: "#0f172a",
    image: "/images/3d-printer/p13-pro.png",
    printerSize: "500 × 420 × 769 mm",
    netWeight: "58 kg",
    buildVolume: "302 × 162 × 380 mm",
    lcdResolution: "15120 × 6230 (16K)",
    pixelSize: "10 × 13 μm",
    laserSpot: "20 × 26 μm",
    features: [
      { icon: "📐", title: "대형 빌드 302×162×380mm", desc: "신발 금형 최대 3개 동시 출력. 380mm 높이 지원." },
      { icon: "✨", title: "16K 초정밀 픽셀", desc: "10×13μm 픽셀·20×26μm 스팟으로 대형에서도 미세 디테일." },
      { icon: "🌡️", title: "35°C 듀얼 히팅", desc: "챔버 35°C 자동 가열. 저온 환경 고성공률." },
      { icon: "💡", title: "91 units LED 매트릭스", desc: "균일 조명으로 대형 파츠 품질 유지." },
    ],
    specs: [
      ["빌드 볼륨 (W×D×H)", "302 × 162 × 380 mm"],
      ["LCD 해상도", "15120 × 6230 (16K)"],
      ["픽셀 크기 (Imadjust™)", "10 × 13 μm"],
      ["레이저 스팟", "20 × 26 μm"],
      ["레이어 두께", "25 ~ 150 μm"],
      ["광원", "405nm UV LED (91 units)"],
      ["기기 크기", "500 × 420 × 769 mm"],
      ["순중량", "58 kg"],
      ["전원", "220-240 VAC, 350W"],
    ],
  },
  {
    id: "p13",
    name: "P13",
    series: "6K Series",
    tag: "LARGE & EFFICIENCY",
    tagColor: "#b45309",
    subtitle: "대형·효율 — 양산 환경 최적화",
    pitch: "277×156×380mm 빌드·25.5μm. 대량 출력·프로덕션 환경용.",
    accentColor: "#d97706",
    gradFrom: "#78350f",
    gradTo: "#0f172a",
    image: "/images/3d-printer/p13.png",
    printerSize: "500 × 420 × 769 mm",
    netWeight: "58 kg",
    buildVolume: "277 × 156 × 380 mm",
    lcdResolution: "5448 × 3064 (6K)",
    pixelSize: "25.5 μm",
    laserSpot: "51 μm",
    features: [
      { icon: "🏭", title: "양산용 대형 빌드", desc: "277×156×380mm로 효율적인 대량 출력." },
      { icon: "⚡", title: "60 mm/h 최대 속도", desc: "공통 60mm/h로 빠른 프로덕션 사이클." },
      { icon: "🌡️", title: "35°C 챔버·활성탄", desc: "자동 가열·Built-in Active Carbon." },
      { icon: "📦", title: "P13 Pro 동일 하우징", desc: "500×420×769mm, 58kg. 공간 효율 공유." },
    ],
    specs: [
      ["빌드 볼륨 (W×D×H)", "277 × 156 × 380 mm"],
      ["LCD 해상도", "5448 × 3064 (6K)"],
      ["픽셀 크기 (Imadjust™)", "25.5 μm"],
      ["레이저 스팟", "51 μm"],
      ["레이어 두께", "25 ~ 150 μm"],
      ["광원", "405nm UV LED"],
      ["기기 크기", "500 × 420 × 769 mm"],
      ["순중량", "58 kg"],
      ["전원", "220-240 VAC, 350W"],
    ],
  },
];

/* 공통 기술 스펙 (PDF) */
const COMMON_SPEC = {
  technology: "MSLA (Mask Stereolithography)",
  wavelength: "405 nm Industrial UV",
  maxSpeed: "60 mm/h",
  layerThickness: "25 – 150 μm",
  material: "405nm UV Resin",
  connectivity: "USB 2.0 / 5.0\" Touch Screen",
  environment: "18 – 28 ℃ (64 – 82 °F)",
};

/* 레진 시리즈 */
const RESIN_SERIES = [
  { id: "general", name: "범용 레진", color: "#2563eb", desc: "프로토타입·교육·디자인 검증용 경제적 범용 레진.", products: [{ name: "X110", use: "표준 범용", feature: "저취·세척 용이" }, { name: "W900", use: "인성 강화", feature: "충격 강도·유연성" }, { name: "RC600", use: "캐스터블", feature: "주조용" }] },
  { id: "engineering", name: "엔지니어링", color: "#059669", desc: "ABS·PLA급 기계적 물성의 기능성 파츠용.", products: [{ name: "Rigid110", use: "경질 ABS형", feature: "고강도·내열" }, { name: "ABS110", use: "ABS형", feature: "내충격" }, { name: "Elastic600", use: "탄성체", feature: "고탄성" }] },
  { id: "jewelry", name: "주얼리&조각", color: "#d97706", desc: "주얼리 주조·피규어·미니어처 전용 캐스터블.", products: [{ name: "RC900", use: "골드·실버 주조", feature: "완전 연소" }, { name: "RC800", use: "고정밀 캐스터블", feature: "극세 디테일" }] },
  { id: "dental", name: "덴탈", color: "#dc2626", desc: "치과 임상용 의료급 덴탈 레진.", products: [{ name: "DM550", use: "임시 크라운·브릿지", feature: "생체 적합" }] },
];

/* 기술 우위 */
const TECH_ADVANTAGES = [
  { icon: "🔬", title: "그레이스케일 XY 픽셀 (Imadjust™)", desc: "XY 픽셀 그레이스케일 조정으로 DLP급 디테일 성능을 구현합니다." },
  { icon: "📈", title: "60 mm/h 공통 최대 속도", desc: "전 모델 60 mm/h 최대 출력 속도로 효율적인 프로덕션." },
  { icon: "🌡️", title: "챔버 온도 제어", desc: "에어 히팅 프린트 챔버·18~28℃ 환경. 모델별 35~38℃ 내부 가열." },
  { icon: "🛠️", title: "전문 A/S 지원", desc: "전문 엔지니어 기반 사후지원 및 기술 백업." },
];

/* 제품 인증 현황 */
const CERTIFICATIONS = [
  {
    title: "KC 인증",
    subtitle: "적합등록 필증",
    desc: "방송통신기자재등의 적합등록 (모델명: DP-P7, P9, P13)",
    image: "/images/certification/kc-cert.png"
  },
  {
    title: "직접생산확인증명서",
    subtitle: "중소기업중앙회",
    desc: "3차원프린터 직접 생산 시설 및 공정 보유 공식 인증",
    image: "/images/certification/production-patent.png"
  },
  {
    title: "특허등록증",
    subtitle: "특허청",
    desc: "복합소재 성형용 3D프린팅 장치 기술 특허 보유",
    image: "/images/certification/production-patent.png"
  },
  {
    title: "입찰참가자격등록",
    subtitle: "조달청",
    desc: "국가종합전자조달시스템 경쟁입찰참가자격 공식 등록",
    image: "/images/certification/tendering-cert.png"
  }
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
        <span>P-Pro Series 3D 프린터</span>
      </nav>

      {/* ── 히어로: P-Pro Series 소개 ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>Professional Grade 3D Printer</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleMain}>P-Pro Series</span>
            <span className={styles.heroTitleSub}>Technical Specifications & Performance</span>
          </h1>
          <p className={styles.heroDesc}>
            MSLA (Mask Stereolithography) · 405nm Industrial UV · 최대 60 mm/h · 레이어 25–150 μm
          </p>
          <div className={styles.heroSpecPills}>
            <span><strong>Technology</strong> {COMMON_SPEC.technology}</span>
            <span><strong>Wavelength</strong> {COMMON_SPEC.wavelength}</span>
            <span><strong>Max Speed</strong> {COMMON_SPEC.maxSpeed}</span>
            <span><strong>Layer</strong> {COMMON_SPEC.layerThickness}</span>
          </div>
        </div>
      </section>

      {/* ── 제품 갤러리 ── */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryInner}>
          <h2 className={styles.sectionHeading}>제품 라인업</h2>
          <p className={styles.sectionSub}>* 사이즈 정보는 반올림된 수치일 수 있습니다. (W×D×H)</p>
          <div className={styles.galleryGrid}>
            {MODELS.map((m) => (
              <article
                key={m.id}
                className={`${styles.galleryCard} ${activeModel === m.id ? styles.galleryCardActive : ""}`}
                style={activeModel === m.id ? { "--card-accent": m.accentColor } as React.CSSProperties : {}}
                onClick={() => setActiveModel(m.id)}
              >
                <div className={styles.galleryCardImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.image} alt={m.name} className={styles.galleryCardImage} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className={styles.galleryCardPlaceholder} style={{ background: `linear-gradient(135deg, ${m.gradFrom} 0%, ${m.gradTo} 100%)` }}>
                    <span className={styles.galleryCardPlaceholderText}>{m.series}</span>
                    <span className={styles.galleryCardPlaceholderName}>{m.name}</span>
                  </div>
                </div>
                <div className={styles.galleryCardBody}>
                  <span className={styles.galleryCardSeries} style={{ color: m.accentColor }}>{m.series}</span>
                  <h3 className={styles.galleryCardName}>{m.name}</h3>
                  <p className={styles.galleryCardDesc}>{m.subtitle}</p>
                  <dl className={styles.galleryCardSpecs}>
                    <div><dt>Printer Size</dt><dd>{m.printerSize}</dd></div>
                    <div><dt>Net Weight</dt><dd>{m.netWeight}</dd></div>
                    <div><dt>Build Volume</dt><dd>{m.buildVolume}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 모델 탭 (선택 강조) ── */}
      <section className={styles.tabSection}>
        <div className={styles.tabInner}>
          <div className={styles.modelTabRow}>
            {MODELS.map((m) => (
              <button
                key={m.id}
                className={`${styles.modelTab} ${activeModel === m.id ? styles.modelTabActive : ""}`}
                style={activeModel === m.id ? { "--tab-color": m.accentColor } as React.CSSProperties : {}}
                onClick={() => setActiveModel(m.id)}
              >
                <span className={styles.modelTabTag} style={{ background: m.tagColor }}>{m.series}</span>
                {m.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 모델 상세 패널 ── */}
      <section
        className={styles.modelPanel}
        style={{ background: `linear-gradient(170deg, ${model.gradFrom} 0%, ${model.gradTo} 100%)` }}
      >
        <div className={styles.modelPanelInner}>
          <div className={styles.modelPanelLeft}>
            <span className={styles.modelPanelTag} style={{ background: model.tagColor + "33", color: model.accentColor, border: `1px solid ${model.accentColor}55` }}>
              {model.tag}
            </span>
            <h2 className={styles.modelPanelName}>{model.name}</h2>
            <p className={styles.modelPanelSubtitle}>{model.subtitle}</p>
            <p className={styles.modelPanelPitch}>{model.pitch}</p>
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

      {/* ── 전체 스펙 비교표 (PDF 기준 4모델) ── */}
      <section className={styles.compareSection}>
        <div className={styles.compareInner}>
          <h2 className={styles.sectionHeading}>주요 스펙 비교</h2>
          <div className={styles.tableScroll}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th className={styles.ctHead}>사양</th>
                  {MODELS.map((m) => (
                    <th key={m.id} className={styles.ctHead} style={activeModel === m.id ? { color: m.accentColor } : {}}>{m.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "빌드 볼륨 (W×D×H)", vals: ["153.36×77.76×160 mm", "228.1×128.3×250 mm", "302.4×161.98×380 mm", "277.85×156.06×380 mm"] },
                  { label: "LCD 해상도", vals: ["8520×4320 (9K)", "7680×4320 (8K)", "15120×6230 (16K)", "5448×3064 (6K)"] },
                  { label: "픽셀 크기", vals: ["9 μm", "14.85 μm", "10×13 μm", "25.5 μm"] },
                  { label: "레이저 스팟", vals: ["18 μm", "29.7 μm", "20×26 μm", "51 μm"] },
                  { label: "레이어 두께", vals: ["25–150 μm", "25–150 μm", "25–150 μm", "25–150 μm"] },
                  { label: "최대 속도", vals: ["60 mm/h", "60 mm/h", "60 mm/h", "60 mm/h"] },
                  { label: "광원", vals: ["405nm UV LED", "405nm UV LED", "405nm UV LED", "405nm UV LED"] },
                  { label: "소재", vals: ["405nm UV Resin", "405nm UV Resin", "405nm UV Resin", "405nm UV Resin"] },
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

      {/* ── 하드웨어 스펙 (PDF) ── */}
      <section className={styles.hardwareSection}>
        <div className={styles.hardwareInner}>
          <h2 className={styles.sectionHeading}>하드웨어 스펙</h2>
          <div className={styles.hardwareGrid}>
            <div className={styles.hardwareCard}>
              <Thermometer className={styles.hwIcon} />
              <h3>온도·환경</h3>
              <p>Air-heated print chamber · 환경 18–28℃ (64–82°F)</p>
              <ul>
                <li>P7 Pro: 자동 가열 38°C</li>
                <li>P10 Pro: 자동 가열 38°C</li>
                <li>P13 Pro / P13: 자동 가열 35°C</li>
              </ul>
            </div>
            <div className={styles.hardwareCard}>
              <Wifi className={styles.hwIcon} />
              <h3>연결</h3>
              <p>USB 2.0 / 5.0" Touch Screen</p>
            </div>
            <div className={styles.hardwareCard}>
              <Zap className={styles.hwIcon} />
              <h3>전원</h3>
              <p>P7 Pro: DC 24V 5A, 130W</p>
              <p>P10 Pro / P13 시리즈: 220–240 VAC, 350W</p>
            </div>
            <div className={styles.hardwareCard}>
              <Cpu className={styles.hwIcon} />
              <h3>기타</h3>
              <p>P10 Pro / P13 시리즈: Built-in Active Carbon (공기 정화)</p>
              <p>P13 Pro / P13: 91 units LED Matrix</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 제품 인증 현황 ── */}
      <section className={styles.certSection}>
        <div className={styles.certInner}>
          <h2 className={styles.sectionHeading}>(주)와우쓰리디 제품인증현황</h2>
          <p className={styles.sectionSub}>(주)와우쓰리디는 품질과 기술력을 입증하는 국가 공인 인증 및 특허를 보유하고 있습니다.</p>
          <div className={styles.certGrid}>
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className={styles.certCard}>
                <div className={styles.certImageWrap}>
                  <Image src={cert.image} alt={cert.title} className={styles.certImg} width={400} height={533} />
                </div>
                <div className={styles.certInfo}>
                  <span className={styles.certSubtitle}>{cert.subtitle}</span>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.certDesc}>{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 호환 레진 ── */}
      <section className={styles.resinSection}>
        <div className={styles.resinInner}>
          <h2 className={styles.sectionHeading}>호환 레진 소재</h2>
          <p className={styles.sectionSub}>405nm UV 광원 기반 — 산업·주얼리·덴탈 응용</p>
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
          <h2 className={styles.techHeading}>핵심 기술 우위</h2>
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
            용도에 맞는 P-Pro 모델과 레진을 1:1 맞춤 추천해 드립니다.<br />
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
