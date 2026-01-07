"use client";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className={styles.logoWow}>WOW</span>
              <span className={styles.logoDatabiz}>DataBiz</span>
            </div>
            <p className={styles.brandDesc}>데이터 기반 스마트 경영 솔루션</p>
            
            {/* Company Info */}
            <div className={styles.companyInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>상호명:</span>
                <span className={styles.infoValue}>(주)와우쓰리디</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>대표자:</span>
                <span className={styles.infoValue}>김순희</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>사업자등록번호:</span>
                <span className={styles.infoValue}>849-88-01659</span>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>서비스</h4>
              <Link href="/services/retail">WOW-Smart Manager</Link>
              <Link href="/services/academy">NCS On-Track (온트랙)</Link>
              <Link href="/services">전체 서비스 보기</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4>고객지원</h4>
              <Link href="/contact">문의하기</Link>
              <Link href="/pricing">도입 안내</Link>
              <Link href="/pricing">자주 묻는 질문</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4>회사</h4>
              <Link href="/about">회사 소개</Link>
              <Link href="/contact">연락처</Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className={styles.footerContact}>
            <h4>센터 안내</h4>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <div className={styles.addressGroup}>
                <span className={styles.addressLabel}>홍대센터:</span>
                <span>서울시 마포구 독막로 93 상수빌딩 4층</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <div className={styles.addressGroup}>
                <span className={styles.addressLabel}>구미센터:</span>
                <span>경북 구미시 산호대로 253 구미첨단의료기술타워 606호</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <div className={styles.addressGroup}>
                <span className={styles.addressLabel}>전주센터:</span>
                <span>전북특별자치도 전주시 덕진구 반룡로 109 테크노빌A동 207호</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <span>02-3144-3137</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <a href="mailto:3dcookidhd@naver.com">3dcookidhd@naver.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © 2026 (주)와우쓰리디. All rights reserved.
            </p>
            <div className={styles.footerPolicies}>
              <Link href="/terms">이용약관</Link>
              <span className={styles.divider}>|</span>
              <Link href="/privacy">개인정보처리방침</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
