"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { isSubNavActive, type NavChild } from "@/lib/navigation";
import styles from "./SectionSubNav.module.css";

type SectionSubNavProps = {
  items: readonly NavChild[];
  ariaLabel: string;
};

export default function SectionSubNav({ items, ariaLabel }: SectionSubNavProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.subNav} aria-label={ariaLabel}>
      <div className={styles.subNavInner}>
        <div className={styles.subNavScroll}>
          {items.map((item) => {
            const active = isSubNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(styles.subNavLink, active && styles.subNavLinkActive)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
