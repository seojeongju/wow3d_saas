"use client";
import PricingTable from '@/components/PricingTable';
import { Box, Users, BarChart3, Cloud } from 'lucide-react';
import Link from 'next/link';

export default function RetailServicePage() {
    return (
        <div className="services-page">
            {/* Page Header */}
            <section className="bg-gradient text-white py-20 text-center">
                <div className="container">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-4">Retail & Food</span>
                    <h1 className="text-4xl font-bold mb-4">스마트 재고/매출 관리 팩</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        도소매, 요식업 사장님을 위한 데이터 기반 경영 파트너.<br />
                        재고부터 주문, 고객 관리까지 하나의 시스템으로 완성하세요.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="service-detail-section">
                <div className="container">

                    {/* Intro Grid */}
                    <div className="mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all text-center">
                                <BarChart3 size={40} className="text-blue-600 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold mb-2">대시보드 & 지표</h3>
                                <p className="text-slate-600">매출, 주문 수, 재고 현황을 실시간으로 파악하여 빠른 의사결정을 돕습니다.</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all text-center">
                                <Box size={40} className="text-blue-600 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold mb-2">자동 발주 알림</h3>
                                <p className="text-slate-600">안전 재고 미만 시 알림을 보내 시기를 놓치지 않고 물품을 확보할 수 있습니다.</p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all text-center">
                                <Cloud size={40} className="text-blue-600 mb-4 mx-auto" />
                                <h3 className="text-xl font-bold mb-2">클라우드 ERP</h3>
                                <p className="text-slate-600">PC, 태블릿, 모바일 어디서든 접속하여 매장 상황을 모니터링하세요.</p>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image-wrapper mb-24 shadow-2xl rounded-xl overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/dashboard-hero.png" alt="Retail Dashboard" className="w-full h-auto object-cover" />
                    </div>

                    {/* Detailed Features */}
                    <div className="detailed-features">

                        {/* Feature 1 */}
                        <div className="feature-row mb-24 flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">
                                    <span className="text-blue-600 text-sm font-bold uppercase tracking-wider block mb-2">01 Product Management</span>
                                    복잡한 상품 옵션도<br />체계적으로 정리
                                </h3>
                                <p className="text-lg text-slate-600 mb-6">
                                    색상, 사이즈, 소재 등 다양한 옵션이 있는 상품도 문제없습니다.
                                    엑셀 대량 등록과 바코드 연동으로 쉽고 빠르게 등록하세요.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-blue-600 mt-1">✓</span>
                                        <span><strong>다중 옵션 관리:</strong> SKU별 재고 추적 및 가격 차등 설정</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-blue-600 mt-1">✓</span>
                                        <span><strong>이미지 갤러리:</strong> 상품별 고화질 이미지 보관 및 키오스크 연동</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 shadow-xl rounded-xl overflow-hidden border border-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/product-mgmt.png" alt="Product Management" className="w-full h-auto" />
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="feature-row mb-24 flex flex-col lg:flex-row-reverse items-center gap-12">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">
                                    <span className="text-blue-600 text-sm font-bold uppercase tracking-wider block mb-2">02 Inventory Control</span>
                                    빈틈없는 재고 추적
                                </h3>
                                <p className="text-lg text-slate-600 mb-6">
                                    실시간 입출고 기록은 기본, 창고별 재고 이동과
                                    고가품 시리얼 넘버 추적까지 지원하여 로스를 최소화합니다.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-blue-600 mt-1">✓</span>
                                        <span><strong>실시간 수불부:</strong> 입고, 출고, 반품 내역 자동 기록</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-blue-600 mt-1">✓</span>
                                        <span><strong>유통기한/시리얼:</strong> 선입선출 관리 및 개별 상품 이력 추적</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 shadow-xl rounded-xl overflow-hidden border border-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/inventory-mgmt.png" alt="Inventory Management" className="w-full h-auto" />
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="feature-row mb-24 flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">
                                    <span className="text-blue-600 text-sm font-bold uppercase tracking-wider block mb-2">03 Order Processing</span>
                                    주문부터 배송까지 원스톱
                                </h3>
                                <p className="text-lg text-slate-600 mb-6">
                                    온/오프라인 주문을 통합 관리하고, 택배 송장 출력부터 배송 추적까지
                                    한 번에 처리하여 업무 시간을 단축합니다.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-blue-600 mt-1">✓</span>
                                        <span><strong>주문 통합 리스트:</strong> 매장 POS, 전화, 엑셀 주문을 한 곳에서 관리</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <span className="text-blue-600 mt-1">✓</span>
                                        <span><strong>거래명세서 출력:</strong> 기업 고객용 명세서 및 세금계산서 연동 지원</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 shadow-xl rounded-xl overflow-hidden border border-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/order-mgmt.png" alt="Order Processing" className="w-full h-auto" />
                            </div>
                        </div>

                        {/* CRM Block */}
                        <div className="bg-slate-50 p-12 rounded-2xl text-center border border-slate-200 mb-20">
                            <Users size={48} className="text-blue-600 mb-6 mx-auto" />
                            <h3 className="text-2xl font-bold mb-4 text-slate-800">단골을 만드는 CRM</h3>
                            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                                고객별 구매 패턴을 분석하여 맞춤 쿠폰을 발송하고, <br />
                                기념일 챙겨주기 기능으로 감동 서비스를 실천하세요.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
                                <span className="px-4 py-2 bg-white rounded-lg shadow-sm border">고객 등급 관리</span>
                                <span className="px-4 py-2 bg-white rounded-lg shadow-sm border">포인트/적립금</span>
                                <span className="px-4 py-2 bg-white rounded-lg shadow-sm border">SMS 마케팅</span>
                            </div>
                        </div>

                    </div>

                    <PricingTable serviceName="재고/매출 관리" />
                </div>
            </section>

            <section className="cta-section bg-slate-100 py-20 text-center">
                <div className="container">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">매장 관리가 어려우신가요?</h2>
                    <p className="mb-8 text-slate-600">와우데이터비즈 전문 컨설턴트가 무료로 진단해 드립니다.</p>
                    <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-500/30">
                        무료 상담 신청하기
                    </Link>
                </div>
            </section>

            <style jsx>{`
        .bg-gradient {
            background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
        }
        .service-detail-section {
            padding: 5rem 0;
        }
      `}</style>
        </div>
    );
}
