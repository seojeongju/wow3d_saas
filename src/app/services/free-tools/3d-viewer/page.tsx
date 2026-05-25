"use client";

import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Upload, 
  RotateCcw, 
  Box as BoxIcon, 
  Layers, 
  HelpCircle,
  Check,
  Eye,
  Info,
  Maximize2
} from 'lucide-react';
import clsx from 'clsx';
import styles from './viewer3d.module.css';

// 3D 뷰어 제어 옵션 인터페이스
interface ViewerOptions {
  renderMode: 'solid' | 'wireframe' | 'points';
  modelColor: string; // 헥스 코드 string
  showGrid: boolean;
  showAxes: boolean;
}

// 3D 파일 스펙 분석 정보 인터페이스
interface ModelMetadata {
  name: string;
  size: string;
  polygons: string;
  dimensions: {
    x: number;
    y: number;
    z: number;
  } | null;
}

// CDN을 통한 Three.js 스크립트 비동기 주입 로드 헬퍼 함수
const loadThreeJsScripts = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 window에 THREE가 세팅되어 있다면 즉시 승인
    if ((window as any).THREE && (window as any).THREE.STLLoader && (window as any).THREE.OrbitControls) {
      resolve();
      return;
    }

    // 1. Three.js 핵심 렌더러 라이브러리 주입
    const scriptThree = document.createElement('script');
    scriptThree.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    scriptThree.onload = () => {
      // 2. STL Loader 플러그인 주입
      const scriptLoader = document.createElement('script');
      scriptLoader.src = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/loaders/STLLoader.js';
      scriptLoader.onload = () => {
        // 3. OrbitControls 조작 플러그인 주입
        const scriptControls = document.createElement('script');
        scriptControls.src = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/controls/OrbitControls.js';
        scriptControls.onload = () => {
          resolve();
        };
        scriptControls.onerror = () => reject(new Error('OrbitControls 스크립트 로드에 실패하였습니다.'));
        document.head.appendChild(scriptControls);
      };
      scriptLoader.onerror = () => reject(new Error('STLLoader 스크립트 로드에 실패하였습니다.'));
      document.head.appendChild(scriptLoader);
    };
    scriptThree.onerror = () => reject(new Error('Three.js 엔진 스크립트 로드에 실패하였습니다.'));
    document.head.appendChild(scriptThree);
  });
};

export default function ThreeDViewerPage() {
  // --- 상태 관리 ---
  const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(null);
  const [fileMeta, setFileMeta] = useState<ModelMetadata | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isScriptsLoaded, setIsScriptsLoaded] = useState<boolean>(false);
  const [isLoadingMesh, setIsLoadingMesh] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // 3D 렌더링 옵션 상태
  const [options, setOptions] = useState<ViewerOptions>({
    renderMode: 'solid',
    modelColor: '#60a5fa', // 디폴트: 와우 스카이블루
    showGrid: true,
    showAxes: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WebGL 렌더러 및 씬 관련 레퍼런스 유지
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const modelMeshRef = useRef<any>(null); // 현재 씬에 추가된 3D 메쉬 레퍼런스
  const gridHelperRef = useRef<any>(null);
  const axesHelperRef = useRef<any>(null);
  const currentGeometryRef = useRef<any>(null); // 현재 파싱된 바운딩 구체 보존용

  // 사용 가능한 모델 컬러 팔레트 칩 리스트
  const colorPalette = [
    { name: '스카이블루', value: '#60a5fa' },
    { name: '메탈릭실버', value: '#94a3b8' },
    { name: '럭셔리골드', value: '#f59e0b' },
    { name: '포레스트그린', value: '#10b981' },
    { name: '네온핫핑크', value: '#ec4899' }
  ];

  // --- 토스트 피드백 ---
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // --- 1. 컴포넌트 마운트 시 Three.js 엔진 CDN 로드 ---
  useEffect(() => {
    loadThreeJsScripts()
      .then(() => {
        setIsScriptsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        showToast(err.message || '3D 렌더링 엔진 로드 실패');
      });
  }, []);

  // --- 2. Three.js WebGL 씬(Scene) 생성 및 기본 세팅 ---
  useEffect(() => {
    if (!isScriptsLoaded || !canvasRef.current || !containerRef.current) return;

    const THREE = (window as any).THREE;
    const width = containerRef.current.clientWidth;
    const height = 480; // 고정 해상도 높이

    // 씬 객체 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // 짙은 네이비 다크 톤앤매너
    sceneRef.current = scene;

    // 원근 카메라 설정
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 80, 120);
    cameraRef.current = camera;

    // 안티앨리어싱 탑재 렌더러 선언 및 디바이스 픽셀비 매핑
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // 조작 오빗 컨트롤 세팅
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 부드러운 스크롤 효과
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // 바닥 이하로 뚫고 들어가지 않게 카메라 하향 각도 억제
    controlsRef.current = controls;

    // 조명 세팅 (입체 셰이딩을 위한 다중 광원 배치)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45); // 균일 환경광
    scene.add(ambientLight);

    const dirLightFront = new THREE.DirectionalLight(0xffffff, 0.6); // 정면 입체광
    dirLightFront.position.set(1, 2, 3);
    scene.add(dirLightFront);

    const dirLightBack = new THREE.DirectionalLight(0xffffff, 0.4); // 배면 반사광
    dirLightBack.position.set(-1, 1, -3);
    scene.add(dirLightBack);

    // 바닥 격자 플레이트 추가 (3D 프린터 베드 느낌 연출)
    const gridHelper = new THREE.GridHelper(100, 50, 0x3b82f6, 0x334155);
    gridHelper.position.y = -0.01; // Z-fighting 현상 예방
    gridHelper.visible = options.showGrid;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // 3차원 축 지시계 추가 (RGB 표시)
    const axesHelper = new THREE.AxesHelper(30);
    axesHelper.visible = options.showAxes;
    scene.add(axesHelper);
    axesHelperRef.current = axesHelper;

    // 애니메이션 렌더 루프 가동
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 창 리사이즈 반응형 조절 핸들러 등록
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      cameraRef.current.aspect = newWidth / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // 언마운트 시 메모리 및 렌더 프레임 초기화 (메모리 누수 원천 차단)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [isScriptsLoaded]);

  // --- 3. 렌더 모드 / 색상 / 격자 등 조절 상태 실시간 동기화 ---
  useEffect(() => {
    if (!sceneRef.current || !isScriptsLoaded) return;

    const THREE = (window as any).THREE;

    // 격자 및 축 가시성 동기화
    if (gridHelperRef.current) gridHelperRef.current.visible = options.showGrid;
    if (axesHelperRef.current) axesHelperRef.current.visible = options.showAxes;

    // 업로드된 메쉬가 있을 시 셰이더 및 재질 실시간 교체 반영
    if (modelMeshRef.current && currentGeometryRef.current) {
      const geometry = currentGeometryRef.current;
      
      // 기존 모델 씬에서 제거
      sceneRef.current.remove(modelMeshRef.current);
      if (modelMeshRef.current.material) modelMeshRef.current.material.dispose();

      let newMesh: any;

      // 솔리드 또는 와이어프레임 재질 생성
      if (options.renderMode === 'solid' || options.renderMode === 'wireframe') {
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(options.modelColor),
          roughness: 0.4,
          metalness: 0.1,
          wireframe: options.renderMode === 'wireframe',
          flatShading: true // 레트로 지오메트릭 감각을 위한 플랫 셰이더
        });
        newMesh = new THREE.Mesh(geometry, material);
      } else {
        // 점구름(Points) 재질 생성
        const material = new THREE.PointsMaterial({
          color: new THREE.Color(options.modelColor),
          size: 1.2,
          sizeAttenuation: true
        });
        newMesh = new THREE.Points(geometry, material);
      }

      sceneRef.current.add(newMesh);
      modelMeshRef.current = newMesh;
    }
  }, [options, isScriptsLoaded]);

  // --- 4. STL 도면 파싱 및 WebGL 씬 마운트 핵심 함수 ---
  // 대용량 파일 파싱 및 연산 시 브라우저 블로킹(렉)을 제거하기 위해 
  // '즉각 3D 시각화(Instant Rendering) 및 백그라운드 스펙 산출(Lazy Metadata)' 모델로 고도화하였습니다.
  useEffect(() => {
    if (!uploadedFile || !sceneRef.current || !isScriptsLoaded) return;

    const THREE = (window as any).THREE;
    setIsLoadingMesh(true);
    
    // 분석 보드 상태 초기화 ("계산 중..." 노출)
    if (fileMeta) {
      setFileMeta(prev => prev ? {
        ...prev,
        polygons: '계산 중...',
        dimensions: null
      } : null);
    }

    // 마이크로태스크 기동으로 200ms 고정 대기 딜레이 원천 제거 및 고속 파싱 시작
    Promise.resolve().then(() => {
      try {
        const loader = new THREE.STLLoader();
        // 1단계: STL 구조 고속 파싱 (동기 구간 최소화)
        const geometry = loader.parse(uploadedFile);
        currentGeometryRef.current = geometry;

        // 기존 씬에 존재하던 메쉬 메모리 회수 및 청소 (가비지 컬렉터 강제 지원)
        if (modelMeshRef.current) {
          sceneRef.current.remove(modelMeshRef.current);
          if (modelMeshRef.current.geometry) modelMeshRef.current.geometry.dispose();
          if (modelMeshRef.current.material) modelMeshRef.current.material.dispose();
          modelMeshRef.current = null;
        }

        // 2단계: 메쉬 즉시 생성 및 씬 가동 (시각화 우선순위 최상위 처리)
        let mesh: any;
        if (options.renderMode === 'solid' || options.renderMode === 'wireframe') {
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(options.modelColor),
            roughness: 0.4,
            metalness: 0.1,
            wireframe: options.renderMode === 'wireframe',
            flatShading: true
          });
          mesh = new THREE.Mesh(geometry, material);
        } else {
          const material = new THREE.PointsMaterial({
            color: new THREE.Color(options.modelColor),
            size: 1.2,
            sizeAttenuation: true
          });
          mesh = new THREE.Points(geometry, material);
        }

        sceneRef.current.add(mesh);
        modelMeshRef.current = mesh;

        // 3단계: 초고속 BoundingSphere 연산만 가동하여 카메라 피팅 씬 즉각 활성화
        geometry.computeBoundingSphere();
        const sphere = geometry.boundingSphere;
        const center = sphere.center;
        const radius = sphere.radius;

        controlsRef.current.target.copy(center);
        cameraRef.current.position.set(
          center.x,
          center.y + radius * 1.8,
          center.z + radius * 2.3
        );
        cameraRef.current.lookAt(center);
        controlsRef.current.update();

        // 4단계: 시각화 로딩 바 즉시 종료 (체감 파싱 시간 단축)
        setIsLoadingMesh(false);
        showToast('3D 도면 시각화가 완료되었습니다.');

        // 5단계: 대용량 정점 순회가 소요되는 무거운 실측 mm 및 폴리곤 개수 계산은
        // 메인 프레임 페인트(Paint)에 지장을 주지 않도록 백그라운드로 50ms 비동기 지연 실행 (Lazy Execution)
        setTimeout(() => {
          if (!currentGeometryRef.current) return;
          
          try {
            const activeGeo = currentGeometryRef.current;
            
            // 정점 순회 및 삼각형 개수 집계
            const polyCount = activeGeo.index 
              ? activeGeo.index.count / 3 
              : activeGeo.attributes.position.count / 3;

            // 정점 전체 스캔을 통한 바운딩 박스 실측 크기 계산 (가장 무거운 연산 구간)
            activeGeo.computeBoundingBox();
            const bbox = activeGeo.boundingBox;
            const size = new THREE.Vector3();
            bbox.getSize(size);

            setFileMeta(prev => prev ? {
              ...prev,
              polygons: `${Math.round(polyCount).toLocaleString()} 개`,
              dimensions: {
                x: parseFloat(size.x.toFixed(1)),
                y: parseFloat(size.y.toFixed(1)),
                z: parseFloat(size.z.toFixed(1))
              }
            } : null);
          } catch (calcErr) {
            console.error('메타데이터 비동기 계산 오류:', calcErr);
          }
        }, 50);

      } catch (err) {
        console.error(err);
        showToast('3D 파일 파싱 오류: 올바른 STL 파일 형식이 아닙니다.');
        handleReset();
        setIsLoadingMesh(false);
      }
    });
  }, [uploadedFile, isScriptsLoaded]);

  // --- 파일 업로드 처리 로직 ---
  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.stl')) {
      showToast('3D 프린팅 도면 포맷인 STL 파일만 드롭할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    setIsLoadingMesh(true);
    
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      setUploadedFile(buffer);
      
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;

      setFileMeta({
        name: file.name,
        size: sizeStr,
        polygons: '계산 중...',
        dimensions: null
      });
    };
    reader.readAsArrayBuffer(file);
  };

  // --- 드래그 앤 드롭 이벤트 ---
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

  // --- 상태 토글 및 제어 헬퍼 ---
  const toggleOption = (key: keyof ViewerOptions) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const setRenderMode = (mode: 'solid' | 'wireframe' | 'points') => {
    setOptions(prev => ({
      ...prev,
      renderMode: mode
    }));
  };

  const setColor = (hex: string) => {
    setOptions(prev => ({
      ...prev,
      modelColor: hex
    }));
  };

  // --- 원점 카메라 각도 뷰 피팅 리셋 ---
  const handleResetView = () => {
    if (!currentGeometryRef.current || !cameraRef.current || !controlsRef.current) return;
    
    const geometry = currentGeometryRef.current;
    geometry.computeBoundingSphere();
    const sphere = geometry.boundingSphere;
    const center = sphere.center;
    const radius = sphere.radius;

    controlsRef.current.target.copy(center);
    cameraRef.current.position.set(
      center.x,
      center.y + radius * 1.8,
      center.z + radius * 2.3
    );
    controlsRef.current.update();
    showToast('카메라 원점 뷰가 정렬되었습니다.');
  };

  // --- 작업 초기화 ---
  const handleReset = () => {
    setUploadedFile(null);
    setFileMeta(null);
    currentGeometryRef.current = null;
    
    if (modelMeshRef.current && sceneRef.current) {
      sceneRef.current.remove(modelMeshRef.current);
      if (modelMeshRef.current.geometry) modelMeshRef.current.geometry.dispose();
      if (modelMeshRef.current.material) modelMeshRef.current.material.dispose();
      modelMeshRef.current = null;
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('작업 영역이 비워졌습니다.');
  };

  return (
    <div className={styles.container}>
      {/* AEO 최적화를 위한 3D 소프트웨어 뷰어 리치 스니펫 스키마 데이터 인젝션 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "3D 도면 실시간 무료 뷰어 (STL Viewer)",
            "description": "설치나 계정 없이 웹 브라우저 단독으로 3D 프린팅용 STL 모델링 파일을 업로드하여 입체 형상 관찰, 폴리곤 수 분석, mm 실측 크기를 즉시 검증하는 무료 3D 뷰어입니다.",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires WebGL enabled browser (HTML5 Canvas supported)",
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

      {/* 1. 인트로 히어로 소개 */}
      <header className={styles.heroSection}>
        <span className={styles.heroBadge}>무료 프로그램 배포</span>
        <h1 className={styles.heroTitle}>3D 도면 실시간 무료 뷰어</h1>
        <p className={styles.heroDesc}>
          설치나 가입 없이 3D 프린팅의 글로벌 표준인 STL 파일을 마우스 드래그만으로 즉시 업로드하고, 60fps 고성능 WebGL로 입체 모델링을 회전/축소하며 정밀 mm 실측 규격을 시뮬레이션해 보세요.
        </p>
      </header>

      {/* 2. 대시보드 워크스페이스 */}
      <main className={styles.workspace}>
        {/* 2-1. 좌측 3D WebGL 렌더 캔버스 영역 */}
        <section className={styles.card} ref={containerRef}>
          {!uploadedFile ? (
            // [업로드 이전] STL 도면 수령 드래그 존
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
                accept=".stl" 
                style={{ display: 'none' }}
              />
              <div className={styles.uploadIconWrapper}>
                <Upload size={32} />
              </div>
              <h2 className={styles.uploadText}>3D 도면(STL) 파일을 여기에 끌어놓거나 클릭하세요</h2>
              <p className={styles.uploadSubtext}>지원 파일 확장자: .stl (ASCII 및 Binary 형식 완벽 호환)</p>
              <p className={styles.uploadSubtext}>외주 출력 전 파일 규격 확인 및 삼각형 폴리곤 개수 사전 검사에 아주 유용합니다</p>
            </div>
          ) : (
            // [업로드 이후] WebGL 씬 디렉토리
            <div className={styles.viewerContainer}>
              <div className={styles.viewerHeader}>
                <div>
                  <h2 className={styles.fileName}>{fileMeta?.name}</h2>
                  <p className={styles.fileMeta}>
                    용량: {fileMeta?.size} | 3D 하드웨어 가속 구동 중
                  </p>
                </div>
                <button className={styles.btnReset} onClick={handleReset}>
                  새 도면 올리기
                </button>
              </div>

              {/* WebGL 실제 렌더링 홀더 */}
              <div className={styles.canvasContainer}>
                {isLoadingMesh && (
                  <div className={styles.overlay}>
                    <div className={styles.spinner} />
                    <span className={styles.overlayText}>3D 기하 버퍼 데이터 파싱 및 로딩 중...</span>
                  </div>
                )}
                
                {/* 3D 렌더 타겟 도화지 캔버스 */}
                <canvas ref={canvasRef} className={styles.canvasElement} />

                {/* 마우스 조작 단축키 안내판 */}
                <div className={styles.helperOverlay}>
                  <div className={styles.helperItem}>
                    <span style={{ fontWeight: 800, color: '#60a5fa' }}>좌클릭 드래그:</span> 회전
                  </div>
                  <div className={styles.helperItem}>
                    <span style={{ fontWeight: 800, color: '#60a5fa' }}>마우스 휠:</span> 줌
                  </div>
                  <div className={styles.helperItem}>
                    <span style={{ fontWeight: 800, color: '#60a5fa' }}>우클릭 드래그:</span> 이동
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 2-2. 우측 3D 뷰어 속성 제어 사이드 패널 */}
        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
              <Eye size={20} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
              뷰어 컨트롤러
            </h2>

            <div className={styles.controlGroup}>
              {/* 1. 렌더링 셰이딩 탭 */}
              <div>
                <span className={styles.label}>3D 렌더 모드</span>
                <div className={styles.tabGroup}>
                  <button 
                    className={clsx(styles.tabButton, options.renderMode === 'solid' && styles.tabButtonActive)}
                    onClick={() => setRenderMode('solid')}
                    disabled={!uploadedFile}
                  >
                    솔리드 (Solid)
                  </button>
                  <button 
                    className={clsx(styles.tabButton, options.renderMode === 'wireframe' && styles.tabButtonActive)}
                    onClick={() => setRenderMode('wireframe')}
                    disabled={!uploadedFile}
                  >
                    와이어 (Wire)
                  </button>
                  <button 
                    className={clsx(styles.tabButton, options.renderMode === 'points' && styles.tabButtonActive)}
                    onClick={() => setRenderMode('points')}
                    disabled={!uploadedFile}
                  >
                    점군 (Points)
                  </button>
                </div>
              </div>

              {/* 2. 모델 컬러 변경 칩 */}
              <div>
                <span className={styles.label}>렌더링 모델 색상</span>
                <div className={styles.colorChips}>
                  {colorPalette.map((color) => (
                    <button
                      key={color.value}
                      className={clsx(styles.colorChip, options.modelColor === color.value && styles.colorChipActive)}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setColor(color.value)}
                      title={color.name}
                      disabled={!uploadedFile}
                    />
                  ))}
                </div>
              </div>

              {/* 3. 공간 헬퍼 가시성 */}
              <div>
                <span className={styles.label}>공간 가이드 헬퍼</span>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={options.showGrid}
                    onChange={() => toggleOption('showGrid')}
                    className={styles.checkbox}
                  />
                  격자 플레이트 (Grid Plate) 보이기
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox"
                    checked={options.showAxes}
                    onChange={() => toggleOption('showAxes')}
                    className={styles.checkbox}
                  />
                  정렬 3차원 축 (Axes Helper) 보이기
                </label>
              </div>

              {/* 4. 파일 분석 실측 통계 스펙 보드 */}
              {fileMeta && (
                <div className={styles.metaPanel}>
                  <h3 className={styles.metaTitle}>
                    <Info size={14} color="#3b82f6" /> 3D 도면 형상 분석 보고
                  </h3>
                  <div className={styles.metaItem}>
                    <span>총 삼각형 (Polygons):</span>
                    <strong>{fileMeta.polygons}</strong>
                  </div>
                  {fileMeta.dimensions ? (
                    <>
                      <div className={styles.metaItem}>
                        <span>가로 규격 (Width X):</span>
                        <strong>{fileMeta.dimensions.x} mm</strong>
                      </div>
                      <div className={styles.metaItem}>
                        <span>세로 규격 (Depth Y):</span>
                        <strong>{fileMeta.dimensions.y} mm</strong>
                      </div>
                      <div className={styles.metaItem}>
                        <span>높이 규격 (Height Z):</span>
                        <strong>{fileMeta.dimensions.z} mm</strong>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
                      사이즈 실측 계산 중...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 5. 뷰 포트 리셋 버튼 */}
            <div className={styles.actionGroup}>
              <button
                className={clsx(styles.btnPrimary, !uploadedFile && styles.disabled)}
                onClick={handleResetView}
                disabled={!uploadedFile}
              >
                <Maximize2 size={16} /> 원점 조준 피팅 (Reset View)
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* 3. 친절한 3D 가이드 섹션 */}
      <section className={styles.guideSection}>
        <h2 className={styles.guideTitle}>
          <HelpCircle size={22} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
          3D 도면 뷰어 3단계 활용 팁
        </h2>
        <div className={styles.guideGrid}>
          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>1</div>
            <h3 className={styles.guideStepTitle}>초고속 로컬 렌더링</h3>
            <p className={styles.guideStepDesc}>
              STL 3D 파일을 마우스 클릭 한 번으로 드롭 영역에 올리면 브라우저 자체 WebGL 하드웨어 가속을 활용해 서버에 업로드하지 않고 즉각 화면에 드로잉합니다.
            </p>
          </article>

          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>2</div>
            <h3 className={styles.guideStepTitle}>형상 하자 및 메쉬 점검</h3>
            <p className={styles.guideStepDesc}>
              와이어프레임(Wireframe) 모드로 전환하여 모델의 내외부 그물망 메쉬가 찢어지거나 깨진 곳이 없는지 다각도 마우스 회전으로 사전에 면밀히 확인합니다.
            </p>
          </article>

          <article className={styles.guideCard}>
            <div className={styles.guideStepNumber}>3</div>
            <h3 className={styles.guideStepTitle}>소요 재료 및 실측 예측</h3>
            <p className={styles.guideStepDesc}>
              스펙 정보 보드에 출력되는 가로·세로·높이 mm 실측 외형과 전체 삼각형 수를 통해 3D 프린터 출력 시 필요한 레진/필라멘트 무게와 시제품 견적비를 합리적으로 도출합니다.
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
