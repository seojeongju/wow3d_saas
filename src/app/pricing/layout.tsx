import SectionPageLayout from "@/components/SectionPageLayout";
import { businessSubNavItems } from "@/lib/navigation";

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionPageLayout items={businessSubNavItems} ariaLabel="비즈니스 가이드 하위 메뉴">
      {children}
    </SectionPageLayout>
  );
}
