"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2, Wifi, Zap, Smartphone, Layers, Layout, Maximize } from "lucide-react";
import styles from "./hologram.module.css";

/* ═══════════════════════════════════════════════════════
   데이터 정의 (기존 데이터 유지 및 확장)
   ═══════════════════════════════════════════════════════ */

const features = [
    { icon: <Maximize size={24} />, name: "360° 입체 홀로그램", val: "초소형 RGB LED와 눈의 착시 현상을 이용해 허공에 제품・로고・영상을 3D로 구현합니다." },
    { icon: <Wifi size={24} />, name: "Wi-Fi 원격 제어", val: "전용 앱(iOS/Android)과 웹으로 콘텐츠를 실시간 업로드하고 제어할 수 있습니다." },
    { icon: <Layers size={24} />, name: "멀티 동기화", val: "최대 16대 네트워크 연결 및 동기화를 통해 대형 전시 패널과 미디어월을 구성합니다." },
    { icon: <Zap size={24} />, name: "고휘도 RGB LED", val: "최대 2500 cd/m²의 밝기로 밝은 실내 및 전시장에서도 선명한 영상을 보장합니다." },
    { icon: <Layout size={24} />, name: "다양한 포맷 지원", val: "MP4, AVI, GIF 등 주요 영상·이미지 포맷을 지원하며 자체 콘텐츠 업로드가 가능합니다." },
    { icon: <Smartphone size={24} />, name: "스마트 제어", val: "밝기 조절, 각도 조정, 블루투스 오디오 연동 등 지능형 원격 제어 기능을 제공합니다." },
];

const models = [
    { model: "LDP-42F", diameter: "42cm", led: "448ea", power: "45W", weight: "0.6kg", brightness: "1200 cd/m²" },
    { model: "LDP-50F", diameter: "50cm", led: "512ea", power: "70W", weight: "0.8kg", brightness: "1600 cd/m²" },
    { model: "LDP-65F", diameter: "65cm", led: "704ea", power: "100W", weight: "1.2kg", brightness: "1800 cd/m²" },
    { model: "LDP-72F", diameter: "72cm", led: "768ea", power: "120W", weight: "1.5kg", brightness: "2000 cd/m²" },
    { model: "LDP-85F", diameter: "85cm", led: "896ea", power: "150W", weight: "2.0kg", brightness: "2200 cd/m²" },
    { model: "LDP-100F", diameter: "100cm", led: "1024ea", power: "200W", weight: "2.8kg", brightness: "2500 cd/m²" },
];

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
];

export default function HologramPage() {
    return (
        <div className={styles.page}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link href="/">홈</Link>
                <ChevronRight size={13} />
                <Link href="/hardware/">하드웨어 소개</Link>
                <ChevronRight size={13} />
                <span>3D 홀로그램 디스플레이</span>
            </nav>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.heroBadge}>IMPRESSIVE 3D VISUAL SOLUTION</span>
                    <h1 className={styles.heroTitle}>
                        시선을 사로잡는<br />
                        <span className={styles.heroGradText}>3D 홀로그램 디스플레이</span>
                    </h1>
                    <p className={styles.heroDesc}>
                        공중에 떠 있는 고화질 3D 영상을 통해 브랜드 가치를 극대화하세요.<br />
                        진보된 LED 팬 기술로 구현하는 압도적인 몰입감과 선명함을 제공합니다.
                    </p>
                    <div className={styles.heroImageWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/hologram/hero.png" alt="3D 홀로그램 메인" className={styles.heroImg} />
                    </div>
                </div>
            </section>

            {/* Features Info Section (Using input_file_1.png content) */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.rowContent}>
                            <span className={styles.sectionBadge}>Advanced Technology</span>
                            <h2 className={styles.rowTitle}>스마트한 제어와<br />무한한 시각적 효과</h2>
                            <ul className={styles.featureList}>
                                <li className={styles.featureItem}>
                                    <div className={styles.featureIconWrap}><Smartphone /></div>
                                    <div className={styles.featureTextWrap}>
                                        <h4>스마트 앱 제어</h4>
                                        <p>전용 모바일 앱을 통해 밝기, 각도, 콘텐츠를 손쉽게 관리할 수 있습니다.</p>
                                    </div>
                                </li>
                                <li className={styles.featureItem}>
                                    <div className={styles.featureIconWrap}><Layers /></div>
                                    <div className={styles.featureTextWrap}>
                                        <h4>다중 기기 동기화 </h4>
                                        <p>여러 대의 기기를 결합하여 대형 스크린이나 복합 미디어월을 자유롭게 구성합니다.</p>
                                    </div>
                                </li>
                                <li className={styles.featureItem}>
                                    <div className={styles.featureIconWrap}><Wifi /></div>
                                    <div className={styles.featureTextWrap}>
                                        <h4>실시간 무선 전송</h4>
                                        <p>Wi-Fi를 통해 PC나 스마트폰의 콘텐츠를 즉시 디스플레이에 투사합니다.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.rowImageWrap}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/hologram/features.png" alt="홀로그램 특장점" className={styles.rowImg} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Remote Control Info Section (Using input_file_2.png content) */}
            <section className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={`${styles.row} ${styles.rowReverse}`}>
                        <div className={styles.rowContent}>
                            <span className={styles.sectionBadge}>Easy Control</span>
                            <h2 className={styles.rowTitle}>누구나 쉽게 다루는<br />지능형 인터페이스</h2>
                            <p className={styles.sectionDesc} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                복잡한 설정 없이 직관적인 UI를 통해 3D 결과물을 즉각적으로 확인하세요.
                                가동 상태부터 홀로그램 모드 전환까지 손가락 하나로 제어 가능합니다.
                            </p>
                            <div className={styles.featureGrid} style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className={styles.featureCard}>
                                    <CheckCircle2 size={18} color="#2563eb" />
                                    <div className={styles.featureName}>실시간 모니터링</div>
                                </div>
                                <div className={styles.featureCard}>
                                    <CheckCircle2 size={18} color="#2563eb" />
                                    <div className={styles.featureName}>블루투스 오디오</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rowImageWrap}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/hologram/modes.png" alt="홀로그램 제어 모드" className={styles.rowImg} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Details (Using input_file_3.png content) */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeading}>
                        <span className={styles.sectionBadge}>Build Construction</span>
                        <h2 className={styles.sectionTitle}>압도적 성능을 위한 설계</h2>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowImageWrap}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/hologram/details.png" alt="홀로그램 상세 설계" className={styles.rowImg} />
                        </div>
                        <div className={styles.rowContent}>
                            <ul className={styles.featureList}>
                                <li className={styles.featureItem}>
                                    <div className={styles.featureTextWrap}>
                                        <h4>고성능 LED 램프 비드</h4>
                                        <p>높은 내구성과 에너지 효율을 갖춘 선명한 RGB LED를 사용하여 장시간 사용에도 변함없는 화질을 유지합니다.</p>
                                    </div>
                                </li>
                                <li className={styles.featureItem}>
                                    <div className={styles.featureTextWrap}>
                                        <h4>특수 무광 엠보싱 하우징</h4>
                                        <p>내마모성이 뛰어난 무광 소재의 케이스로 세련된 외관과 튼튼한 내구성, 안정적인 그립감을 제공합니다.</p>
                                    </div>
                                </li>
                                <li className={styles.featureItem}>
                                    <div className={styles.featureTextWrap}>
                                        <h4>U-SHAPED 안정형 베이스</h4>
                                        <p>더욱 정밀해진 U자형 베이스 설계로 설치 안정성을 높여 진동 없이 선명한 입체 영상을 투사합니다.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Model Lineup Table */}
            <section className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sectionHeading}>
                        <span className={styles.sectionBadge}>LDP Series Line-up</span>
                        <h2 className={styles.sectionTitle}>용도에 맞는 최적의 모델 선택</h2>
                    </div>
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
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
                </div>
            </section>

            {/* Use Cases (Using input_file_4.png content) */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeading}>
                        <span className={styles.sectionBadge}>Applications</span>
                        <h2 className={styles.sectionTitle}>어디서나 돋보이는 존재감</h2>
                        <p className={styles.sectionDesc}>식당, 쇼핑몰, 전시장부터 교육 현장까지 다양한 환경에서 입체적인 시각 경험을 제공합니다.</p>
                    </div>
                    <div className={styles.scenariosImageWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/hologram/scenarios.png" alt="홀로그램 활용 사례" className={styles.rowImg} />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.container} style={{ marginBottom: '6rem' }}>
                <div className={styles.cta}>
                    <h2 className={styles.ctaTitle}>새로운 시각적 혁신을 시작하세요</h2>
                    <p className={styles.ctaDesc}>
                        전문 컨설턴트가 비즈니스 모델에 맞는 최적의 홀로그램 솔루션을 제안해 드립니다.
                    </p>
                    <Link href="/contact/" className={styles.ctaBtn}>
                        무료 상담 신청하기 <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
