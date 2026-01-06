"use client";
import PricingTable from '@/components/PricingTable';
import { Users, ShieldCheck, BarChart3, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function AcademyServicePage() {
    return (
        <div className="services-page">
            {/* Page Header */}
            <section className="bg-gradient text-white py-20 text-center">
                <div className="container">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-sm font-semibold mb-4">Education Tech</span>
                    <h1 className="text-4xl font-bold mb-4">스마트 아카데미 매니지먼트</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        학원, 교습소, 교육 기업을 위한 올인원 LMS.<br />
                        NCS 학사 관리부터 비대면 온라인 시험(CBT)까지 한 번에.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="service-detail-section">
                <div className="container">

                    {/* Intro Grid */}
                    <div className="mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all text-center">
                                <Users size={40} className="text-indigo-600 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold mb-2">학사/출결 통합</h3>
                                <p className="text-slate-600">학생 등하원 자동 알림 및 반 배치, 강사 스케줄링을 쉽고 편리하게.</p>
                            </div>
                            <div className="p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all text-center">
                                <ShieldCheck size={40} className="text-indigo-600 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold mb-2">CBT 문제은행</h3>
                                <p className="text-slate-600">기출문제 기반의 온라인 시험 시스템으로 성적 관리 효율을 극대화합니다.</p>
                            </div>
                            <div className="p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all text-center">
                                <BarChart3 size={40} className="text-indigo-600 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold mb-2">AI 성취도 분석</h3>
                                <p className="text-slate-600">데이터 기반의 학습 리포트를 생성하여 학부모 상담의 신뢰도를 높입니다.</p>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image-wrapper mb-24 shadow-2xl rounded-xl overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/lms-dashboard.png" alt="LMS Dashboard" className="w-full h-auto object-cover" />
                    </div>

                    {/* Detailed Features */}
                    <div className="detailed-features">

                        {/* Feature 1 */}
                        <div className="feature-row mb-24 flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">
                                    <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider block mb-2">01 ACADEMIC MANAGEMENT</span>
                                    NCS 기반 학사 운영 자동화
                                </h3>
                                <p className="text-lg text-slate-600 mb-6">
                                    복잡한 행정 업무는 시스템에 맡기고 교육에만 집중하세요.
                                    국가직무능력표준(NCS) 커리큘럼 설계도 지원합니다.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-indigo-600 mt-1">✓</span>
                                        <span><strong>스마트 출결:</strong> QR/비콘/지문인식 연동 및 학부모 안심 문자 발송</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-indigo-600 mt-1">✓</span>
                                        <span><strong>강의실 배정:</strong> 시각적인 타임라인 뷰로 빈 강의실과 강사 스케줄 관리</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 shadow-xl rounded-xl overflow-hidden border border-slate-100">
                                {/* Placeholder for Schedule/Admin UI if needed, reusing dashboard or specific image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <div className="bg-slate-100 w-full h-64 flex items-center justify-center text-slate-400">
                                    {/* Reuse dashboard image or keep generic if specific image is missing, 
                        I'll re-use lms-dashboard for now or a cropped version via CSS if I could, 
                        but standard image tag is safer. Let's use lms-dashboard again? 
                        No, let's use the layout image if available. 
                        Actually I have lms-dashboard.png. 
                        Let's use a colored placeholder with icon for variety? 
                        No, reusing images is better than placeholder. 
                        ill use dashboard-hero temporarily or just lms-dashboard.
                     */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/images/lms-dashboard.png" alt="Academic Management" className="w-full h-auto object-cover" />
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: CBT */}
                        <div className="feature-row mb-24 flex flex-col lg:flex-row-reverse items-center gap-12">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">
                                    <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider block mb-2">02 CBT SYSTEM</span>
                                    온라인 문제은행 & 평가
                                </h3>
                                <p className="text-lg text-slate-600 mb-6">
                                    수만 개의 문제 DB를 활용해 3분 만에 시험지를 만들고,
                                    자동 채점과 오답 노트를 제공합니다.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-indigo-600 mt-1">✓</span>
                                        <span><strong>시험지 마법사:</strong> 단원/난이도/유형별 문제 자동 추출 및 랜덤 섞기</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-indigo-600 mt-1">✓</span>
                                        <span><strong>실전 모의고사:</strong> 실제 시험 환경과 동일한 타이머 및 UI 제공</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 shadow-xl rounded-xl overflow-hidden border border-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/cbt-exam.png" alt="CBT System" className="w-full h-auto" />
                            </div>
                        </div>

                        {/* Feature 3: Report */}
                        <div className="feature-row mb-24 flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">
                                    <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider block mb-2">03 ANALYTICS REPORT</span>
                                    데이터로 증명하는 성적 향상
                                </h3>
                                <p className="text-lg text-slate-600 mb-6">
                                    감에 의존하는 상담은 이제 그만.
                                    객관적인 데이터와 추이 그래프로 학생의 강점과 약점을 분석합니다.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-indigo-600 mt-1">✓</span>
                                        <span><strong>종합 리포트:</strong> 출석률, 과제 수행도, 시험 성적을 한 장의 리포트로 생성</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-indigo-600 mt-1">✓</span>
                                        <span><strong>모바일 연동:</strong> 학부모 앱으로 리포트 즉시 전송 및 확인</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 shadow-xl rounded-xl overflow-hidden border border-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/student-report.png" alt="Process Tracking" className="w-full h-auto" />
                            </div>
                        </div>

                    </div>

                    <PricingTable serviceName="아카데미 관리" />
                </div>
            </section>

            <section className="cta-section bg-indigo-50 py-20 text-center">
                <div className="container">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">스마트한 학원 운영의 시작</h2>
                    <p className="mb-8 text-slate-600">지금 바로 도입 상담을 신청하고 무료 체험 혜택을 받으세요.</p>
                    <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-bold shadow-lg shadow-indigo-500/30">
                        도입 상담 신청하기
                    </Link>
                </div>
            </section>

            <style jsx>{`
        .bg-gradient {
            background: linear-gradient(135deg, #312E81 0%, #4338CA 100%);
        }
        .service-detail-section {
            padding: 5rem 0;
        }
      `}</style>
        </div>
    );
}
