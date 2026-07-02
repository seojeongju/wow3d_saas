import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteContact } from "@/lib/contact";
import styles from "./about.module.css";

export default function AboutContactCta() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <div className={styles.contactCard}>
          <h2>와우쓰리디와 함께하세요</h2>
          <p>솔루션 도입, 제품 개발, 교육·시제품 제작 등 무엇이든 문의해 주세요.</p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Phone size={20} className={styles.contactIcon} />
              <a href={`tel:${siteContact.phones.seoul.replace(/-/g, "")}`}>{siteContact.phones.seoul}</a>
              <span className={styles.contactDivider}>·</span>
              <a href={`tel:${siteContact.phones.gumi.replace(/-/g, "")}`}>{siteContact.phones.gumi}</a>
            </div>
            <div className={styles.contactItem}>
              <Mail size={20} className={styles.contactIcon} />
              {siteContact.emails.map((email, index) => (
                <span key={email}>
                  {index > 0 && <span className={styles.contactDivider}>·</span>}
                  <a href={`mailto:${email}`}>{email}</a>
                </span>
              ))}
            </div>
          </div>
          <div className={styles.contactActions}>
            <Link href="/contact" className={styles.ctaButton}>문의하기</Link>
            <Link href="/gov-support" className={styles.ctaButtonSecondary}>정부지원 안내</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
