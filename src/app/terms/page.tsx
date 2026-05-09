import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "이용약관",
  description: "(주)와우쓰리디 서비스 이용약관을 확인할 수 있습니다.",
  alternates: {
    canonical: "https://wow3dsw.co.kr/terms/",
  },
  openGraph: {
    title: "이용약관",
    description: "(주)와우쓰리디 서비스 이용약관을 확인할 수 있습니다.",
    url: "https://wow3dsw.co.kr/terms/",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
