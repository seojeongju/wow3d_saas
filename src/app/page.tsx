import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "(주)와우쓰리디 | 스마트제조·ERP/CRM 솔루션 공식공급",
  description: "(주)와우쓰리디는 스마트공장, 스마트상점 공급기업으로 비즈니스 디지털 전환을 위한 ERP, CRM, LMS 솔루션을 제공합니다.",
  openGraph: {
    title: "(주)와우쓰리디 | 스마트제조·ERP/CRM 솔루션 공식공급",
    description: "(주)와우쓰리디(WOW3D)는 스마트제조, ERP, CRM 개발 및 정부지원사업 솔루션으로 비즈니스 제조 혁신을 선도합니다.",
  }
};

export default function Home() {
  return <HomeClient />;
}
