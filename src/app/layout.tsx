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
    default: "(주)와우쓰리디 - 스마트공장·3D프린팅·정부지원사업 공식공급업체",
    template: "%s | (주)와우쓰리디"
  },
  description: "(주)와우쓰리디(WOW3D)는 스마트공장, 스마트제조, 스마트서비스, 스마트상점 정부지원사업 공식공급업체입니다. 3D프린팅 시제품 제작 대행부터 지능형 공장 구축까지 최적의 솔루션을 제공합니다.",
  keywords: ["와우쓰리디", "WOW3D", "(주)와우쓰리디", "와우3D", "스마트공장", "스마트제조", "스마트상점", "스마트서비스", "정부지원사업", "공식공급업체", "3D프린팅", "시제품제작", "3D프린터출력"],
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
    title: "(주)와우쓰리디 - 스마트공장·3D프린팅 공식공급업체",
    description: "(주)와우쓰리디(WOW3D)는 보급형부터 산업용 3D프린터, 스마트공장 구축 솔루션까지 제조 혁신을 선도합니다.",
    url: 'https://wow3dsw.co.kr',
    siteName: '(주)와우쓰리디',
    images: [
      {
        url: '/images/wow-smart-manager-hero.jpg',
        width: 1200,
        height: 630,
        alt: '와우쓰리디 서비스 메인',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "(주)와우쓰리디 - 스마트공장·3D프린팅 공식공급업체",
    description: "(주)와우쓰리디(WOW3D)는 제조 혁신을 위한 스마트 솔루션과 3D프린팅 시제품 제작 대행 서비스를 제공합니다.",
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

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "(주)와우쓰리디",
    "alternateName": ["WOW3D", "와우쓰리디"],
    "url": "https://wow3dsw.co.kr",
    "logo": "https://wow3dsw.co.kr/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-2-3144-3137",
      "contactType": "customer service",
      "areaServed": "KR",
      "availableLanguage": "Korean"
    },
    "description": "(주)와우쓰리디(WOW3D)는 스마트공장, 스마트제조, 스마트서비스, 스마트상점 정부지원사업 공식공급업체입니다."
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "(주)와우쓰리디",
    "url": "https://wow3dsw.co.kr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://wow3dsw.co.kr/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content={naverVerification} />
        {googleVerification && (
          <meta name="google-site-verification" content={googleVerification} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
