import SectionPageLayout from "@/components/SectionPageLayout";
import { hardwareSubNavItems } from "@/lib/navigation";

export default function HardwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionPageLayout items={hardwareSubNavItems} ariaLabel="제품(Hardware) 하위 메뉴">
      {children}
    </SectionPageLayout>
  );
}
