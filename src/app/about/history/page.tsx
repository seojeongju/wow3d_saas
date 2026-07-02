import type { Metadata } from "next";
import HistoryContent from "./HistoryContent";

export const metadata: Metadata = {
  title: "성장 연혁 | (주)와우쓰리디",
  description: "㈜와우쓰리디의 성장 연혁. 2016년 3D프린팅 교육부터 AI·홀로그램·스마트제조 융합 기업으로 성장한 여정.",
};

export default function HistoryPage() {
  return <HistoryContent />;
}
