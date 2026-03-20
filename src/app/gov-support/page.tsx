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
  MessageSquare 
} from 'lucide-react';
import styles from './gov-support.module.css';

const sections = [
  {
    id: 'manufacturing',
    title: '스마트제조',
    subtitle: 'Smart Manufacturing',
    desc: '제조 전 과정에 디지털 자동화 솔루션이 결합된 ICT를 적용하여 생산성, 품질, 고객 만족도를 향상시키는 지능형 생산 체계를 의미합니다.',
    icon: <Cpu size={32} />,
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    details: [
      {
        label: '지원 대상',
        content: '국내 중소·중견 제조기업'
      },
      {
        label: '지원 내용',
        content: '제품 기획, 설계, 생산, 유통, 판매 등 전 생산 과정의 통합 및 최적화를 위한 소프트웨어 및 하드웨어 도입 지원',
        list: [
          '제조 공정 자동화 및 시스템 도입',
          '실시간 공정 제어 및 데이터 분석',
          'SCM/ERP 등 사내외 정보 연계'
        ]
      },
      {
        label: '지원 규모',
        content: '유형별 차등 지원 (정부지원금 총 사업비의 50% 이내)'
      }
    ]
  },
  {
    id: 'factory',
    title: '스마트공장',
    subtitle: 'Smart Factory',
    desc: 'ICT(정보통신기술)를 활용하여 제품 기획부터 판매까지 전 생산 과정을 통합하고 최적화하여 최소 비용과 시간으로 제품을 생산하는 첨단 공장입니다.',
    icon: <Factory size={32} />,
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    details: [
      {
        label: '지원 대상',
        content: '스마트공장 구축 및 고도화 희망 기업'
      },
      {
        label: '지원 내용',
        content: 'IoT, AI, 클라우드, 디지털트윈 기반 스마트공장 솔루션 및 연동 설비 구축 지원',
        list: [
          '기초: 스마트공장 최초 도입',
          '고도화1: 중간1 수준 이상 달성 목표',
          '고도화2: AI/빅데이터 기반 지능형 공장 구현'
        ]
      },
      {
        label: '지원 규모',
        content: '고도화 단계별 최대 2억원 (총 사업비의 50% 이내)'
      }
    ]
  },
  {
    id: 'service',
    title: '스마트서비스',
    subtitle: 'Smart Service',
    desc: '중소기업의 서비스 분야 디지털 전환을 촉진하기 위해 새로운 BM 창출 및 공정 혁신 등 스마트 서비스 도입을 지원합니다.',
    icon: <Settings size={32} />,
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    details: [
      {
        label: '지원 대상',
        content: '서비스 분야 디지털 전환을 희망하는 중소기업'
      },
      {
        label: '지원 내용',
        content: '비대면 서비스 도입, 내부 공정의 디지털화, 빅데이터를 활용한 새로운 고객 서비스 창출 지원',
        list: [
          '스마트 서비스 모델 개발 컨설팅',
          '데이터 기반 고객 맞춤형 서비스 구축',
          '업무리프로세스 재설계(BPR) 및 시스템 도입'
        ]
      },
      {
        label: '지원 규모',
        content: '정부 과제 공고 및 유형에 따라 상이'
      }
    ]
  },
  {
    id: 'shop',
    title: '스마트상점',
    subtitle: 'Smart Shop',
    desc: '소상공인 점포의 경영 효율화와 디지털 전환을 위해 첨단 스마트 기술 도입 비용을 지원하는 사업입니다.',
    icon: <Store size={32} />,
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    details: [
      {
        label: '지원 대상',
        content: '전국 소상공인 점포 (정상 영업 중인 사업자)'
      },
      {
        label: '지원 내용',
        content: '키오스크, 서빙로봇, 사이니지, 테이블오더 등 상점 운영 효율화를 위한 스마트 기술 보급',
        list: [
          '일반형: 키오스크, 테이블오더 등 보급',
          '전문형: 서빙로봇 등 고도화 기술 지원',
          '배리어프리 모델 지원 (우대)'
        ]
      },
      {
        label: '지원 규모',
        content: '기술 도입 비용의 70~80% 지원 (점포당 최대 700만원 내외)'
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
