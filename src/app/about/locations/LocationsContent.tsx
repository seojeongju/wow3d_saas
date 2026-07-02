import { Globe, MapPin, Phone } from "lucide-react";
import { centers } from "../about.data";
import AboutContactCta from "../AboutContactCta";
import AboutPageHeader from "../AboutPageHeader";
import styles from "../about.module.css";

export default function LocationsContent() {
  return (
    <div className={styles.aboutPage}>
      <AboutPageHeader
        title="전국 센터 안내"
        description="서울·구미·전주 3개 거점에서 연구·교육·제작 서비스를 제공합니다"
        bg="locations"
      />

      <section className={styles.centersSection}>
        <div className="container">
          <div className={styles.centersGrid}>
            {centers.map((center) => (
              <div key={center.name} className={styles.centerCard}>
                <div className={styles.centerIcon}><MapPin size={22} /></div>
                <h3>{center.name}</h3>
                <p className={styles.centerSubtitle}>{center.subtitle}</p>
                <p className={styles.centerAddress}>{center.address}</p>
                <div className={styles.centerContact}>
                  <a href={`tel:${center.tel.replace(/-/g, "")}`}>
                    <Phone size={16} /> {center.tel}
                  </a>
                  <a href={center.url} target="_blank" rel="noreferrer">
                    <Globe size={16} /> {center.url.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutContactCta />
    </div>
  );
}
