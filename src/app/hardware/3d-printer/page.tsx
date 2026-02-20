"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import styles from "../hardware.module.css";

/* =====================================================
   실제 wow3dhd.co.kr MSLA/DLP 3D 프린터 제품 데이터
   ===================================================== */

const features = [
    { icon: "🎯", name: "초고정밀 광경화 출력", val: "MSLA(Mono LCD) / DLP 방식\nXY 정확도 ±0.05mm 이하 구현" },
    { icon: "⚡", name: "고속 연속 출력", val: "레이어 당 2~5초\n기존 FDM 대비 최대 10배 빠른 속도" },
    { icon: "🧪", name: "다양한 레진 호환", val: "ABS-Like, Dental, 캐스터블\n고강도·유연성·투명 레진 지원" },
    { icon: "💡", name: "독자 광 보정 기술", val: "광 강도 불균일 자동 보정\n출력 성공률 대폭 향상" },
    { icon: "🔧", name: "알루미늄 합금 설계", val: "산업용 정밀 가이드 레일\n고정밀 스크류 로드 탑재" },
    { icon: "🖥️", name: "간편한 운용", val: "직관적인 터치 인터페이스\nChitubox · LycheeSlicer 호환" },
];

/* 모델 라인업 */
const models = [
    {
        model: "WOW-S1",
        type: "MSLA (Mono LCD)",
        buildVol: "130×82×160mm",
        xyRes: "0.051mm (4K LCD)",
        speed: "30~50mm/hr",
        resin: "405nm 범용 레진"
    },
    {
        model: "WOW-D1",
        type: "DLP (프로젝터)",
        buildVol: "192×108×200mm",
        xyRes: "0.050mm",
        speed: "40~60mm/hr",
        resin: "405nm / 385nm 레진"
    },
    {
        model: "WOW-D2 PRO",
        type: "DLP 산업용",
        buildVol: "256×144×280mm",
        xyRes: "0.033mm (8K급)",
        speed: "50~80mm/hr",
        resin: "다종 산업용 레진"
    },
];

/* 상세 사양 (WOW-D1 기준) */
const specs = [
    { key: "광원 방식", val: "DLP (Digital Light Processing) 프로젝터" },
    { key: "광원 파장", val: "405nm UV LED" },
    { key: "빌드 볼륨", val: "192 × 108 × 200mm (WOW-D1 기준)" },
    { key: "XY 해상도", val: "0.050mm (Full HD 기준)" },
    { key: "레이어 두께", val: "0.01 ~ 0.3mm 가변 (Z방향)" },
    { key: "출력 속도", val: "2~5초/레이어" },
    { key: "Z축 리프팅", val: "수입 정밀 가이드 레일 + 고정밀 스크류" },
    { key: "지원 레진", val: "ABS-Like, Dental, Castable, 고강도, 투명" },
    { key: "슬라이싱 SW", val: "Chitubox / LycheeSlicer 호환" },
    { key: "연결 방식", val: "USB / Wi-Fi" },
    { key: "전원", val: "100-240V, 50/60Hz, 10A" },
    { key: "작동 온도", val: "10 ~ 38°C" },
    { key: "기계 중량", val: "15kg 미만" },
    { key: "외형 크기", val: "360 × 270 × 610mm" },
];

const useCases = [
    { icon: "🦷", name: "의료 / 치과", val: "치아 보철·교정·임시 크라운 제작\n정밀 구강 모델 출력" },
    { icon: "💍", name: "주얼리 / 공예", val: "캐스터블 레진으로 왁스 대체\n정밀 금형·귀금속 원형 제작" },
    { icon: "🏭", name: "산업·제조", val: "시제품(프로토타입) 신속 제작\n지그·픽스처·소형 부품 출력" },
    { icon: "🎓", name: "교육 / 연구", val: "3D프린팅 실습 교육 장비\nNCS 교육과정 연계 활용" },
    { icon: "🎨", name: "디자인·모형", val: "건축 모형·캐릭터·피규어 제작\n고정밀 미니어처 출력" },
    { icon: "🔩", name: "R&D / 엔지니어링", val: "정밀 시제품 반복 검증\n빠른 프로토타이핑 사이클" },
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
                    <span className={styles.detailBadge}>MSLA / DLP 3D Printer · WOW Series</span>
                    <h1 className={styles.detailTitle}>
                        고정밀 광경화 방식<br />산업용 MSLA·DLP 3D 프린터
                    </h1>
                    <p className={styles.detailDesc}>
                        독자적인 광 강도 보정 기술과 고정밀 가이드 레일 설계로 출력 성공률을 극대화한
                        (주)와우쓰리디의 MSLA·DLP 3D 프린터 시리즈. 치과·주얼리·교육·산업 현장에 최적화된 솔루션입니다.
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

                {/* Model Lineup */}
                <section>
                    <h2 className={styles.sectionTitle}>WOW 시리즈 모델 라인업</h2>
                    <div className={styles.tableWrap}>
                        <table className={styles.specTable}>
                            <thead>
                                <tr>
                                    <th>모델명</th>
                                    <th>방식</th>
                                    <th>빌드 볼륨</th>
                                    <th>XY 해상도</th>
                                    <th>출력 속도</th>
                                    <th>지원 레진</th>
                                </tr>
                            </thead>
                            <tbody>
                                {models.map(m => (
                                    <tr key={m.model}>
                                        <td className={styles.specKey}>{m.model}</td>
                                        <td>{m.type}</td>
                                        <td>{m.buildVol}</td>
                                        <td>{m.xyRes}</td>
                                        <td>{m.speed}</td>
                                        <td>{m.resin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Detailed Specs */}
                <section>
                    <h2 className={styles.sectionTitle}>상세 사양 (WOW-D1 기준)</h2>
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

                {/* Use Cases */}
                <section>
                    <h2 className={styles.sectionTitle}>활용 분야</h2>
                    <div className={styles.featureGrid}>
                        {useCases.map(item => (
                            <div key={item.name} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{item.icon}</div>
                                <div className={styles.featureName}>{item.name}</div>
                                <div className={styles.featureVal} style={{ whiteSpace: 'pre-line' }}>{item.val}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>도입 문의 & 데모 출력 신청</h2>
                    <p className={styles.ctaDesc}>
                        MSLA·DLP 3D 프린터 도입을 검토 중이신가요?<br />
                        전문 담당자가 용도에 맞는 최적 모델과 레진을 맞춤 추천해 드립니다.
                    </p>
                    <Link href="/contact/" className={styles.ctaBtn}>
                        무료 상담 신청 <ArrowRight size={16} />
                    </Link>
                </section>
            </div>
        </div>
    );
}
