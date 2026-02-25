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
  metadataBase: new URL('https://wow3dsw.co.kr'),
  title: {
    default: "와우데이터비즈 (WOW DataBiz) - 스마트 경영지원 데이터 솔루션",
    template: "%s | 와우데이터비즈"
  },
  description: "도소매·요식업 재고관리(Smart Manager), HRD 학사관리(On-Track), CBT 문제은행, 3D프린팅 AI 견적시스템까지. 소상공인을 위한 최적의 SaaS 솔루션을 만나보세요.",
  keywords: ["와우데이터비즈", "와우쓰리디", "재고관리시스템", "학사관리시스템", "CBT문제은행", "3D프린팅견적", "스마트매니저", "온트랙", "SaaS솔루션"],
  authors: [{ name: "(주)와우쓰리디" }],
  creator: "(주)와우쓰리디",
  publisher: "(주)와우쓰리디",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "와우데이터비즈 - 스마트 경영지원 데이터 솔루션",
    description: "데이터로 앞서가는 스마트 경영. 재고관리부터 학사관리까지 올인원 SaaS 솔루션",
    url: 'https://wow3dsw.co.kr',
    siteName: '와우데이터비즈',
    images: [
      {
        url: '/images/wow-smart-manager-hero.jpg',
        width: 1200,
        height: 630,
        alt: '와우데이터비즈 서비스 메인',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "와우데이터비즈 - 스마트 경영지원 데이터 솔루션",
    description: "데이터로 앞서가는 스마트 경영. 재고관리부터 학사관리까지 올인원 SaaS 솔루션",
    images: ['/images/wow-smart-manager-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 여기에 네이버 서치어드바이저, 구글 서치콘솔 인증 코드를 넣을 수 있습니다.
    // google: 'google-site-verification-code',
    // other: {
    //   'naver-site-verification': 'naver-site-verification-code',
    // },
  },
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
