"use client";

import { GraduationCap, ArrowRight, BookOpen, Camera, Layout, Settings, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './education.module.css';

export default function EducationCenterPage() {
    const features = [
        {
            icon: <BookOpen size={40} />,
            title: '3D 모델링·프린팅',
            desc: '산업용 3D프린터와 전문 소프트웨어로 실무 역량을 키웁니다.'
        },
        {
            icon: <Settings size={40} />,
            title: '국비지원 과정',
            desc: '맞춤형 국비지원 프로그램으로 수강료 부담 없이 학습하세요.'
        },
        {
            icon: <MapPin size={40} />,
            title: '전국 3개 센터',
            desc: '홍대·구미·전주 센터에서 편리하게 수강할 수 있습니다.'
        }
    ];

    const categories = [
        {
            title: '교육사진',
            desc: '생생한 교육 현장과 실제 수업 모습을 확인하세요.',
            link: 'https://3dcookiehd.pages.dev/education-photos?filter=education_photo',
            icon: <Camera size={24} />
        },
        {
            title: '포트폴리오',
            desc: '수강생들의 우수한 작품과 프로젝트 결과물입니다.',
            link: 'https://3dcookiehd.pages.dev/portfolios',
            icon: <Layout size={24} />
        },
        {
            title: '시제품 제작',
            desc: '3D 프린팅으로 제작한 실제 작업물 갤러리입니다.',
            link: 'https://3dcookiehd.pages.dev/prototype-gallery',
            icon: <Settings size={24} />
        }
    ];

    return (
        <div className={styles.educationPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            <span>와우쓰리디 교육 센터</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            상상을 현실로,<br />
                            <span className={styles.highlight}>미래를 디자인하다!</span>
                        </h1>
                        <p className={styles.heroDesc}>
                            와우쓰리디 홍대센터에서 3D 모델링과 프린팅을 마스터하세요.<br />
                            실무 중심의 전문 교육 솔루션으로 취업과 창업의 지름길을 제안합니다.
                        </p>
                        <div className={styles.heroActions}>
                            <a
                                href="https://3dcookiehd.pages.dev/"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.btnPrimary}
                            >
                                교육 센터 공식 사이트 방문 <ExternalLink size={18} />
                            </a>
                            <Link href="/contact" className={styles.btnSecondary}>
                                교육 상담 신청
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Features */}
            <section className={styles.featuresSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>전문 교육 솔루션</h2>
                        <p className={styles.sectionSubtitle}>현장 경험이 풍부한 전문 강사진과 함께 진짜 실력을 키우세요.</p>
                    </div>
                    <div className={styles.featuresGrid}>
                        {features.map((f, i) => (
                            <div key={i} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Shortcuts */}
            <section className={styles.contentSection}>
                <div className="container">
                    <div className={styles.contentGrid}>
                        {categories.map((c, i) => (
                            <a
                                key={i}
                                href={c.link}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.contentCard}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>{c.icon}</div>
                                    <ArrowRight size={20} className={styles.arrow} />
                                </div>
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                                <span className={styles.moreLabel}>바로가기</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Block */}
            <section className={styles.infoSection}>
                <div className="container">
                    <div className={styles.infoCard}>
                        <div className={styles.infoText}>
                            <h2 className={styles.infoTitle}>체계적인 NCS 기반 커리큘럼</h2>
                            <p className={styles.infoDesc}>
                                단순한 기술 전수를 넘어, 산업 현장에서 즉시 활용 가능한 국가직무능력표준(NCS) 기반의 체계적인 교육을 제공합니다.
                            </p>
                            <ul className={styles.infoList}>
                                <li><CheckCircle2 size={20} /> 실무 프로젝트 중심 교육</li>
                                <li><CheckCircle2 size={20} /> 전문가 1:1 멘토링 지원</li>
                                <li><CheckCircle2 size={20} /> 취업 및 창업 연계 마켓 지원</li>
                            </ul>
                            <a
                                href="https://3dcookiehd.pages.dev/course-sessions"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.btnInfo}
                            >
                                교육 과정 둘러보기 <ArrowRight size={18} />
                            </a>
                        </div>
                        <div className={styles.infoImage}>
                            <Image
                                src="/images/ncs-curriculum.png"
                                alt="Education Center"
                                width={600}
                                height={400}
                                className={styles.roundedImg}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>여러분의 꿈을 현실로 만듭니다</h2>
                        <p className={styles.ctaDesc}>교육 상담부터 수강 신청까지, 와우쓰리디 교육 센터가 함께합니다.</p>
                        <div className={styles.ctaButtons}>
                            <a
                                href="https://3dcookiehd.pages.dev/online-consulting"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.btnCtaMain}
                            >
                                온라인 상담 신청하기
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
