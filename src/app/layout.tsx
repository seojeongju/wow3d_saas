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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'd80QQEjoUFOsd7_3bW9Z_YDPO62Hq0AktzeKtjINNoo',
    other: {
      'naver-site-verification': '71fb7d98263e39574312032d11782b32c3cf86ad',
      'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'd80QQEjoUFOsd7_3bW9Z_YDPO62Hq0AktzeKtjINNoo',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const naverVerification = '71fb7d98263e39574312032d11782b32c3cf86ad';
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'd80QQEjoUFOsd7_3bW9Z_YDPO62Hq0AktzeKtjINNoo';

  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content={naverVerification} />
        {googleVerification && (
          <meta name="google-site-verification" content={googleVerification} />
        )}
      </head>
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
