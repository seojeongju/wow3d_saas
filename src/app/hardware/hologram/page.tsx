"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import styles from "../hardware.module.css";

/* =====================================================
   실제 wow3dhd.co.kr 제품 데이터 기반
   ===================================================== */

const features = [
    { icon: "🌀", name: "360° 입체 홀로그램", val: "초소형 RGB LED와 눈의 착시 현상을 이용해\n허공에 제품・로고・영상을 3D로 구현" },
    { icon: "📡", name: "Wi-Fi 원격 제어", val: "전용 앱(iOS/Android)과 웹으로\n콘텐츠를 실시간 업로드 및 제어" },
    { icon: "🔗", name: "멀티 동기화", val: "최대 16대 네트워크 연결 및 동기화\n대형 전시 패널·미디어월 구성 가능" },
    { icon: "💡", name: "고휘도 RGB LED", val: "밝은 실내에서도 선명한 영상 구현\n최대 1600 cd/m² (모델별 상이)" },
    { icon: "🎬", name: "다양한 포맷 지원", val: "MP4 · AVI · RMVB · MPEG · GIF 지원\n자체 제작 콘텐츠 업로드 가능" },
    { icon: "🛡️", name: "높은 내구성", val: "PC 알루미늄 바디 구조\n수명 30,000시간 · 7×24 연속 가동" },
];

/* 모델 라인업 비교표 */
const models = [
    { model: "LDP-42F", diameter: "42cm", led: "448ea", power: "45W", weight: "0.6kg", brightness: "1200 cd/m²" },
    { model: "LDP-50F", diameter: "50cm", led: "512ea", power: "70W", weight: "0.8kg", brightness: "1600 cd/m²" },
    { model: "LDP-65F", diameter: "65cm", led: "704ea", power: "100W", weight: "1.2kg", brightness: "1800 cd/m²" },
    { model: "LDP-72F", diameter: "72cm", led: "768ea", power: "120W", weight: "1.5kg", brightness: "2000 cd/m²" },
    { model: "LDP-85F", diameter: "85cm", led: "896ea", power: "150W", weight: "2.0kg", brightness: "2200 cd/m²" },
    { model: "LDP-100F", diameter: "100cm", led: "1024ea", power: "200W", weight: "2.8kg", brightness: "2500 cd/m²" },
];

/* 기본 사양 (LDP-50F 기준) */
const specs = [
    { key: "디스플레이 방식", val: "LED 팬 블레이드 홀로그래픽 (4-Blade ROE)" },
    { key: "CPU", val: "Quad-Core Cortex™-A7" },
    { key: "저장 공간", val: "8GB 내장 + 외부 USB 확장" },
    { key: "해상도", val: "500,000 픽셀 (LDP-50F 기준)" },
    { key: "프레임률", val: "24fps" },
    { key: "지원 포맷", val: "MP4, AVI, RMVB, MPEG, GIF" },
    { key: "디스플레이 각도", val: "176°" },
    { key: "연결 방식", val: "Wi-Fi / APP / 웹 제어" },
    { key: "제어 앱", val: "iOS / Android 전용 앱" },
    { key: "전원", val: "100-240V AC, 50/60Hz" },
    { key: "작동 온도", val: "-30°C ~ 60°C" },
    { key: "재질", val: "PC 알루미늄" },
    { key: "수명", val: "30,000시간" },
    { key: "적용 환경", val: "실내" },
];

const useCases = [
    { icon: "🏪", name: "리테일 / 매장", val: "제품 홍보·전시, 브랜드 체험존 구성" },
    { icon: "🎓", name: "교육 기관", val: "3D 구조물 시각화, 과학·미술 교육 콘텐츠" },
    { icon: "🏥", name: "의료 / 치과", val: "해부학 구조물, 치아 모형 입체 설명" },
    { icon: "🎪", name: "전시 / 이벤트", val: "박람회 부스, 팝업 스토어 어트랙션" },
    { icon: "📺", name: "광고 / 사이니지", val: "혁신적 OOH 광고, 브랜드 아이덴티티 강화" },
    { icon: "🎮", name: "엔터테인먼트", val: "게임 센터, 테마파크, 미디어아트 설치" },
];

export default function HologramPage() {
    return (
        <div className={styles.detailPage}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link href="/">홈</Link>
                <ChevronRight size={14} />
                <Link href="/hardware/">하드웨어 소개</Link>
                <ChevronRight size={14} />
                <span>3D Hologram Display</span>
            </nav>

            {/* Hero */}
            <section className={styles.detailHero}>
                <div className={styles.detailHeroContent}>
                    <span className={styles.detailBadge}>WOW 3D Hologram · LDP Series</span>
                    <h1 className={styles.detailTitle}>
                        공간의 경계를 넘는<br />3D 홀로그램 디스플레이
                    </h1>
                    <p className={styles.detailDesc}>
                        최첨단 LED 기술과 정밀 제어 시스템으로 제품, 로고, 영상을 허공에 투사하는
                        "경계 없는 디스플레이". (주)와우쓰리디의 LDP 시리즈로 광고·교육·전시 환경을 혁신하세요.
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
                    <h2 className={styles.sectionTitle}>LDP 시리즈 모델 라인업</h2>
                    <div className={styles.tableWrap}>
                        <table className={styles.specTable}>
                            <thead>
                                <tr>
                                    <th>모델명</th>
                                    <th>직경</th>
                                    <th>LED 수</th>
                                    <th>정격 전력</th>
                                    <th>밝기</th>
                                    <th>중량</th>
                                </tr>
                            </thead>
                            <tbody>
                                {models.map(m => (
                                    <tr key={m.model}>
                                        <td className={styles.specKey}>{m.model}</td>
                                        <td>{m.diameter}</td>
                                        <td>{m.led}</td>
                                        <td>{m.power}</td>
                                        <td>{m.brightness}</td>
                                        <td>{m.weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Detailed Spec */}
                <section>
                    <h2 className={styles.sectionTitle}>상세 사양 (LDP-50F 기준)</h2>
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
                                <div className={styles.featureVal}>{item.val}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>도입 문의 & 데모 신청</h2>
                    <p className={styles.ctaDesc}>
                        3D 홀로그램 디스플레이 도입을 검토 중이신가요?<br />
                        전문 담당자가 공간 맞춤 솔루션 및 콘텐츠 제작까지 원스톱으로 지원합니다.
                    </p>
                    <Link href="/contact/" className={styles.ctaBtn}>
                        무료 상담 신청 <ArrowRight size={16} />
                    </Link>
                </section>
            </div>
        </div>
    );
}
