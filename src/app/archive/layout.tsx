import SectionPageLayout from "@/components/SectionPageLayout";
import { supportSubNavItems } from "@/lib/navigation";

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionPageLayout items={supportSubNavItems} ariaLabel="고객지원 하위 메뉴">
      {children}
    </SectionPageLayout>
  );
}
