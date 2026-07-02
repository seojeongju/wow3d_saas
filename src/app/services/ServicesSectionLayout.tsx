"use client";

import { usePathname } from "next/navigation";
import SectionPageLayout from "@/components/SectionPageLayout";
import { educationSubNavItems, servicesSubNavItems } from "@/lib/navigation";

export default function ServicesSectionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEducationCenter = pathname.startsWith("/services/academy/center");

  if (isEducationCenter) {
    return (
      <SectionPageLayout items={educationSubNavItems} ariaLabel="교육 센터 하위 메뉴">
        {children}
      </SectionPageLayout>
    );
  }

  return (
    <SectionPageLayout items={servicesSubNavItems} ariaLabel="AI S/W 솔루션 하위 메뉴">
      {children}
    </SectionPageLayout>
  );
}
