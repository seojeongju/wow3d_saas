import AboutSubNav from "./AboutSubNav";
import styles from "./about.module.css";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.aboutLayout}>
      <AboutSubNav />
      <div className={styles.aboutMain}>{children}</div>
    </div>
  );
}
