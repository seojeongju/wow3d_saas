import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "와우데이터비즈 - 스마트상점 경영지원 데이터 솔루션",
  description: "소상공인을 위한 데이터 기반 POS, 재고관리, NCS 학사관리, CBT 문제은행 솔루션. 스마트상점 기술보급사업 공급기업.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - var(--header-height) - 300px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
