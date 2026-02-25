"use client";

import styles from './privacy.module.css';

export default function PrivacyPage() {
    return (
        <div className={styles.privacyPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>개인정보처리방침</h1>
                    <p className={styles.subtitle}>(주)와우쓰리디는 이용자의 개인정보를 소중하게 보호합니다.</p>
                </header>

                <main className={styles.contentWrapper}>
                    <section className={styles.section}>
                        <h2>1. 개인정보의 처리 목적</h2>
                        <p>
                            (주)와우쓰리디(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                        </p>
                        <ul className={styles.list}>
                            <li><strong>서비스 제공:</strong> S/W 솔루션 제공, 교육 서비스 제공, 시제품 제작 지원, 콘텐츠 제공, 맞춤 서비스 제공 등</li>
                            <li><strong>고객 문의 처리:</strong> 이용자의 신원 확인, 문의사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등</li>
                            <li><strong>마케팅 및 광고에의 활용:</strong> 신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 등</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>2. 처리하는 개인정보의 항목</h2>
                        <p>회사는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.</p>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>수집 구분</th>
                                    <th>수집 항목</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>일반 문의 / 상담</td>
                                    <td>성명, 연락처(휴대폰 번호), 이메일 주소, 소속 기관/기업명</td>
                                </tr>
                                <tr>
                                    <td>서비스 이용 과정</td>
                                    <td>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className={styles.section}>
                        <h2>3. 개인정보의 처리 및 보유 기간</h2>
                        <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                        <ul className={styles.list}>
                            <li><strong>이용자 상담 및 문의:</strong> 상담 완료 후 1년</li>
                            <li><strong>계약 또는 청약철회 등에 관한 기록:</strong> 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li><strong>대금결제 및 재화 등의 공급에 관한 기록:</strong> 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li><strong>소비자의 불만 또는 분쟁처리에 관한 기록:</strong> 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>4. 개인정보의 제3자 제공</h2>
                        <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우나 법령의 규정에 의거한 경우에는 예외로 합니다.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>5. 이용자의 권리·의무 및 그 행사방법</h2>
                        <p>이용자는 개인정보주체로서 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>6. 개인정보의 안전성 확보 조치</h2>
                        <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                        <ul className={styles.list}>
                            <li>관리적 조치: 내부관리계획 수립·시행, 직원 대상 정기적 교육 등</li>
                            <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                            <li>물리적 조치: 데이터베이스 권한 관리 등</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>7. 개인정보 보호책임자</h2>
                        <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                        <ul className={styles.list}>
                            <li><strong>성명:</strong> 김순희</li>
                            <li><strong>직책:</strong> 대표이사</li>
                            <li><strong>연락처:</strong> 02-3144-3137 / 3dcookidhd@naver.com</li>
                        </ul>
                    </section>

                    <div className={styles.lastUpdated}>
                        <p>공고 일자: 2026년 2월 25일</p>
                        <p>시행 일자: 2026년 2월 25일</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
