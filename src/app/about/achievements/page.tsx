import type { Metadata } from "next";
import AchievementsContent from "./AchievementsContent";

export const metadata: Metadata = {
  title: "사업 실적 | (주)와우쓰리디",
  description: "스마트제조, 데이터바우처, R&D, 산학협력 등 ㈜와우쓰리디의 주요 사업 수행 실적.",
};

export default function AchievementsPage() {
  return <AchievementsContent />;
}
