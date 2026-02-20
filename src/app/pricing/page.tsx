"use client";
export const dynamic = "force-dynamic";

import Link from 'next/link';
import { useState } from 'react';
import { Check, ArrowRight, HelpCircle, Shield, Clock, Users, TrendingUp, Award, Box, BarChart3, Cloud, Timer, BookOpen, LineChart, ShieldCheck } from 'lucide-react';
import PricingTable from '@/components/PricingTable';
import styles from './pricing.module.css';
import clsx from 'clsx';

const services = [
  {
    id: 'retail',
    name: 'WOW-Smart Manager',
    subtitle: '스마트 재고/매출 관리 팩',
    description: '도소매업, 요식업 사장님을 위한 재고/발주 및 매출 심층 분석 솔루션',
    color: '#2563EB',
    image: '/images/dashboard-hero.png',
    features: [
      {
        icon: <BarChart3 size={36} />,
        title: '대시보드 & 주요 지표',
        description: '총 매출, 주문 수, 재고 경고 등 비즈니스 핵심 지표를 카드 형태로 한눈에 파악하세요.'
      },
      {
        icon: <Box size={36} />,
        title: '실시간 재고 알림',
        description: '안전 재고 이하로 떨어진 상품을 즉시 확인하고 발주 시기를 놓치지 않도록 돕습니다.'
      },
      {
        icon: <Cloud size={36} />,
        title: '어디서나 접속 가능',
        description: '클라우드 기반 시스템으로 언제 어디서든 PC, 태블릿으로 접속하여 업무를 처리할 수 있습니다.'
      }
    ],
    detailedFeatures: [
      {
        title: 'Product Management - 쉽고 강력한 상품 관리',
        items: [
          '상품 및 옵션 등록: 상품명, 가격, SKU는 물론 사이즈/색상 등 변형 옵션까지 상세하게 설정 가능',
          '이미지 관리: 상품 이미지를 업로드하여 시각적으로 쉽게 구분',
          '대량 등록 지원: 엑셀(CSV) 업로드를 통해 기존 데이터를 한 번에 이관하고 등록'
        ]
      },
      {
        title: 'Inventory Control - 빈틈없는 재고 관리',
        items: [
          '실시간 입출고: 재고의 이동을 실시간으로 기록하고 확인',
          '시리얼 넘버 관리: 주얼리나 전자제품 같은 고가 상품은 고유 시리얼 넘버로 개별 관리',
          '재고 경고 시스템: 설정한 안전 재고 수량 도달 시 자동으로 알림'
        ]
      },
      {
        title: 'Order Processing - 매끄러운 주문 처리 흐름',
        items: [
          '주문 상태 파이프라인: 대기 → 처리중 → 배송중 → 완료의 명확한 프로세스',
          '송장 및 명세서: 택배 송장 번호 입력 및 거래명세서 원클릭 출력',
          '수동 주문 생성: 전화나 이메일 등을 통한 오프라인 주문도 통합 관리'
        ]
      }
    ]
  },
  {
    id: 'academy',
    name: 'NCS On-Track (온트랙)',
    subtitle: '스마트 아카데미 매니지먼트',
    description: '학원, 교습소, 교육 서비스업을 위한 올인원 에듀테크 솔루션',
    color: '#6366F1',
    image: '/images/lms-dashboard.png',
    features: [
      {
        icon: <Users size={36} />,
        title: 'NCS On-Track 학사/출결 통합',
        description: '국가직무능력표준(NCS) 기반 커리큘럼 설계 및 QR코드/비콘을 이용한 자동 출결.'
      },
      {
        icon: <ShieldCheck size={36} />,
        title: 'CBT 문제은행 보안',
        description: '안전한 환경에서의 온라인 시험(CBT) 진행 및 자동 채점, 오답 노트 기능을 제공합니다.'
      },
      {
        icon: <BarChart3 size={36} />,
        title: '학습 성취도 리포트',
        description: '개인별 학습 데이터를 분석하여 학생 및 학부모에게 맞춤형 성적 리포트를 발송합니다.'
      }
    ],
    detailedFeatures: [
      {
        title: 'Academic Management - NCS On-Track으로 학사/출결 관리',
        items: [
          '스마트 출결: 학생별 고유 QR코드 또는 비콘으로 등하원 시간을 자동 기록',
          '커리큘럼 설계: NCS 기준에 맞춘 체계적인 강의 계획서 작성 및 진도 관리',
          '강사 및 강의실 관리: 강사의 스케줄과 강의실 배정을 시각적인 타임라인으로 관리'
        ]
      },
      {
        title: 'CBT System - 온라인 문제은행 & 평가',
        items: [
          '자동 출제 마법사: 단원별, 난이도별 문제를 섞어 3분 만에 시험지 생성',
          '자동 채점: 시험 종료 즉시 점수 산출, 객관식뿐만 아니라 단답형 채점도 지원',
          '오답 노트: 틀린 문제와 유사한 유형의 문제를 자동으로 추천하여 반복 학습 유도'
        ]
      },
      {
        title: 'Analytics Report - 데이터 기반 성취도 분석',
        items: [
          '종합 성적 리포트: 과목별 성취도, 누적 등수, 출석률을 종합한 프리미엄 리포트',
          'AI 취약점 분석: 학생이 자주 틀리는 유형을 분석하여 개인별 맞춤 학습 전략 제안',
          '학부모 소통: 모바일 앱을 통해 리포트를 전송하고 실시간 상담 가능'
        ]
      }
    ]
  },
  {
    id: 'cbt',
    name: 'WOW-CBT (와우CBT)',
    subtitle: '실전 모의고사 & 문제은행 시스템',
    description: '실제 시험 환경을 그대로 구현한 CBT 모의고사 시스템',
    color: '#8B5CF6',
    image: '/images/cbt-exam.png',
    features: [
      {
        icon: <Timer size={36} />,
        title: '실전 모의고사',
        description: '타이머·마킹·문항 이동 등 실제 시험과 유사한 UI로 실전 대비가 가능합니다.'
      },
      {
        icon: <BookOpen size={36} />,
        title: '오답 노트',
        description: '틀린 문제는 자동으로 저장되고 유형별로 묶어 반복 학습할 수 있습니다.'
      },
      {
        icon: <LineChart size={36} />,
        title: '취약 유형 분석',
        description: '정답률/소요시간 기반으로 약점을 분석해 개선 포인트를 명확히 제시합니다.'
      }
    ],
    detailedFeatures: [
      {
        title: '실전과 동일한 시험 환경',
        items: [
          '실시간 타이머: 실제 시험처럼 시간 제한 설정 및 알림',
          '문항 이동 및 마킹: 자유로운 문항 이동과 체크 마킹 기능',
          '자동 저장: 답안 자동 저장으로 돌발 상황에도 안전'
        ]
      },
      {
        title: '스마트 학습 관리',
        items: [
          '즉시 채점: 시험 종료 후 즉시 점수 확인 가능',
          '오답 자동 정리: 틀린 문제를 자동으로 오답노트에 저장',
          '유형별 분석: 취약한 문제 유형을 데이터 기반으로 분석'
        ]
      }
    ]
  },
  {
    id: 'printing',
    name: '3D프린팅 AI 실시간 견적',
    subtitle: 'AI 자동 견적 & 원스톱 주문 시스템',
    description: 'AI 분석을 통한 투명한 견적 산출과 시제품 제작부터 양산까지 한 번에',
    color: '#059669',
    image: '/images/ai-quote-system.png',
    features: [
      {
        icon: <Timer size={36} />,
        title: 'AI 실시간 견적',
        description: '3D 모델 파일 업로드 즉시 부피, 표면적을 분석하여 견적을 산출합니다.'
      },
      {
        icon: <Box size={36} />,
        title: '다양한 포맷 지원',
        description: 'STL, OBJ, 3MF, STEP 등 3D 모델링 주요 포맷을 완벽하게 지원합니다.'
      },
      {
        icon: <Award size={36} />,
        title: '전문가급 품질',
        description: '산업용 장비와 전문 후가공 서비스로 시제품부터 양산품까지 최상의 품질을 보장합니다.'
      }
    ],
    detailedFeatures: [
      {
        title: 'Smart Quotation - 투명하고 빠른 견적 산출',
        items: [
          '형상 정밀 분석: 오버행, 서포트 필요 영역 등을 AI가 자동 인식',
          '실시간 가격 비교: 재질(필라멘트/레진), 밀도, 후가공 옵션 변경에 따른 가격 즉시 확인',
          '암호화 보안 업로드: 업로드된 파일은 암호화되어 보호되며 일정 기간 후 자동 파기'
        ]
      },
      {
        title: 'One-stop Production - 편리한 주문 제작',
        items: [
          '대량 생산 대응: 샘플 확인 후 금형/사출 없이 바로 소량/대량 양산 가능',
          '다양한 소재 라인업: PLA, ABS, TPU, Resin 등 20여 종 이상의 산업용 소재 보유',
          '전문 후가공 옵션: 표면 연마, 도색, 코팅 등 용도에 맞는 후처리 서비스 제공'
        ]
      }
    ]
  }
];

const processSteps = [
  {
    icon: <Users size={32} />,
    title: '1. 상담 신청',
    description: '온라인 상담 신청 또는 전화 문의를 통해 도입 문의를 접수해주세요.',
    color: '#2563EB'
  },
  {
    icon: <Shield size={32} />,
    title: '2. 무료 체험',
    description: '14일 무료 체험을 통해 시스템을 직접 사용해보고 평가해보세요.',
    color: '#10B981'
  },
  {
    icon: <Clock size={32} />,
    title: '3. 계정 발급',
    description: '체험 후 도입 결정 시 계정을 발급하고 초기 설정을 도와드립니다.',
    color: '#F59E0B'
  },
  {
    icon: <TrendingUp size={32} />,
    title: '4. 운영 시작',
    description: '전문 컨설턴트의 온보딩 지원으로 빠르게 시스템을 활용하세요.',
    color: '#8B5CF6'
  }
];

const faqItems = [
  {
    question: '무료 체험 기간은 얼마나 되나요?',
    answer: '14일 무료 체험을 제공합니다. 체험 기간 동안 모든 기능을 제한 없이 사용하실 수 있으며, 별도의 결제 정보 입력 없이 시작하실 수 있습니다.'
  },
  {
    question: '계약 해지 시 데이터는 어떻게 되나요?',
    answer: '계약 해지 시 데이터는 30일간 보관되며, 이후 자동으로 삭제됩니다. 데이터 백업이 필요하시면 해지 전에 다운로드 받으실 수 있습니다.'
  },
  {
    question: '여러 매장을 운영하는데 하나의 계정으로 관리 가능한가요?',
    answer: '프리미엄 팩 이상에서는 다점포 통합 관리 기능을 제공합니다. 본사 계정에서 모든 매장의 데이터를 통합 관리할 수 있습니다.'
  },
  {
    question: '모바일 앱은 지원하나요?',
    answer: '네, Android와 iOS 모두 지원합니다. 스마트폰에서도 매출 현황, 재고 관리, 주문 처리 등 주요 기능을 사용하실 수 있습니다.'
  },
  {
    question: '기존 시스템과 연동이 가능한가요?',
    answer: '엔터프라이즈 플랜에서는 API를 통한 기존 ERP, 그룹웨어와의 연동이 가능합니다. 연동 방법에 대해 상담을 통해 안내해드립니다.'
  }
];

export default function PricingPage() {
  const [activeService, setActiveService] = useState(0);
  const currentService = services[activeService];

  return (
    <div className={styles.pricingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Award size={20} />
              <span>도입 안내</span>
            </div>
            <h1 className={styles.heroTitle}>
              비즈니스에 딱 맞는<br />
              <span className={styles.highlight}>스마트 솔루션을 만나보세요</span>
            </h1>
            <p className={styles.heroDesc}>
              서비스 소개부터 요금제, 도입 절차까지<br />
              성공적인 디지털 전환의 모든 것을 한 곳에서 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview Section with Tabs */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>제공 서비스</h2>
            <p className={styles.sectionSubtitle}>
              업종별 특화된 기능으로 사장님의 고민을 해결해 드립니다
            </p>
          </div>

          {/* Service Tabs */}
          <div className={styles.serviceTabs}>
            {services.map((service, index) => (
              <button
                key={service.id}
                className={clsx(styles.serviceTab, activeService === index && styles.active)}
                onClick={() => setActiveService(index)}
                style={{
                  borderBottomColor: activeService === index ? service.color : 'transparent'
                }}
              >
                <span className={styles.tabName}>{service.name}</span>
                <span className={styles.tabSubtitle}>{service.subtitle}</span>
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          <div className={styles.serviceContent}>
            {/* Service Header */}
            <div className={styles.serviceHeader}>
              <div className={styles.serviceHeaderText}>
                <h3 className={styles.serviceName} style={{ color: currentService.color }}>
                  {currentService.name}
                </h3>
                <p className={styles.serviceSubtitle}>{currentService.subtitle}</p>
                <p className={styles.serviceDescription}>{currentService.description}</p>
                <Link
                  href={`/services/${currentService.id}`}
                  className={styles.btnServiceDetail}
                  style={{ backgroundColor: currentService.color }}
                >
                  자세히 보기 <ArrowRight size={18} />
                </Link>
              </div>
              <div className={styles.serviceImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentService.image} alt={currentService.name} />
              </div>
            </div>

            {/* Key Features */}
            <div className={styles.keyFeatures}>
              <h4 className={styles.featuresTitle}>핵심 기능</h4>
              <div className={styles.featuresGrid}>
                {currentService.features.map((feature, idx) => (
                  <div key={idx} className={styles.featureCard}>
                    <div className={styles.featureIcon} style={{ color: currentService.color }}>
                      {feature.icon}
                    </div>
                    <h5>{feature.title}</h5>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Features */}
            <div className={styles.detailedFeatures}>
              <h4 className={styles.featuresTitle}>상세 기능</h4>
              {currentService.detailedFeatures.map((detail, idx) => (
                <div key={idx} className={styles.detailBlock}>
                  <h5 className={styles.detailTitle}>{detail.title}</h5>
                  <ul className={styles.detailList}>
                    {detail.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Check size={20} style={{ color: currentService.color }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className={styles.pricingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>요금제 선택</h2>
            <p className={styles.sectionSubtitle}>
              비즈니스 규모에 맞는 최적의 플랜을 선택하세요
            </p>
          </div>
          <PricingTable serviceName={currentService.name} serviceId={currentService.id} />
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>도입 절차</h2>
            <p className={styles.sectionSubtitle}>
              4단계로 간단하게 시작하는 스마트 경영
            </p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.processIcon} style={{ color: step.color }}>
                  {step.icon}
                </div>
                <div className={styles.processNumber}>{index + 1}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
            <p className={styles.sectionSubtitle}>
              도입 전 궁금한 점을 확인하세요
            </p>
          </div>
          <div className={styles.faqGrid}>
            {faqItems.map((faq, index) => (
              <div key={index} className={styles.faqCard}>
                <div className={styles.faqIcon}>
                  <HelpCircle size={24} />
                </div>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>지금 바로 시작하세요</h2>
            <p className={styles.ctaDesc}>
              14일 무료 체험으로 시스템을 직접 경험해보고,<br />
              전문 컨설턴트의 도입 상담을 받아보세요.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaButtonPrimary}>
                무료 체험 신청하기
                <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className={styles.ctaButtonSecondary}>
                도입 상담 문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
