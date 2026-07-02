import SectionPageLayout from "@/components/SectionPageLayout";
import { aboutSubNavItems } from "@/lib/navigation";
import styles from "./about.module.css";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionPageLayout
      items={aboutSubNavItems}
      ariaLabel="회사 소개 하위 메뉴"
      mainClassName={styles.aboutMain}
    >
      {children}
    </SectionPageLayout>
  );
}
