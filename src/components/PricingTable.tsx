"use client";
import { Check } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type PricingPlan = {
    name: string;
    description: string;
    price: number; // monthly price
    isPopular?: boolean;
    features: string[];
    buttonText?: string;
    buttonLink?: string;
    isCustom?: boolean; // For "Separate Consultation"
};

const defaultPlans: PricingPlan[] = [
    {
        name: '스탠다드 팩',
        description: '1인 창업자 및 소규모 매장을 위한 필수 데이터 분석 기능 제공',
        price: 30000,
        isPopular: true,
        features: [
            '실시간 매출/재고 현황 대시보드',
            '월간 매출 분석 리포트 제공',
            '기본 고객 관리(CRM) 기능',
            '모바일 앱 지원 (Android/iOS)',
            '데이터 보관 기간 1년'
        ],
        buttonText: '무료 체험 신청',
        buttonLink: '/contact'
    },
    {
        name: '프리미엄 팩',
        description: 'AI 기반 고도화된 데이터 분석 및 맞춤형 관리 기능 제공',
        price: 50000,
        features: [
            '스탠다드 전 기능 포함',
            'AI 기반 수요 예측 및 분석',
            '다점포 통합 관리(본사 기능)',
            '전용 매니저 기술 지원',
            '데이터 보관 기간 3년'
        ],
        buttonText: '상담 문의',
        buttonLink: '/contact'
    },
    {
        name: '엔터프라이즈',
        description: '대규모 조직 및 전용 시스템 구축이 필요한 기업 고객',
        price: 0,
        isCustom: true,
        features: [
            '프리미엄 전 기능 포함',
            '자사 브랜드 맞춤형 커스텀 개발',
            '사내 ERP/그룹웨어 연동',
            '전용 클라우드 서버 구축',
            '영구 라이선스 옵션 제공'
        ],
        buttonText: '상담 문의',
        buttonLink: '/contact'
    },
    {
        name: '온프라미스',
        description: '보안 정책상 독립된 서버 설치가 필요한 경우',
        price: 0,
        isCustom: true,
        features: [
            '자체 서버 내 솔루션 설치',
            '소스코드 제공 (옵션)',
            '커스터마이징 개발 지원',
            '유지보수 별도 계약'
        ],
        buttonText: '견적 요청',
        buttonLink: '/contact'
    }
];

const serviceSpecificPlans: Record<string, PricingPlan[]> = {
    retail: [
        {
            name: '스탠다드 팩',
            description: '도소매/요식업을 위한 필수 재고 및 매출 관리 플랜',
            price: 50000,
            isPopular: true,
            features: [
                '실시간 매출/재고 현황 대시보드',
                '월간 매출 분석 리포트 제공',
                '기본 고객 관리(CRM) 기능',
                '모바일 앱 지원 (Android/iOS)',
                '데이터 보관 기간 1년'
            ],
            buttonText: '무료 체험 신청',
            buttonLink: '/contact'
        },
        {
            name: '프리미엄 팩',
            description: 'AI 수요예측 및 다점포 통합 관리가 포함된 성장형 매장 플랜',
            price: 70000,
            features: [
                '스탠다드 전 기능 포함',
                'AI 기반 수요 예측 및 발주 추천',
                '다점포 통합 관리(본사 기능)',
                '전용 매니저 기술 지원',
                '데이터 보관 기간 3년'
            ],
            buttonText: '상담 문의',
            buttonLink: '/contact'
        },
        {
            name: '엔터프라이즈',
            description: '프랜차이즈 본사 전용 맞춤형 구축 플랜',
            price: 0,
            isCustom: true,
            features: [
                '프리미엄 전 기능 포함',
                '자사 브랜드 맞춤형 커스텀 개발',
                '사내 ERP/그룹웨어 연동',
                '전용 클라우드 서버 구축',
                '영구 라이선스 옵션 제공'
            ],
            buttonText: '상담 문의',
            buttonLink: '/contact'
        },
        {
            name: '온프라미스',
            description: '내부 서버 설치 및 데이터 완전 독립형 플랜',
            price: 0,
            isCustom: true,
            features: [
                '자체 서버 내 솔루션 설치',
                '소스코드 제공 (옵션)',
                '커스터마이징 개발 지원',
                '유지보수 별도 계약'
            ],
            buttonText: '견적 요청',
            buttonLink: '/contact'
        }
    ],
    cbt: [
        {
            name: '스탠다드 팩',
            description: '실전 모의고사 및 문제은행 기본 기능 제공 플랜',
            price: 30000,
            isPopular: true,
            features: [
                '실시간 타이머 및 모의고사 UI',
                '자동 채점 및 기본 통계',
                '오답 노트 자동 생성',
                '문제 은행 1,000문항 업로드 가능',
                '데이터 보관 기간 1년'
            ],
            buttonText: '무료 체험 신청',
            buttonLink: '/contact'
        },
        {
            name: '프리미엄 팩',
            description: 'AI 취약점 분석 및 기관 전용 관리 기능이 포함된 플랜',
            price: 50000,
            features: [
                '스탠다드 전 기능 포함',
                'AI 기반 취약 유형 분석 리포트',
                '관리자 전용 학생 성과 분석',
                '문제 은행 무제한 업로드',
                '데이터 보관 기간 3년'
            ],
            buttonText: '상담 문의',
            buttonLink: '/contact'
        },
        {
            name: '엔터프라이즈',
            description: '대규모 시험 운영 및 보안 특화 구축 플랜',
            price: 0,
            isCustom: true,
            features: [
                '프리미엄 전 기능 포함',
                '시험 보안 정책 커스텀 설정',
                '기관 전용 LMS 연동',
                '전용 클라우드 서버 구축',
                '영구 라이선스 옵션 제공'
            ],
            buttonText: '상담 문의',
            buttonLink: '/contact'
        },
        {
            name: '온프라미스',
            description: '완벽한 물리적 보안을 위한 사내 서버 설치형 플랜',
            price: 0,
            isCustom: true,
            features: [
                '자체 서버 내 솔루션 시험장 구축',
                '소스코드 제공 (옵션)',
                '커스터마이징 개발 지원',
                '유지보수 별도 계약'
            ],
            buttonText: '견적 요청',
            buttonLink: '/contact'
        }
    ]
};

export default function PricingTable({ serviceName, serviceId }: { serviceName: string; serviceId?: string }) {
    const [isAnnual, setIsAnnual] = useState(false);

    // Get plans based on serviceId, match by serviceName if Id not provided, or use default
    let activePlans = defaultPlans;
    if (serviceId && serviceSpecificPlans[serviceId]) {
        activePlans = serviceSpecificPlans[serviceId];
    } else if (serviceName.toLowerCase().includes('smart manager')) {
        activePlans = serviceSpecificPlans.retail;
    } else if (serviceName.toLowerCase().includes('cbt')) {
        activePlans = serviceSpecificPlans.cbt;
    }

    return (
        <div className="pricing-section">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{serviceName} 요금제</h2>
                <p className="text-muted">비즈니스 규모에 알맞은 최적의 플랜을 선택하세요.</p>

                {/* Toggle Switch */}
                <div className="toggle-container mt-8">
                    <button
                        className={clsx('toggle-btn', !isAnnual && 'active')}
                        onClick={() => setIsAnnual(false)}
                    >
                        월간 선불 결제
                    </button>
                    <button
                        className={clsx('toggle-btn', isAnnual && 'active')}
                        onClick={() => setIsAnnual(true)}
                    >
                        연간 선불 결제
                    </button>
                    <div className={clsx('toggle-slider', isAnnual ? 'slide-right' : 'slide-left')} />
                </div>
            </div>

            <div className="pricing-grid">
                {activePlans.map((plan, index) => {
                    const displayPrice = isAnnual
                        ? Math.round(plan.price * 12 * 0.8 / 1000) * 1000 // 20% Discount
                        : plan.price;

                    return (
                        <div
                            key={index}
                            className={clsx('pricing-card', plan.isPopular && 'popular', plan.isCustom && 'custom')}
                        >
                            <div className="card-header">
                                {plan.isPopular && <div className="popular-tag">BEST</div>}
                                <div className="plan-name">{plan.name}</div>
                                <p className="plan-desc">{plan.description}</p>
                            </div>

                            <div className="card-price">
                                {plan.isCustom ? (
                                    <span className="price-value custom-text">별도 협의</span>
                                ) : (
                                    <>
                                        <span className="price-value">
                                            {displayPrice.toLocaleString()}
                                        </span>
                                        <span className="price-unit">원</span>
                                        <span className="price-period">
                                            {isAnnual ? '/ 년 (20% OFF)' : '/ 월 / 사용자당'}
                                        </span>
                                    </>
                                )}
                            </div>

                            <Link href={plan.buttonLink || '/contact'} className={clsx('btn-plan', plan.isPopular ? 'btn-cta' : 'btn-outline')}>
                                {plan.buttonText}
                            </Link>

                            {plan.isPopular && <p className="promo-text">1년 선불 결제 시 20% 추가 할인!</p>}

                            <div className="features-list">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="feature-item">
                                        <Check size={18} className="text-accent" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
        .pricing-section {
          padding: 4rem 0;
        }
        .text-muted { color: #64748B; }
        
        /* Toggle Switch */
        .toggle-container {
          background: #E2E8F0;
          border-radius: 2rem;
          padding: 4px;
          display: inline-flex;
          position: relative;
          cursor: pointer;
        }
        .toggle-btn {
          padding: 0.5rem 1.5rem;
          border-radius: 1.5rem;
          border: none;
          background: transparent;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          position: relative;
          z-index: 2;
          transition: color 0.3s;
        }
        .toggle-btn.active {
          color: #0F172A;
        }
        .toggle-slider {
          position: absolute;
          top: 4px;
          bottom: 4px;
          width: 50%;
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 1;
        }
        .slide-left { transform: translateX(0); left: 4px; width: calc(50% - 4px); }
        .slide-right { transform: translateX(100%); left: -4px; width: calc(50% - 4px); }

        /* Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1400px; /* Increased from 1100px */
          margin: 0 auto;
        }

        /* Card Styles */
        .pricing-card {
          background: white;
          border: 1px solid #E2E8F0;
          border-radius: 1rem;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          transition: transform 0.2s;
        }
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        /* Popular Highlight */
        .pricing-card.popular {
          border: 2px solid var(--accent-cta);
          box-shadow: 0 4px 6px -1px rgba(230, 57, 70, 0.1);
          transform: scale(1.02);
          z-index: 10;
        }
        .popular-tag {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-cta);
          color: white;
          padding: 2px 12px;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .card-header { margin-bottom: 2rem; }
        .plan-name { font-size: 1.25rem; font-weight: 800; color: #1E293B; margin-bottom: 0.5rem; }
        .plan-desc { font-size: 0.9rem; color: #64748B; min-height: 48px; }

        .card-price { margin-bottom: 2rem; color: #0F172A; }
        .price-value { font-size: 2.5rem; font-weight: 800; letter-spacing: -1px; }
        .price-unit { font-size: 1rem; font-weight: 600; margin-left: 2px; }
        .price-period { display: block; font-size: 0.85rem; color: #64748B; margin-top: 5px; }
        .custom-text { font-size: 2rem; }

        .btn-plan {
          display: block;
          width: 100%;
          padding: 0.8rem;
          border-radius: 0.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-align: center;
        }
        .btn-cta { background: var(--accent-cta); color: white; border: none; }
        .btn-cta:hover { background: var(--accent-cta-hover); }
        .btn-outline { border: 1px solid #CBD5E1; color: #1E293B; }
        .btn-outline:hover { border-color: #0F172A; }

        .promo-text { font-size: 0.8rem; color: var(--accent-cta); margin-bottom: 1.5rem; font-weight: 600; }

        .features-list { text-align: left; border-top: 1px solid #F1F5F9; padding-top: 1.5rem; }
        .feature-item { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; font-size: 0.9rem; color: #334155; }
        .text-accent { color: var(--accent-cta); flex-shrink: 0; }

        @media (min-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(4, 1fr); align-items: stretch; } /* Adjusted for 4 cards */
        }
        @media (min-width: 768px) and (max-width: 1023px) {
           .pricing-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        }
      `}</style>
        </div>
    );
}
