"use client";

import styles from './terms.module.css';

export default function TermsPage() {
    return (
        <div className={styles.termsPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>이용약관</h1>
                    <p className={styles.subtitle}>(주)와우쓰리디 서비스 이용을 위한 약관 안내입니다.</p>
                </header>

                <main className={styles.contentWrapper}>
                    <section className={styles.section}>
                        <h2>제 1 조 (목적)</h2>
                        <p>
                            본 약관은 (주)와우쓰리디(이하 "회사")가 운영하는 웹사이트 및 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>제 2 조 (용어의 정의)</h2>
                        <ul className={styles.list}>
                            <li><strong>서비스:</strong> 회사가 제공하는 모든 S/W 솔루션, 교육 콘텐츠, 시제품 제작 지원 및 하드웨어 판매 관련 제반 서비스를 의미합니다.</li>
                            <li><strong>이용자:</strong> 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                            <li><strong>회원:</strong> 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>제 3 조 (약관의 명시와 개정)</h2>
                        <ul className={styles.list}>
                            <li>회사는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 쉽게 알 수 있도록 초기 서비스 화면에 게시합니다.</li>
                            <li>회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                            <li>약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>제 4 조 (서비스의 제공 및 변경)</h2>
                        <p>회사는 다음과 같은 업무를 수행합니다.</p>
                        <ul className={styles.list}>
                            <li>AI S/W 솔루션(Smart Manager, On-Track 등) 제공</li>
                            <li>3D 프린팅 및 자동 견적 시스템 운영</li>
                            <li>전문 기술 교육 및 컨설팅 서비스</li>
                            <li>3D 프린터 및 관련 하드웨어 판매</li>
                            <li>기타 회사가 정하는 업무</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>제 5 조 (서비스 이용의 제한 및 중단)</h2>
                        <ul className={styles.list}>
                            <li>회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                            <li>회사는 국가 비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우 서비스의 전부 또는 일부를 제한하거나 중단할 수 있습니다.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>제 6 조 (이용자의 의무)</h2>
                        <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
                        <ul className={styles.list}>
                            <li>신청 또는 변경 시 허위 내용의 등록</li>
                            <li>타인의 정보 도용</li>
                            <li>회사가 게시한 정보의 변경</li>
                            <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시</li>
                            <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                            <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>제 7 조 (저작권의 귀속 및 이용제한)</h2>
                        <ul className={styles.list}>
                            <li>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                            <li>이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</li>
                        </ul>
                    </section>

                    <div className={styles.lastUpdated}>
                        <p>시행 일자: 2026년 2월 25일</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
