import { Shield } from "lucide-react";
import { certifications } from "../about.data";
import AboutContactCta from "../AboutContactCta";
import AboutPageHeader from "../AboutPageHeader";
import styles from "../about.module.css";

export default function CertificationsContent() {
  return (
    <div className={styles.aboutPage}>
      <AboutPageHeader
        title="인증 · 지정 현황"
        description="벤처·여성기업, ISO 9001, HRD·데이터사업자 등 공신력 있는 인증을 보유하고 있습니다"
        bg="certifications"
      />

      <section className={styles.certSection}>
        <div className="container">
          <div className={styles.certGrid}>
            {certifications.map((cert) => (
              <div key={cert.name} className={styles.certCard}>
                <div className={styles.certIcon}><Shield size={22} /></div>
                <h3>{cert.name}</h3>
                <p className={styles.certDate}>{cert.date}</p>
                <p className={styles.certOrg}>{cert.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutContactCta />
    </div>
  );
}
