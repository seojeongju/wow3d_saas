"use client";
import Link from "next/link";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={`${styles.footerLogo} mb-4`}>
              <span className={styles.logoWow}>WOW</span>
              <span className={styles.logoDatabiz}>DataBiz</span>
            </div>
            <p>스마트상점 기술보급사업 공식 공급기업</p>
            <p className={styles.copyright}>© 2026 WoW Data Biz. All rights reserved.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>서비스</h4>
              <Link href="/services/retail">재고/매출 관리</Link>
              <Link href="/services/academy">아카데미 관리</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4>고객지원</h4>
              <Link href="/contact">문의하기</Link>
              <Link href="/pricing">자주 묻는 질문</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
