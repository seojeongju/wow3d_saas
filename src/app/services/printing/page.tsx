"use client";

import Link from "next/link";
import { Timer, Box, Layers, CheckCircle2, ShieldCheck, ArrowRight, Printer, FileType, Zap } from "lucide-react";
import styles from "./printing.module.css";
import QuoteSection from "@/components/QuoteSection";

export default function PrintingServicePage() {
    return (
        <div className={styles.cbtPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <div className={styles.badge}>
                                <span>3D Printing Service</span>
                            </div>
                            <h1 className={styles.heroTitle}>3D프린팅 AI 실시간 견적</h1>
                            <p className={styles.heroSubtitle}>당신의 상상력을 현실로 만듭니다</p>
                            <p className={styles.heroDesc}>
                                STL, OBJ, 3MF 파일을 업로드하면 AI가 부피·표면적을 분석해 실시간 견적을 제공합니다.<br />
                                복잡한 상담 과정 없이 웹에서 바로 확인하고 주문하세요.
                            </p>
                            <div className={styles.heroActions}>
                                <Link href="#quote-section" className={styles.btnPrimary}>
                                    지금 바로 견적 내기 <ArrowRight size={18} />
                                </Link>
                                <Link href="/contact" className={styles.btnSecondary}>
                                    대량 양산 문의
                                </Link>
                            </div>
                        </div>
                        <div className={styles.heroImage}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/ai-quote-system.png" alt="3D 프린팅 견적 시스템" className={styles.heroImg} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Widget Section (Reusing Component) */}
            <QuoteSection />

            {/* Core Features Section */}
            <section className={styles.featuresSection}>
                <div className="container">
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Zap size={40} />
                            </div>
                            <h3>AI 실시간 견적</h3>
                            <p>기다림 없는 즉시 견적 확인. AI가 3D 모델의 부피와 형상을 분석하여 합리적인 가격을 제안합니다.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FileType size={40} />
                            </div>
                            <h3>다양한 파일 지원</h3>
                            <p>STL, OBJ, 3MF, STEP 등 주요 3D 모델링 포맷을 완벽하게 지원합니다. 별도의 변환 없이 바로 업로드하세요.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Layers size={40} />
                            </div>
                            <h3>전문가급 품질</h3>
                            <p>산업용 3D 프린터와 전문가의 후가공으로 시제품부터 양산품까지 최고의 품질을 보장합니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Feature Image */}
            <section className={styles.dashboardSection}>
                <div className="container">
                    <div className={styles.dashboardWrapper}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/ai-quote-system.png" alt="3D 프린팅 견적 프로세스" className={styles.dashboardImg} />
                    </div>
                </div>
            </section>

            {/* Detailed Features */}
            <section className={styles.detailSection}>
                <div className="container">

                    {/* Feature 1: AI Process */}
                    <div className={styles.detailRow}>
                        <div className={styles.detailContent}>
                            <span className={styles.detailLabel}>01 AI Analysis</span>
                            <h2 className={styles.detailTitle}>
                                업로드 즉시 분석,<br />
                                투명한 견적 산출
                            </h2>
                            <p className={styles.detailDesc}>
                                더 이상 견적서를 기다리지 마세요. WOW3D의 AI 엔진이 모델의 형상, 부피, 서포트 필요량을
                                정밀하게 분석하여 1초 만에 견적을 산출합니다.
                            </p>
                            <ul className={styles.detailList}>
                                <li>
                                    <CheckCircle2 size={20} className={styles.checkIcon} />
                                    <span><strong>형상 분석:</strong> 오버행, 벽 두께 등 출력 가능성 자동 체크</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className={styles.checkIcon} />
                                    <span><strong>최적 소재 추천:</strong> 용도에 맞는 필라멘트 및 레진 추천</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className={styles.checkIcon} />
                                    <span><strong>실시간 가격 비교:</strong> 재질/밀도 옵션별 견적 즉시 확인</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.detailImage}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/ai-quote-system.png" alt="AI 분석 화면" className={styles.detailImg} />
                        </div>
                    </div>

                    {/* Feature 2: High Quality Printing */}
                    <div className={`${styles.detailRow} ${styles.detailRowReverse}`}>
                        <div className={styles.detailContent}>
                            <span className={styles.detailLabel}>02 High Quality</span>
                            <h2 className={styles.detailTitle}>산업용 장비로 완성하는 정밀 출력</h2>
                            <p className={styles.detailDesc}>
                                FDM, SLA, DLP 등 다양한 방식의 산업용 3D 프린터를 보유하고 있습니다.
                                단순 시제품부터 기능성 부품까지 용도에 맞는 최적의 출력 방식을 선택하세요.
                            </p>
                            <ul className={styles.detailList}>
                                <li>
                                    <CheckCircle2 size={20} className={styles.checkIcon} />
                                    <span><strong>다양한 방식:</strong> FDM(보급형/산업용), SLA(정밀/투명), DLP(덴탈/주얼리)</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className={styles.checkIcon} />
                                    <span><strong>프리미엄 소재:</strong> PLA, ABS, PETG, TPU, Resin 등 20+ 소재 보유</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className={styles.checkIcon} />
                                    <span><strong>전문 후가공:</strong> 서포트 제거, 표면 연마, 도색 서비스 제공</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.detailImage}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/ai-quote-system.png" alt="산업용 3D 프린터 출력" className={styles.detailImg} />
                        </div>
                    </div>

                    {/* Security Block */}
                    <div className={styles.securityBlock}>
                        <div className={styles.securityIcon}>
                            <ShieldCheck size={48} />
                        </div>
                        <h2 className={styles.securityTitle}>소중한 디자인 자산, 완벽하게 보호합니다</h2>
                        <p className={styles.securityDesc}>
                            업로드된 모든 3D 파일은 암호화되어 저장되며,<br />
                            출력 완료 후 일정 기간이 지나면 자동으로 영구 삭제됩니다.
                        </p>
                        <div className={styles.securityTags}>
                            <span className={styles.tag}>SSL 암호화 전송</span>
                            <span className={styles.tag}>AES-256 저장소 암호화</span>
                            <span className={styles.tag}>자동 파기 시스템</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>아이디어가 있으신가요? 지금 바로 시작하세요.</h2>
                        <p className={styles.ctaDesc}>STL 파일만 있다면 누구나 쉽게 3D 프린팅을 경험할 수 있습니다.</p>
                        <Link href="#quote-section" className={styles.ctaButton}>
                            무료로 견적 확인하기 <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
