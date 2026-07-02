import { getHeroBgStyle, type HeroBgKey } from "@/lib/heroBackgrounds";
import styles from "./about.module.css";

type AboutPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  dark?: boolean;
  bg?: HeroBgKey;
};

export default function AboutPageHeader({
  eyebrow,
  title,
  description,
  dark,
  bg = "company",
}: AboutPageHeaderProps) {
  const bgStyle = getHeroBgStyle(bg, dark ? "dark" : "light");

  return (
    <section className={dark ? styles.subHeroDark : styles.subHero} style={bgStyle}>
      <div className="container">
        <div className={styles.subHeroContent}>
          {eyebrow && <span className={styles.subHeroEyebrow}>{eyebrow}</span>}
          <h1 className={styles.subHeroTitle}>{title}</h1>
          <p className={styles.subHeroDesc}>{description}</p>
        </div>
      </div>
    </section>
  );
}
