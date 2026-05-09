import type { Metadata } from "next";
import ArchiveClient from "./ArchiveClient";

export const metadata: Metadata = {
  title: "자료실",
  description: "(주)와우쓰리디 자료실에서 제품 안내 자료 및 서비스 문서를 확인하세요.",
  alternates: {
    canonical: "https://wow3dsw.co.kr/archive/",
  },
  openGraph: {
    title: "자료실",
    description: "(주)와우쓰리디 자료실에서 제품 안내 자료 및 서비스 문서를 확인하세요.",
    url: "https://wow3dsw.co.kr/archive/",
  },
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
