import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "(주)와우쓰리디 | 스마트제조·ERP/CRM 솔루션 공식공급",
  description: "(주)와우쓰리디는 스마트공장, 스마트상점 공급기업으로 비즈니스 디지털 전환을 위한 ERP, CRM, LMS 솔루션을 제공합니다.",
  keywords: ["와우쓰리디", "스마트제조", "스마트공장", "스마트상점", "ERP 솔루션", "CRM 개발", "MES 구축", "LMS 솔루션", "3D프린팅", "정부지원사업 공급기업", "업무자동화", "무료 3D 뷰어", "무료 QR 생성기", "이미지 SVG 변환", "소상공인 스마트기술", "전사적 자원관리", "생산물류 시스템", "학사관리 시스템"],
  openGraph: {
    title: "(주)와우쓰리디 | 스마트제조·ERP/CRM 솔루션 공식공급",
    description: "(주)와우쓰리디(WOW3D)는 스마트제조, ERP, CRM 개발 및 정부지원사업 솔루션으로 비즈니스 제조 혁신을 선도합니다.",
  }
};

export default function Home() {
  return <HomeClient />;
}
