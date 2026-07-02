"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { aboutNavItems } from "./about.data";
import styles from "./about.module.css";

function isNavActive(pathname: string, href: string) {
  if (href === "/about") return pathname === "/about";
  return pathname.startsWith(href);
}

export default function AboutSubNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.subNav} aria-label="회사 소개 하위 메뉴">
      <div className={styles.subNavInner}>
        <div className={styles.subNavScroll}>
          {aboutNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(styles.subNavLink, isNavActive(pathname, item.href) && styles.subNavLinkActive)}
              aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
