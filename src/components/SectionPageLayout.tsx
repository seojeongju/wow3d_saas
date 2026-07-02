import clsx from "clsx";
import SectionSubNav from "./SectionSubNav";
import styles from "./SectionSubNav.module.css";
import type { NavChild } from "@/lib/navigation";

type SectionPageLayoutProps = {
  items: readonly NavChild[];
  ariaLabel: string;
  children: React.ReactNode;
  mainClassName?: string;
};

export default function SectionPageLayout({
  items,
  ariaLabel,
  children,
  mainClassName,
}: SectionPageLayoutProps) {
  return (
    <div className={styles.sectionLayout}>
      <SectionSubNav items={items} ariaLabel={ariaLabel} />
      <div className={clsx(styles.sectionMain, mainClassName)}>{children}</div>
    </div>
  );
}
