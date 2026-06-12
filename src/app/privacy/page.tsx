import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "(주)와우쓰리디 개인정보처리방침을 확인할 수 있습니다.",
  alternates: {
    canonical: "https://wow3dsw.co.kr/privacy",
  },
  openGraph: {
    title: "개인정보처리방침",
    description: "(주)와우쓰리디 개인정보처리방침을 확인할 수 있습니다.",
    url: "https://wow3dsw.co.kr/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
