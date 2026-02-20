"use client";

import Link from "next/link";
import { Monitor, Eye, Wifi, ArrowRight, ChevronRight } from "lucide-react";
import styles from "../hardware.module.css";

const features = [
    { icon: "🌀", name: "홀로그램 구현", val: "LED 팬 블레이드 방식\n360° 공중 부양 영상 구현" },
    { icon: "💡", name: "밝기 & 선명도", val: "고휘도 RGB LED\n실내 어두운 환경 최적화" },
    { icon: "📡", name: "원격 제어", val: "Wi-Fi / App 콘텐츠 전송\n실시간 원격 업데이트" },
    { icon: "🎬", name: "콘텐츠 지원", val: "MP4, AVI, GIF 포맷\n자체 제작 CC 영상 지원" },
    { icon: "🔗", name: "멀티 동기화", val: "최대 16대 동기화 연결\n대형 전시 패널 구성 가능" },
    { icon: "🛡️", name: "내구성", val: "알루미늄 바디 구조\n7×24 연속 가동 지원" },
];

const specs = [
    { key: "디스플레이 방식", val: "LED 팬 블레이드 홀로그래픽" },
    { key: "직경", val: "30cm / 43cm / 65cm 선택" },
    { key: "LED 수", val: "192 ~ 576ea (모델별 상이)" },
    { key: "해상도", val: "최대 1024 × 1024px (원형 기준)" },
    { key: "밝기", val: "최대 2000 cd/m² (고휘도 모델)" },
    { key: "RPM", val: "700 ~ 800 RPM (소음 최소화)" },
    { key: "지원 포맷", val: "MP4, AVI, GIF, PNG" },
    { key: "연결 방식", val: "Wi-Fi 802.11 b/g/n, USB" },
    { key: "제어 앱", val: "iOS / Android 전용 앱 제공" },
    { key: "멀티 동기화", val: "최대 16대 네트워크 동기화" },
    { key: "전원", val: "DC 12V / 5A" },
    { key: "무게", val: "약 0.9 ~ 2.5kg (모델별 상이)" },
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
                    <span className={styles.detailBadge}>Hologram Display</span>
                    <h1 className={styles.detailTitle}>
                        공간을 바꾸는<br />3D 홀로그램 디스플레이
                    </h1>
                    <p className={styles.detailDesc}>
                        LED 팬 방식의 3D 홀로그램 디스플레이로 제품 전시, 교육 콘텐츠, 상업 광고까지
                        독보적인 시각적 임팩트를 선사합니다. (주)와우쓰리디의 하드웨어 솔루션입니다.
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

                {/* Use Cases */}
                <section>
                    <h2 className={styles.sectionTitle}>활용 분야</h2>
                    <div className={styles.featureGrid}>
                        {[
                            { icon: "🏪", name: "리테일 / 매장", val: "제품 홍보·전시, 브랜드 체험존 구성" },
                            { icon: "🎓", name: "교육 기관", val: "3D 구조물 시각화, 과학·미술 교육 콘텐츠" },
                            { icon: "🏥", name: "의료 / 치과", val: "해부학 구조물, 치아 모형 입체 설명" },
                            { icon: "🎪", name: "전시 / 이벤트", val: "박람회 부스, 팝업 스토어 어트랙션" },
                        ].map(item => (
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
                        3D 홀로그램 디스플레이 도입을 검토 중이신가요? 전문 담당자가 맞춤 상담을 제공합니다.
                    </p>
                    <Link href="/contact/" className={styles.ctaBtn}>
                        무료 상담 신청 <ArrowRight size={16} />
                    </Link>
                </section>
            </div>
        </div>
    );
}
