import type { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "관리자 페이지",
  description: "자료실 관리자 페이지",
  alternates: {
    canonical: "https://wow3dsw.co.kr/admin/",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminDashboard() {
  return <AdminDashboardClient />;
}
