"use client";

import { useState } from "react";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./contact.module.css";

// EmailJS Configuration Keys (Replace these with your actual keys from EmailJS Dashboard)
// It is recommended to put these in .env.local file as:
// NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_mtlwmkf";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_phkwwx3";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "nc21fq4bp_z8wmpLA";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Prepare template parameters
    // These names must match the variable names in your EmailJS template (e.g., {{from_name}}, {{message}}, etc.)
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      message: formData.message,
      to_email: 'wow3d16@naver.com' // You can use this variable in EmailJS template as {{to_email}}
    };

    try {
      // Send email using EmailJS
      // Note: You must sign up at https://www.emailjs.com/ to get these IDs
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: ""
      });

    } catch (error) {
      console.error('Email send failed:', error);
      setIsSubmitting(false);
      setErrorMessage("메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <MessageCircle size={20} />
              <span>문의하기</span>
            </div>
            <h1 className={styles.heroTitle}>
              궁금한 점이 있으신가요?<br />
              <span className={styles.highlight}>언제든지 문의해 주세요</span>
            </h1>
            <p className={styles.heroDesc}>
              도입 상담, 기술 지원, 가격 문의 등 어떤 질문이든 친절하게 답변해드립니다.<br />
              평일 09:00 ~ 18:00 운영시간 내 빠른 응답을 약속드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2>문의하기</h2>
                <p>아래 양식을 작성해 주시면 담당자가 빠르게 연락드리겠습니다.</p>
              </div>

              {errorMessage && (
                <div className={styles.errorMessage} style={{ padding: '1rem', backgroundColor: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '0.5rem', marginBottom: '1.5rem', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>문의가 성공적으로 전송되었습니다!</h3>
                  <p>빠른 시일 내에 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">이름 <span className={styles.required}>*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="홍길동"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">이메일 <span className={styles.required}>*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">연락처 <span className={styles.required}>*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="010-1234-5678"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="company">회사명</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="(주)회사명"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="service">관심 서비스</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={styles.formSelect}
                    >
                      <option value="">서비스를 선택해 주세요</option>
                      <option value="wow-smart-manager">WOW-Smart Manager</option>
                      <option value="ncs-on-track">NCS On-Track (온트랙)</option>
                      <option value="wow-cbt">WOW-CBT (와우CBT)</option>
                      <option value="other">기타 문의</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">문의 내용 <span className={styles.required}>*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="문의하실 내용을 자세히 작성해 주세요."
                      className={styles.formTextarea}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        문의하기
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h3>연락처 정보</h3>
                <div className={styles.contactItems}>
                  <div className={styles.contactItem}>
                    <Phone size={20} className={styles.contactIcon} />
                    <div>
                      <span className={styles.contactLabel}>전화</span>
                      <a href="tel:02-3144-3137" className={styles.contactValue}>02-3144-3137 / 054-464-3144</a>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <Mail size={20} className={styles.contactIcon} />
                    <div>
                      <span className={styles.contactLabel}>이메일</span>
                      <a href="mailto:wow3d16@naver.com" className={styles.contactValue}>wow3d16@naver.com</a>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <Clock size={20} className={styles.contactIcon} />
                    <div>
                      <span className={styles.contactLabel}>운영시간</span>
                      <span className={styles.contactValue}>평일 09:00 ~ 18:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>센터 위치</h3>
                <div className={styles.addressItems}>
                  <div className={styles.addressItem}>
                    <MapPin size={20} className={styles.addressIcon} />
                    <div>
                      <span className={styles.addressLabel}>홍대센터</span>
                      <p className={styles.addressText}>서울시 마포구 독막로 93<br />상수빌딩 4층</p>
                    </div>
                  </div>
                  <div className={styles.addressItem}>
                    <MapPin size={20} className={styles.addressIcon} />
                    <div>
                      <span className={styles.addressLabel}>구미센터</span>
                      <p className={styles.addressText}>경북 구미시 산호대로 253<br />구미첨단의료기술타워 606호</p>
                    </div>
                  </div>
                  <div className={styles.addressItem}>
                    <MapPin size={20} className={styles.addressIcon} />
                    <div>
                      <span className={styles.addressLabel}>전주센터</span>
                      <p className={styles.addressText}>전북특별자치도 전주시 덕진구 반룡로 109<br />테크노빌A동 207호</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.quickLinks}>
                <h4>빠른 링크</h4>
                <Link href="/services" className={styles.quickLink}>
                  서비스 소개
                </Link>
                <Link href="/pricing" className={styles.quickLink}>
                  도입 안내
                </Link>
                <Link href="/about" className={styles.quickLink}>
                  회사 소개
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
