import type { Metadata } from "next";
import CertificationsContent from "./CertificationsContent";

export const metadata: Metadata = {
  title: "인증·지정 | (주)와우쓰리디",
  description: "벤처기업, 여성기업, ISO 9001, 기업부설연구소, HRD, 데이터사업자 인증 현황.",
};

export default function CertificationsPage() {
  return <CertificationsContent />;
}
