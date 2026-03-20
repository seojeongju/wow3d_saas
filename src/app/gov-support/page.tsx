"use client";

import Link from 'next/link';
import {
  Factory,
  Store,
  Settings,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Info,
  TrendingUp,
  Database,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';
import styles from './gov-support.module.css';

const sections = [
  {
    id: 'manufacturing',
    title: '스마트제조',
    subtitle: 'Smart Manufacturing',
    desc: '제조 전 과정에 디지털 자동화 솔루션을 결합하여 생산성, 품질, 고객 만족도를 향상시키는 지능형 생산 체계입니다.',
    icon: <Cpu size={30} />,
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    imageUrl: '/images/gov/smart_manufacturing.png',
    imageAlt: 'AI 및 디지털 트윈이 적용된 스마트 제조 공정 시각화',
    details: [
      {
        label: '지원 대상',
        content: '국내 중소·중견 제조기업'
      },
      {
        label: '핵심 과제',
        content: '설계·개발, 제조, 유통·물류 등 가치사슬 전반의 디지털 전환(DX) 가속화',
        list: [
          '디지털 트윈 기반 공정 통합 시스템',
          '실시간 데이터 수집 및 예지 정비 구축',
          '제조 데이터 저장소 및 클라우드 연동'
        ]
      },
      {
        label: '지원 규모',
        content: '전체 사업비의 최대 50% 이내 국비 지원'
      }
    ]
  },
  {
    id: 'factory',
    title: '스마트공장',
    subtitle: 'Smart Factory',
    desc: '기획·설계, 생산, 유통, 판매 등 전 과정을 IoT·AI·빅데이터 기술로 통합하여 최소 비용과 시간으로 맞춤형 제품을 생산하는 똑똑한 공장을 의미합니다.',
    icon: <Factory size={30} />,
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    imageUrl: '/images/gov/smart_factory.png',
    imageAlt: '첨단 로봇과 자동화 설비가 구축된 스마트 공장 내부',
    details: [
      {
        label: '지원 대상',
        content: '스마트공장 보급 및 고도화가 필요한 제조 기업'
      },
      {
        label: '지원 내용',
        content: '솔루션(MES, ERP 등) 구축 및 자동화 장비, 센서, 제어기 연결 지원',
        list: [
          '기초: 생산 정보 디지털 관리',
          '고도화1: 실시간 분석 및 제어 자동화',
          '고도화2: AI 기반의 자율 최적화 구현'
        ]
      },
      {
        label: '지원 규모',
        content: '고도화 단계에 따라 최대 2억원 지원'
      }
    ]
  },
  {
    id: 'service',
    title: '스마트서비스',
    subtitle: 'Smart Service',
    desc: '비대면 서비스, 데이터 기반의 비즈니스 모델(BM) 창출, 공정 혁신 등 서비스 분야의 디지털 전환을 위해 스마트 기술 도입을 적극 지원합니다.',
    icon: <Settings size={30} />,
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    imageUrl: '/images/gov/smart_service.png',
    imageAlt: '디지털 서비스 및 고객 데이터 분석 플랫폼 환경',
    details: [
      {
        label: '지원 대상',
        content: '서비스 산업 분야의 디지털 혁신을 희망하는 중소기업'
      },
      {
        label: '지원 내용',
        content: 'AI, 빅데이터, 메타버스 등 첨단 기술을 활용한 서비스 고도화 솔루션 구축',
        list: [
          '스마트 서비스 모델 개발 및 컨설팅',
          '고객 맞춤형 데이터 서비스 솔루션 도입',
          '비대면 업무 환경 및 워크플로우 디지털화'
        ]
      },
      {
        label: '지원 규모',
        content: '유형별 지원 금액 상이 (공고 확인 필요)'
      }
    ]
  },
  {
    id: 'shop',
    title: '스마트상점',
    subtitle: 'Smart Shop',
    desc: '소상공인의 자생력과 경쟁력을 강화하기 위해 키오스크, 서빙로봇 등 최신 기술을 점포에 도입하여 운영의 효율성을 극대화합니다.',
    icon: <Store size={30} />,
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    imageUrl: '/images/gov/smart_shop.jpg',
    imageAlt: '키오스크와 자동화 기기가 설치된 현대적인 스마트 상점',
    details: [
      {
        label: '지원 대상',
        content: '전국 소상공인 실질 운영 점포'
      },
      {
        label: '기술 보급',
        content: '경영 효율화 및 서비스 개선을 위한 맞춤형 스마트 기술 패키지',
        list: [
          '일반: 테이블오더, 전자 메뉴판 등',
          '고도화: 서빙로봇, 무인 제어 시스템 등',
          '장애인 배려형 베리어프리 키오스크 우대'
        ]
      },
      {
        label: '지원 규모',
        content: '도입 비용의 일부 지원 (최대 지원금 상이)'
      }
    ]
  }
];

export default function GovSupportPage() {
  return (
    <div className={styles.govSupportPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Info size={18} />
              <span>사업 안내</span>
            </div>
            <div className={styles.officialBadge}>
              <CheckCircle2 size={16} />
              <span>(주)와우쓰리디(WOW3D)는 스마트공장, 스마트제조, 스마트서비스, 스마트상점 <strong>공식공급업체</strong>입니다.</span>
            </div>
            <h1 className={styles.heroTitle}>
              정부지원사업으로<br />
              <span className={styles.highlight}>비즈니스 혁신을 시작하세요</span>
            </h1>
            <p className={styles.heroDesc}>
              중소·중견기업 및 소상공인의 성공적인 디지털 전환을 위해<br />
              분야별 정부지원사업 상세 내용을 안내해 드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <div className={styles.sectionsContainer}>
        {sections.map((section) => (
          <section key={section.id} className={styles.sectionCard} id={section.id}>
            <div className={styles.sectionInfo}>
              <div className={styles.sectionText}>
                <div
                  className={styles.iconWrapper}
                  style={{ backgroundColor: section.bgColor, color: section.color }}
                >
                  {section.icon}
                </div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <span className={styles.sectionSubtitle} style={{ color: section.color }}>{section.subtitle}</span>
                <p className={styles.sectionDesc}>{section.desc}</p>
              </div>
              
              {(section as any).imageUrl && (
                <div className={styles.sectionImageWrapper}>
                  <Image 
                    src={(section as any).imageUrl} 
                    alt={(section as any).imageAlt} 
                    width={500} 
                    height={300} 
                    className={styles.sectionImage}
                  />
                </div>
              )}
            </div>

            <div className={styles.detailsGrid}>
              {section.details.map((detail, idx) => (
                <div key={idx} className={styles.detailItem}>
                  <div className={styles.detailLabel}>
                    {idx === 0 && <CheckCircle2 size={20} className="text-blue-500" />}
                    {idx === 1 && <Database size={20} className="text-indigo-500" />}
                    {idx === 2 && <TrendingUp size={20} className="text-emerald-500" />}
                    {detail.label}
                  </div>
                  <p className={styles.detailContent}>{detail.content}</p>
                  {detail.list && (
                    <ul className={styles.detailList}>
                      {detail.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>도움이 필요하신가요?</h2>
            <p className={styles.ctaDesc}>
              정부지원사업 신청 절차부터 솔루션 구축까지,<br />
              전담 컨설턴트가 상세히 안내해 드립니다.
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              <MessageSquare size={20} />
              1:1 구축 상담 신청하기 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
