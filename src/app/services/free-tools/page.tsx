"use client";

import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Upload, 
  Download, 
  Copy, 
  RotateCcw, 
  Sliders, 
  Settings, 
  Sparkles, 
  Check, 
  Image as ImageIcon,
  HelpCircle,
  Layers,
  FileCode
} from 'lucide-react';
import clsx from 'clsx';
import { convertImageToSvg, TracingOptions } from '@/utils/imageToSvg';
import styles from './freeTools.module.css';

// 업로드된 파일 정보 인터페이스
interface FileMetadata {
  name: string;
  size: string;
  dimensions: string;
}

export default function FreeToolsPage() {
  // --- 상태 관리 ---
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileMetadata | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [svgResult, setSvgResult] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // 기본 트레이싱 변환 옵션 정의
  const [options, setOptions] = useState<TracingOptions>({
    threshold: 128,
    simplify: 1.5,
    colorMode: 'binary',
    numberOfColors: 6,
    removeBackground: true,
    invert: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 토스트 알림 기능 ---
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // --- 실시간 자동 변환 디바운싱 처리 (300ms) ---
  useEffect(() => {
    if (!uploadedImage) {
      setSvgResult(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsConverting(true);
      try {
        // 백그라운드 스레드 및 CPU 과부하 방지 최적화 처리된 변환 실행
        const result = await convertImageToSvg(uploadedImage, options);
        setSvgResult(result);
      } catch (err: any) {
        console.error(err);
        showToast(err.message || '변환 과정에서 오류가 발생했습니다.');
      } finally {
        setIsConverting(false);
      }
    }, 300); // 300ms 디바운스 적용으로 슬라이더 조작 시 렉 발생 방지

    return () => clearTimeout(timer);
  }, [uploadedImage, options]);

  // --- 파일 업로드 처리 로직 ---
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('이미지 파일(PNG, JPG, WEBP)만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setUploadedImage(dataUrl);
      
      // 파일 크기 포맷팅
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;

      // 이미지의 원본 해상도 획득
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        setFileInfo({
          name: file.name,
          size: sizeStr,
          dimensions: `${img.naturalWidth || img.width} x ${img.naturalHeight || img.height} px`
        });
      };
    };
    reader.readAsDataURL(file);
  };

  // --- 드래그 앤 드롭 이벤트 헨들러 ---
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // --- 옵션 값 변경 핸들러 ---
  const updateOption = (key: keyof TracingOptions, value: any) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // --- 이미지 초기화 ---
  const handleReset = () => {
    setUploadedImage(null);
    setFileInfo(null);
    setSvgResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('작업 영역이 초기화되었습니다.');
  };

  // --- SVG 파일 다운로드 ---
  const handleDownloadSvg = () => {
    if (!svgResult || !fileInfo) return;
    
    const blob = new Blob([svgResult], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    // 원본 파일명에서 확장자를 제거하고 .svg를 붙여 다운로드 설정
    const originalBaseName = fileInfo.name.substring(0, fileInfo.name.lastIndexOf('.')) || fileInfo.name;
    link.href = url;
    link.download = `${originalBaseName}_wow3d.svg`;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('SVG 파일이 성공적으로 다운로드되었습니다.');
  };

  // --- SVG 인라인 코드 클립보드 복사 ---
  const handleCopySvgCode = () => {
    if (!svgResult) return;
    
    navigator.clipboard.writeText(svgResult)
      .then(() => {
        showToast('SVG 인라인 코드가 클립보드에 복사되었습니다.');
      })
      .catch((err) => {
        console.error(err);
        showToast('코드 복사에 실패했습니다.');
      });
  };

  return (
    <div className={styles.container}>
      {/* 1. 히어로 인트로 헤더 */}
      <header className={styles.heroSection}>
        <span className={styles.heroBadge}>무료 프로그램 배포</span>
        <h1 className={styles.heroTitle}>고성능 이미지 SVG 변환기</h1>
        <p className={styles.heroDesc}>
          로고, 스케치, 아이콘 등 일반 래스터 이미지(PNG, JPG)를 해상도 손실 없이 영구적으로 확대 가능한 고품질 SVG 벡터 그래픽 파일로 무료 변환하세요.
        </p>
      </header>

      {/* 2. 대시보드 워크스페이스 */}
      <main className={styles.workspace}>
        {/* 2-1. 좌측 뷰어 / 드롭 존 */}
        <section className={styles.card}>
          {!uploadedImage ? (
            // [업로드 이전 화면] 드래그 앤 드롭 영역
            <div 
              className={clsx(styles.uploadZone, isDragging && styles.uploadZoneActive)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }}
              />
              <div className={styles.uploadIconWrapper}>
                <Upload size={32} />
              </div>
              <h2 className={styles.uploadText}>이미지 파일을 끌어서 놓거나 클릭하세요</h2>
              <p className={styles.uploadSubtext}>지원 파일 포맷: PNG, JPG, JPEG, WEBP</p>
              <p className={styles.uploadSubtext}>100% 브라우저 자체 변환으로 외부에 이미지가 업로드되지 않아 안전합니다</p>
            </div>
          ) : (
            // [업로드 완료 화면] 원본 vs SVG 비교 뷰어
            <div className={styles.viewerContainer}>
              <div className={styles.viewerHeader}>
                <div>
                  <h2 className={styles.fileName}>{fileInfo?.name}</h2>
                  <p className={styles.fileMeta}>
                    크기: {fileInfo?.size} | 해상도: {fileInfo?.dimensions}
                  </p>
                </div>
                <button className={styles.btnReset} onClick={handleReset}>
                  새 파일 올리기
                </button>
              </div>

              <div className={styles.viewerGrid}>
                {/* 원본 이미지 뷰어 */}
                <div className={styles.viewCard}>
                  <h3 className={styles.viewTitle}>
                    <ImageIcon size={16} /> 원본 래스터 이미지
                  </h3>
                  <div className={styles.displayArea}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={uploadedImage} alt="원본 이미지" />
                  </div>
                </div>

                {/* SVG 변환 결과 뷰어 */}
                <div className={styles.viewCard}>
                  <h3 className={styles.viewTitle}>
                    <Sparkles size={16} color="#60a5fa" /> 변환된 SVG 벡터 그래픽
                  </h3>
                  <div className={styles.displayArea}>
                    {isConverting && (
                      <div className={styles.loadingOverlay}>
                        <div className={styles.spinner} />
                        <span className={styles.loadingText}>실시간 벡터화 처리 중...</span>
                      </div>
                    )}
                    {svgResult ? (
                      <div 
                        style={{ width: '90%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        dangerouslySetInnerHTML={{ __html: svgResult }} 
                      />
                    ) : (
                      <div className={styles.loadingOverlay}>
                        <span className={styles.loadingText}>대기 중...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 2-2. 우측 제어 설정 패널 */}
        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              <Sliders size={20} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> 
              변환 설정 패널
            </h2>
            
            <div className={styles.controlGroup}>
              {/* 컬러 모드 선택 토글 */}
              <div>
                <span className={styles.label}>변환 컬러 모드</span>
                <div className={styles.tabGroup} style={{ marginTop: '8px' }}>
                  <button 
                    className={clsx(styles.tabButton, options.colorMode === 'binary' && styles.tabButtonActive)}
                    onClick={() => updateOption('colorMode', 'binary')}
                  >
                    흑백 (로고/실루엣)
                  </button>
                  <button 
                    className={clsx(styles.tabButton, options.colorMode === 'color' && styles.tabButtonActive)}
                    onClick={() => updateOption('colorMode', 'color')}
                  >
                    다색 (컬러 그래픽)
                  </button>
                </div>
              </div>

              {/* 흑백 모드 전용 옵션: 임계값 */}
              {options.colorMode === 'binary' && (
                <div>
                  <div className={styles.labelWrapper}>
                    <label className={styles.label}>이진화 임계값 (Threshold)</label>
                    <span className={styles.valueIndicator}>{options.threshold}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="240" 
                    value={options.threshold} 
                    onChange={(e) => updateOption('threshold', parseInt(e.target.value))}
                    className={styles.slider}
                    disabled={!uploadedImage}
                  />
                  <p className={styles.uploadSubtext} style={{ marginTop: '4px' }}>
                    값이 높을수록 어두운 영역을 더 많이 감지하여 두껍게 그립니다.
                  </p>
                </div>
              )}

              {/* 컬러 모드 전용 옵션: 색상 수 */}
              {options.colorMode === 'color' && (
                <div>
                  <div className={styles.labelWrapper}>
                    <label className={styles.label}>출력 색상 수 (Colors)</label>
                    <span className={styles.valueIndicator}>{options.numberOfColors} 색</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="16" 
                    value={options.numberOfColors} 
                    onChange={(e) => updateOption('numberOfColors', parseInt(e.target.value))}
                    className={styles.slider}
                    disabled={!uploadedImage}
                  />
                  <p className={styles.uploadSubtext} style={{ marginTop: '4px' }}>
                    이미지에서 추출할 최대 레이어 색상 수를 제어합니다. (최대 16색)
                  </p>
                </div>
              )}

              {/* 디테일 및 단순화 옵션 */}
              <div>
                <div className={styles.labelWrapper}>
                  <label className={styles.label}>선 부드러움 조절 (Simplify)</label>
                  <span className={styles.valueIndicator}>{options.simplify.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="8" 
                  step="0.5"
                  value={options.simplify} 
                  onChange={(e) => updateOption('simplify', parseFloat(e.target.value))}
                  className={styles.slider}
                  disabled={!uploadedImage}
                />
                <p className={styles.uploadSubtext} style={{ marginTop: '4px' }}>
                  높을수록 외곽선이 둥글고 부드러워지며, 낮을수록 디테일하고 정교해집니다.
                </p>
              </div>

              {/* 공통 가공 토글 옵션 */}
              <div style={{ marginTop: '10px' }}>
                <span className={styles.label}>추가 가공 옵션</span>
                
                {options.colorMode === 'binary' ? (
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={options.invert} 
                      onChange={(e) => updateOption('invert', e.target.checked)}
                      className={styles.checkbox}
                      disabled={!uploadedImage}
                    />
                    흑백 반전 변환
                  </label>
                ) : (
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={options.removeBackground} 
                      onChange={(e) => updateOption('removeBackground', e.target.checked)}
                      className={styles.checkbox}
                      disabled={!uploadedImage}
                    />
                    밝은 배경 투명화 제거
                  </label>
                )}
              </div>
            </div>

            {/* 다운로드 및 복사 버튼 액션 */}
            <div className={styles.actionGroup}>
              <button 
                className={clsx(styles.btnPrimary, !svgResult && styles.disabled)}
                onClick={handleDownloadSvg}
                disabled={!svgResult}
              >
                <Download size={18} /> SVG 파일 다운로드
              </button>
              
              <button 
                className={clsx(styles.btnSecondary, !svgResult && styles.disabled)}
                onClick={handleCopySvgCode}
                disabled={!svgResult}
              >
                <Copy size={16} /> SVG 코드 복사
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* 3. 친절한 무료 도구 사용 가이드 카드 */}
      <section className={styles.guideSection}>
        <h2 className={styles.guideTitle}>
          <HelpCircle size={22} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> 
          간편한 3단계 사용 방법 안내
        </h2>
        <div className={styles.guideGrid}>
          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>1</div>
            <h3 className={styles.guideStepTitle}>이미지 파일 업로드</h3>
            <p className={styles.guideStepDesc}>
              변환을 원하는 로고, 캐릭터, 아이콘, 캘리그래피 또는 일러스트 등의 이미지를 업로드 영역에 끌어놓거나 클릭하여 선택합니다.
            </p>
          </article>

          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>2</div>
            <h3 className={styles.guideStepTitle}>실시간 실루엣 및 단순화 튜닝</h3>
            <p className={styles.guideStepDesc}>
              우측 설정 패널에서 흑백 모드 시 임계값을 조절해 선의 굵기를 맞추거나, 컬러 모드 시 색상 수를 적절히 설정하고 단순화 값을 조절해 선의 모양을 부드럽고 매끄럽게 가공합니다.
            </p>
          </article>

          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>3</div>
            <h3 className={styles.guideStepTitle}>벡터화 완료 및 내보내기</h3>
            <p className={styles.guideStepDesc}>
              정밀 변환된 SVG 벡터 결과를 즉시 파일로 컴퓨터에 다운로드하거나, HTML에 직접 삽입할 수 있는 인라인 SVG 코드를 원클릭으로 손쉽게 복사합니다.
            </p>
          </article>
        </div>
      </section>

      {/* 4. 플래시 토스트 팝업 */}
      <div className={clsx(styles.toast, toastMessage && styles.toastShow)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Check size={18} /> {toastMessage}
        </span>
      </div>
    </div>
  );
}
