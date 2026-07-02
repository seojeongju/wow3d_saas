import type { Metadata } from "next";
import TechnologyContent from "./TechnologyContent";

export const metadata: Metadata = {
  title: "제품·기술 | (주)와우쓰리디",
  description: "3D홀로그램, MSLA 3D프린터, AI 솔루션, 보유 특허·장비 현황.",
};

export default function TechnologyPage() {
  return <TechnologyContent />;
}
