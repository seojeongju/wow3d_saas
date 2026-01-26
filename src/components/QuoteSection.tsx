"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, Box, Check, ArrowRight, FileType, Zap, Loader2 } from 'lucide-react';
import styles from './QuoteSection.module.css';
import clsx from 'clsx';

export default function QuoteSection() {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'complete'>('idle');

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        setUploadState('uploading');

        // Simulate upload
        setTimeout(() => {
            setUploadState('complete');
        }, 2000);
    };

    return (
        <section className={styles.section} id="quote-section">
            <div className={styles.gridBackground} />

            <div className={styles.container}>
                {/* Left Content */}
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <Zap size={14} className="mr-2 text-yellow-400" />
                        차세대 3D 프린팅 서비스
                    </div>

                    <h1 className={styles.title}>
                        당신의 상상력을<br />
                        현실로 만듭니다.
                    </h1>

                    <p className={styles.description}>
                        AI 기반 실시간 견적부터 전문가급 정밀 출력까지.<br />
                        시제품 제작부터 양산까지, WOW3D가 함께합니다.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/services/cbt" className={styles.btnPrimary}>
                            3D 프린터 출력방식 (FDM, SLA, DLP) <ArrowRight size={18} />
                        </Link>
                        <Link href="/materials" className={styles.btnSecondary}>
                            소재 살펴보기
                        </Link>
                    </div>
                </div>

                {/* Right Widget Area */}
                <div className={styles.widgetWrapper}>

                    {/* Main Upload Card */}
                    <div className={styles.uploadCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>3D 모델 지원</h3>
                            <p className={styles.cardDesc}>
                                STL, OBJ, 3MF, PLY, STEP, STP를 업로드하면 AI가 부피·표면적을 분석해 실시간 견적을 제공합니다.
                            </p>
                            <div className={styles.fileBadges}>
                                <span className={styles.fileBadge}>.stl</span>
                                <span className={styles.fileBadge}>.obj</span>
                                <span className={styles.fileBadge}>.3mf</span>
                                <span className={styles.fileBadge}>.ply</span>
                                <span className={styles.fileBadge}>.step</span>
                                <span className={styles.fileBadge}>.stp</span>
                            </div>
                        </div>

                        <div
                            className={clsx(styles.uploadArea, isDragOver && 'border-blue-500 bg-zinc-900')}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className={styles.uploadIcon}>
                                {uploadState === 'uploading' ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <Box />
                                )}
                            </div>
                            <div className="text-zinc-400">
                                {uploadState === 'idle' ? (
                                    <p>파일을 여기로 드래그하거나 클릭하여 업로드하세요</p>
                                ) : uploadState === 'uploading' ? (
                                    <p>AI가 모델을 분석하고 있습니다...</p>
                                ) : (
                                    <p className="text-green-500">분석 완료!</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.uploadFeatures}>
                            <div className={styles.featureItem}>
                                <span className={styles.featureDot} /> 최대 100MB
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.featureDot} /> 실시간 견적
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.featureDot} /> 암호화 업로드
                            </div>
                        </div>
                    </div>

                    {/* Floating AI Status Widget */}
                    <div className={styles.floatingWidget}>
                        <div className={styles.fwHeader}>
                            <div className={styles.fwIconBox}>
                                <Zap size={18} />
                            </div>
                            <div>
                                <div className={styles.fwTitle}>AI 견적 분석</div>
                                <div className={styles.fwStatus}>
                                    {uploadState === 'idle' ? '업로드 대기' : '분석중...'}
                                </div>
                            </div>
                        </div>

                        <div className={styles.fwProgress}>
                            <div
                                className={styles.fwProgressBar}
                                style={{ width: uploadState === 'idle' ? '0%' : uploadState === 'complete' ? '100%' : '60%' }}
                            />
                        </div>

                        <div className={styles.fwPriceBox}>
                            <div className={styles.fwLabel}>예상 견적가</div>
                            <div className={styles.fwPrice}>
                                {uploadState === 'complete' ? '24,500원~' : '업로드 후 확인'}
                            </div>
                        </div>

                        <button className={styles.fwBtn}>
                            AI 실시간 자동견적하기
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
