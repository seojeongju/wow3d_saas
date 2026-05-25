"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  QrCode as QrIcon, 
  Download, 
  HelpCircle,
  Check,
  Wifi,
  Link as LinkIcon,
  Phone,
  Palette,
  Sliders,
  Settings
} from 'lucide-react';
import clsx from 'clsx';
import styles from './qrBuilder.module.css';

// QR 코드 생성 디자인 설정 옵션 인터페이스
interface QrDesignOptions {
  fgColor: string;
  bgColor: string;
  qrSize: number;
  correctLevel: 'L' | 'M' | 'Q' | 'H';
}

// CDN 기반 qrcodejs 라이브러리 동적 스크립트 인젝션 헬퍼
const loadQrCodeLibrary = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any).QRCode) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => {
      resolve();
    };
    script.onerror = () => reject(new Error('QR Code 빌더 라이브러리 주입에 실패하였습니다.'));
    document.head.appendChild(script);
  });
};

export default function QrBuilderPage() {
  // --- 상태 관리 ---
  const [qrType, setQrType] = useState<'url' | 'wifi' | 'tel'>('url');
  const [isScriptsLoaded, setIsScriptsLoaded] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 입력 폼 필드 제어
  const [urlValue, setUrlValue] = useState<string>('https://');
  
  // Wi-Fi 폼 필드 제어
  const [wifiSsid, setWifiSsid] = useState<string>('');
  const [wifiPassword, setWifiPassword] = useState<string>('');
  const [wifiSecurity, setWifiSecurity] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // 전화 폼 필드 제어
  const [telNumber, setTelNumber] = useState<string>('');

  // 디자인 커스텀 제어 상태
  const [designOpts, setDesignOpts] = useState<QrDesignOptions>({
    fgColor: '#0f172a', // 짙은 네이비 전경색
    bgColor: '#ffffff', // 백색 배경
    qrSize: 256,
    correctLevel: 'H' // 로고 중첩이나 손상에 강한 High 레벨 디폴트
  });

  const qrHolderRef = useRef<HTMLDivElement>(null);

  // --- 토스트 알림 피드백 ---
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // --- 1. 컴포넌트 마운트 시 qrcode.js 비동기 로드 ---
  useEffect(() => {
    loadQrCodeLibrary()
      .then(() => {
        setIsScriptsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        showToast(err.message || 'QR 코드 라이브러리 초기화 실패');
      });
  }, []);

  // --- 2. 입력 값 또는 옵션 변경 시 디바운스 실시간 QR 코드 자동 렌더링 (300ms) ---
  useEffect(() => {
    if (!isScriptsLoaded) return;

    // 빌드할 로우 텍스트 유효성 검사 및 문자열 빌드
    let rawText = '';
    
    if (qrType === 'url') {
      if (!urlValue || urlValue.trim() === '' || urlValue === 'https://' || urlValue === 'http://') {
        setIsGenerated(false);
        return;
      }
      rawText = urlValue.trim();
    } else if (qrType === 'wifi') {
      if (!wifiSsid || wifiSsid.trim() === '') {
        setIsGenerated(false);
        return;
      }
      // 와이파이 자동 연동 표준 규격 빌드: WIFI:S:네트워크이름;T:보안종류;P:비밀번호;;
      rawText = `WIFI:S:${wifiSsid.trim()};T:${wifiSecurity};P:${wifiPassword};;`;
    } else if (qrType === 'tel') {
      if (!telNumber || telNumber.trim() === '') {
        setIsGenerated(false);
        return;
      }
      // 다이얼 즉시 연결 규격: tel:전화번호
      rawText = `tel:${telNumber.trim()}`;
    }

    const timer = setTimeout(() => {
      if (!qrHolderRef.current) return;

      try {
        const QRCode = (window as any).QRCode;
        
        // 기존 렌더러가 생성해둔 자식 캔버스/이미지 노드들 청소
        qrHolderRef.current.innerHTML = '';

        // 새롭게 QR코드 인스턴스를 소환하여 드로잉
        new QRCode(qrHolderRef.current, {
          text: rawText,
          width: designOpts.qrSize,
          height: designOpts.qrSize,
          colorDark: designOpts.fgColor,
          colorLight: designOpts.bgColor,
          correctLevel: QRCode.CorrectLevel[designOpts.correctLevel]
        });

        setIsGenerated(true);
      } catch (err) {
        console.error(err);
        setIsGenerated(false);
      }
    }, 300); // 300ms 디바운싱으로 타이핑 및 슬라이더 드래그 시 버벅임 차단

    return () => clearTimeout(timer);
  }, [
    isScriptsLoaded, 
    qrType, 
    urlValue, 
    wifiSsid, 
    wifiPassword, 
    wifiSecurity, 
    telNumber, 
    designOpts
  ]);

  // --- 디자인 옵션 상태값 조절 ---
  const updateDesignOpt = (key: keyof QrDesignOptions, value: any) => {
    setDesignOpts(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // --- 고화질 PNG 이미지 파일 다운로드 ---
  const handleDownloadPng = () => {
    if (!isGenerated || !qrHolderRef.current) return;

    // qrcode.js가 생성해놓은 내부 canvas 엘리먼트 획득
    const canvas = qrHolderRef.current.querySelector('canvas');
    if (!canvas) {
      showToast('이미지 데이터를 추출할 수 없습니다. 다시 생성해 주세요.');
      return;
    }

    // 캔버스 데이터로부터 데이터 URL 추출
    const dataUrl = canvas.toDataURL('image/png');
    
    // 임시 링크 객체 주입을 통한 물리 다운로드 처리
    const link = document.createElement('a');
    link.href = dataUrl;
    
    // 타겟에 맞는 적합한 파일명 추출
    const typeLabel = qrType === 'url' ? 'link' : qrType === 'wifi' ? 'wifi' : 'phone';
    link.download = `wow3d_smart_qr_${typeLabel}.png`;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    showToast('스마트 QR 코드 이미지가 다운로드되었습니다.');
  };

  return (
    <div className={styles.container}>
      {/* AEO 최적화를 위한 QR 코드 빌더 리치 스니펫 스키마 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "매장용 스마트 QR 무료 생성기 (QR Code Builder)",
            "description": "설치나 계정 등록 없이 매장 방문 고객 전용 초고속 와이파이(Wi-Fi) 접속 QR, 테이블 오더 및 고객 예약 연동 QR 코드를 브라우저 단독 Canvas로 무료 빌드 및 생성하는 온라인 유틸리티 도구입니다.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "browserRequirements": "HTML5 Canvas supported modern browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KRW"
            },
            "publisher": {
              "@type": "Organization",
              "name": "(주)와우쓰리디",
              "url": "https://wow3dsw.co.kr"
            }
          })
        }}
      />

      {/* 1. 인트로 히어로 헤더 */}
      <header className={styles.heroSection}>
        <span className={styles.heroBadge}>무료 프로그램 배포</span>
        <h1 className={styles.heroTitle}>매장용 스마트 QR 생성기</h1>
        <p className={styles.heroDesc}>
          설치나 결제 없이 매장 테이블 오더, 고객 상담 예약, 또는 카메라 스캔 한 번으로 비밀번호 입력 없이 즉시 연결되는 매장 전용 스마트 와이파이 QR 코드를 쉽고 유연하게 무료 디자인해 보세요.
        </p>
      </header>

      {/* 2. 대시보드 워크스페이스 */}
      <main className={styles.workspace}>
        {/* 2-1. 좌측 폼 컨트롤 영역 */}
        <section className={styles.card}>
          {/* QR 타입 전환 탭 제어 */}
          <div className={styles.tabGroup}>
            <button
              className={clsx(styles.tabButton, qrType === 'url' && styles.tabButtonActive)}
              onClick={() => setQrType('url')}
            >
              <LinkIcon size={16} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> 
              예약 / 링크 연결
            </button>
            <button
              className={clsx(styles.tabButton, qrType === 'wifi' && styles.tabButtonActive)}
              onClick={() => setQrType('wifi')}
            >
              <Wifi size={16} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> 
              매장 와이파이
            </button>
            <button
              className={clsx(styles.tabButton, qrType === 'tel' && styles.tabButtonActive)}
              onClick={() => setQrType('tel')}
            >
              <Phone size={16} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> 
              전화 연결
            </button>
          </div>

          {/* 실시간 폼 입력 영역 */}
          <div className={styles.formGroup}>
            {/* 1. 일반 URL 연결 모드 */}
            {qrType === 'url' && (
              <div className={styles.inputField}>
                <label className={styles.label} htmlFor="urlInput">연결할 모바일 URL 주소</label>
                <input
                  id="urlInput"
                  type="url"
                  className={styles.input}
                  placeholder="예: https://wow3dsw.co.kr/contact/"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                />
                <p className={styles.subtext}>
                  매장 테이블오더 주문 사이트, 구글/네이버 예약 폼, 도입문의 상담 페이지 등 연결하고자 하는 전체 웹 주소를 넣어주세요.
                </p>
              </div>
            )}

            {/* 2. 와이파이 자동 접속 모드 */}
            {qrType === 'wifi' && (
              <>
                <div className={styles.inputField}>
                  <label className={styles.label} htmlFor="wifiSsidInput">와이파이 이름 (SSID)</label>
                  <input
                    id="wifiSsidInput"
                    type="text"
                    className={styles.input}
                    placeholder="매장에 기재된 정확한 Wi-Fi SSID를 입력"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                  />
                  <p className={styles.subtext}>매장 공유기에 등록된 영문 대소문자 및 띄어쓰기를 정확히 구별해 적어야 합니다.</p>
                </div>

                <div className={styles.inputField}>
                  <label className={styles.label} htmlFor="wifiPwInput">와이파이 비밀번호 (Password)</label>
                  <input
                    id="wifiPwInput"
                    type="password"
                    className={styles.input}
                    placeholder="공유기 접속 비밀번호 입력 (없다면 비워둠)"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                  />
                </div>

                <div className={styles.inputField}>
                  <label className={styles.label} htmlFor="wifiSecSelect">보안 형태 암호화 방식</label>
                  <select
                    id="wifiSecSelect"
                    className={styles.select}
                    value={wifiSecurity}
                    onChange={(e) => setWifiSecurity(e.target.value as any)}
                  >
                    <option value="WPA">WPA / WPA2 (일반 권장)</option>
                    <option value="WEP">WEP (구형 암호화)</option>
                    <option value="nopass">보안 없음 (개방형)</option>
                  </select>
                </div>
              </>
            )}

            {/* 3. 전화번호 즉시 걸기 모드 */}
            {qrType === 'tel' && (
              <div className={styles.inputField}>
                <label className={styles.label} htmlFor="telInput">고객센터 / 매장 전화번호</label>
                <input
                  id="telInput"
                  type="tel"
                  className={styles.input}
                  placeholder="예: 02-3144-3137"
                  value={telNumber}
                  onChange={(e) => setTelNumber(e.target.value)}
                />
                <p className={styles.subtext}>
                  하이픈(-)을 포함하거나 제외하여 스캔 즉시 바로 다이얼을 띄워 연결할 전화번호를 매핑합니다.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 2-2. 우측 디자인 커스텀 및 다운로드 사이드바 */}
        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              <Sliders size={20} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
              QR 디자인 튜닝
            </h2>

            {/* 실시간 캔버스 미리보기 구역 */}
            <div className={styles.qrContainer}>
              {isGenerated ? (
                <div id="qrcode_target" ref={qrHolderRef} className={styles.qrOutput} />
              ) : (
                <div className={styles.placeholderText}>
                  <QrIcon size={36} style={{ display: 'block', margin: '0 auto 12px auto', color: '#94a3b8' }} />
                  좌측 폼에 매장 정보를 입력하시면<br />실시간 커스텀 QR이 생성됩니다.
                </div>
              )}
            </div>

            {/* 세부 색상 피커 제어 */}
            <div className={styles.designOptions}>
              <div className={styles.colorPickerGroup}>
                <div className={styles.inputField}>
                  <span className={styles.label}>
                    <Palette size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
                    QR 코드 색상
                  </span>
                  <div className={styles.colorPickerWrapper}>
                    <input
                      type="color"
                      className={styles.colorInput}
                      value={designOpts.fgColor}
                      onChange={(e) => updateDesignOpt('fgColor', e.target.value)}
                      disabled={!isGenerated}
                    />
                    <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace' }}>{designOpts.fgColor}</span>
                  </div>
                </div>

                <div className={styles.inputField}>
                  <span className={styles.label}>배경 색상</span>
                  <div className={styles.colorPickerWrapper}>
                    <input
                      type="color"
                      className={styles.colorInput}
                      value={designOpts.bgColor}
                      onChange={(e) => updateDesignOpt('bgColor', e.target.value)}
                      disabled={!isGenerated}
                    />
                    <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace' }}>{designOpts.bgColor}</span>
                  </div>
                </div>
              </div>

              {/* 크기 조절 슬라이더 */}
              <div className={styles.inputField}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={styles.label}>출력 이미지 해상도</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#3b82f6' }}>
                    {designOpts.qrSize} x {designOpts.qrSize} px
                  </span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="480"
                  step="32"
                  value={designOpts.qrSize}
                  onChange={(e) => updateDesignOpt('qrSize', parseInt(e.target.value))}
                  className={styles.slider}
                  disabled={!isGenerated}
                />
              </div>

              {/* 오류 정정 레벨 선택 */}
              <div className={styles.inputField}>
                <span className={styles.label}>인식 에러 보정 능력 (ECC)</span>
                <select
                  className={styles.select}
                  value={designOpts.correctLevel}
                  onChange={(e) => updateDesignOpt('correctLevel', e.target.value as any)}
                  disabled={!isGenerated}
                >
                  <option value="H">High (30% 복구 - 로고 겹침/인쇄용 추천)</option>
                  <option value="Q">Quartile (25% 복구 - 매장용 권장)</option>
                  <option value="M">Medium (15% 복구)</option>
                  <option value="L">Low (7% 복구 - 로딩 속도 최우선)</option>
                </select>
              </div>
            </div>

            {/* 다운로드 실행 액션 */}
            <div className={styles.actionGroup}>
              <button
                className={clsx(styles.btnPrimary, !isGenerated && styles.disabled)}
                onClick={handleDownloadPng}
                disabled={!isGenerated}
              >
                <Download size={18} /> 고화질 PNG 다운로드
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* 3. 친절한 스마트 QR 사용 팁 가이드 */}
      <section className={styles.guideSection}>
        <h2 className={styles.guideTitle}>
          <HelpCircle size={22} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
          스마트 매장용 QR 다양하게 활용하기
        </h2>
        <div className={styles.guideGrid}>
          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>1</div>
            <h3 className={styles.guideStepTitle}>비밀번호 없는 무선 연결</h3>
            <p className={styles.guideStepDesc}>
              복잡한 영문 대소문자와 숫자가 섞인 매장 비밀번호를 입력하느라 고객들이 겪는 피로를 제거합니다. 와이파이 자동 QR을 벽이나 테이블에 부착하면 카메라 스캔 한 번으로 원클릭 즉시 접속됩니다.
            </p>
          </article>

          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>2</div>
            <h3 className={styles.guideStepTitle}>테이블오더 및 주문 연동</h3>
            <p className={styles.guideStepDesc}>
              소상공인 주문 폼 링크를 매핑해 테이블 각 좌석에 부착해 둡니다. 서빙 동선 단축과 빠른 테이블 로테이션을 확보하는 최고급 스마트상점 연동 시나리오를 무상 설계할 수 있습니다.
            </p>
          </article>

          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>3</div>
            <h3 className={styles.guideStepTitle}>커스텀 브랜딩 매치</h3>
            <p className={styles.guideStepDesc}>
              디자인 옵션의 전경색/배경색 피커를 통해 매장의 주요 인테리어 컬러 톤앤매너에 맞게 QR 코드의 색상을 세련되게 조절하여 고화질 파일로 인쇄 및 활용합니다.
            </p>
          </article>
        </div>
      </section>

      {/* 4. 플래시 토스트 알림 */}
      <div className={clsx(styles.toast, toastMessage && styles.toastShow)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Check size={18} /> {toastMessage}
        </span>
      </div>
    </div>
  );
}
