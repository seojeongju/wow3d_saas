"use client";

import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Upload, 
  Download, 
  Copy, 
  Sliders, 
  Sparkles, 
  Check, 
  Image as ImageIcon,
  HelpCircle,
  Box
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

// CDN을 통한 Three.js 및 SVG 3D 관련 라이브러리 비동기 주입 로드 헬퍼 함수
const loadThreeAndSvgTools = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 window에 필요한 모듈들이 세팅되어 있다면 즉시 완료
    if (
      (window as any).THREE && 
      (window as any).THREE.SVGLoader && 
      (window as any).THREE.STLExporter &&
      (window as any).THREE.OrbitControls
    ) {
      resolve();
      return;
    }

    // 1. Three.js 핵심 렌더러 라이브러리 주입
    const scriptThree = document.createElement('script');
    scriptThree.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    scriptThree.onload = () => {
      // 2. SVGLoader 플러그인 주입
      const scriptLoader = document.createElement('script');
      scriptLoader.src = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/loaders/SVGLoader.js';
      scriptLoader.onload = () => {
        // 3. STLExporter 플러그인 주입
        const scriptExporter = document.createElement('script');
        scriptExporter.src = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/exporters/STLExporter.js';
        scriptExporter.onload = () => {
          // 4. OrbitControls 조작 플러그인 주입
          const scriptControls = document.createElement('script');
          scriptControls.src = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/controls/OrbitControls.js';
          scriptControls.onload = () => {
            resolve();
          };
          scriptControls.onerror = () => reject(new Error('OrbitControls 스크립트 로드에 실패하였습니다.'));
          document.head.appendChild(scriptControls);
        };
        scriptExporter.onerror = () => reject(new Error('STLExporter 스크립트 로드에 실패하였습니다.'));
        document.head.appendChild(scriptExporter);
      };
      scriptLoader.onerror = () => reject(new Error('SVGLoader 스크립트 로드에 실패하였습니다.'));
      document.head.appendChild(scriptLoader);
    };
    scriptThree.onerror = () => reject(new Error('Three.js 엔진 스크립트 로드에 실패하였습니다.'));
    document.head.appendChild(scriptThree);
  });
};

export default function FreeToolsPage() {
  // --- 상태 관리 ---
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileMetadata | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [svgResult, setSvgResult] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // 무료 제한용 변환한 파일 목록 및 한도 달성 상태 관리
  const [convertedFiles, setConvertedFiles] = useState<string[]>([]);
  const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);

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

  // --- 3D 뷰어 상태 및 Ref 관리 ---
  const [activeTab, setActiveTab] = useState<'2d' | '3d'>('2d');
  const [extrudeHeight, setExtrudeHeight] = useState<number>(10); // 기본 돌출 높이: 10mm
  const [is3DLoading, setIs3DLoading] = useState<boolean>(false);
  const [threeScriptsLoaded, setThreeScriptsLoaded] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ x: number; y: number; z: number } | null>(null);

  const canvasRef3d = useRef<HTMLCanvasElement>(null);
  const containerRef3d = useRef<HTMLDivElement>(null);
  const scene3dRef = useRef<any>(null);
  const camera3dRef = useRef<any>(null);
  const renderer3dRef = useRef<any>(null);
  const controls3dRef = useRef<any>(null);
  const mesh3dRef = useRef<any>(null);
  const gridHelper3dRef = useRef<any>(null);

  // 로컬 스토리지에 저장된 기존 변환 파일 목록 마운트 시 확인
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wow3d_converted_files');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as string[];
          setConvertedFiles(parsed);
          if (parsed.length >= 10) {
            setIsLimitExceeded(true);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // --- 토스트 알림 기능 ---
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // --- 1. 3D 미리보기 탭 활성화 시 Three.js CDN 동적 주입 로드 ---
  useEffect(() => {
    if (activeTab === '3d' && !threeScriptsLoaded) {
      setIs3DLoading(true);
      loadThreeAndSvgTools()
        .then(() => {
          setThreeScriptsLoaded(true);
          setIs3DLoading(false);
          showToast('3D 가속 그래픽 엔진 가동 완료');
        })
        .catch((err) => {
          console.error(err);
          showToast(err.message || '3D 그래픽 엔진 로드 실패');
          setActiveTab('2d');
          setIs3DLoading(false);
        });
    }
  }, [activeTab, threeScriptsLoaded]);

  // --- 2. Three.js WebGL 씬(Scene) 생성 및 기본 세팅 (3D 탭 활성화 시) ---
  useEffect(() => {
    if (activeTab !== '3d' || !threeScriptsLoaded || !canvasRef3d.current || !containerRef3d.current) return;

    const THREE = (window as any).THREE;
    const width = containerRef3d.current.clientWidth || 500;
    const height = 400; // 3D 미리보기 영역 높이 고정

    // 씬 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // 3D 뷰어와 조화를 이루는 다크 네이비 톤
    scene3dRef.current = scene;

    // 카메라 설정
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 100, 150);
    camera3dRef.current = camera;

    // 안티앨리어싱 지원 렌더러
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef3d.current,
      antialias: true,
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer3dRef.current = renderer;

    // OrbitControls 조작 모듈
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // 바닥 하단 각도 제한
    controls3dRef.current = controls;

    // 다중 광원 배치 (3D 입체 음영 연출)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight1.position.set(1, 2, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-1, 1, -3);
    scene.add(dirLight2);

    // 프린터 베드 느낌 격자 추가
    const gridHelper = new THREE.GridHelper(120, 40, 0x3b82f6, 0x334155);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);
    gridHelper3dRef.current = gridHelper;

    // 렌더 프레임 루프
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 반응형 리사이즈 대응
    const handleResize = () => {
      if (!containerRef3d.current || !renderer3dRef.current || !camera3dRef.current) return;
      const newWidth = containerRef3d.current.clientWidth;
      camera3dRef.current.aspect = newWidth / height;
      camera3dRef.current.updateProjectionMatrix();
      renderer3dRef.current.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // 언마운트 자원 초기화
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer3dRef.current) renderer3dRef.current.dispose();
      scene3dRef.current = null;
      camera3dRef.current = null;
      renderer3dRef.current = null;
      controls3dRef.current = null;
      mesh3dRef.current = null;
    };
  }, [activeTab, threeScriptsLoaded]);

  // --- 3. SVG 변환 결과 바탕 실시간 3D Extrude 모델 렌더링 및 갱신 ---
  useEffect(() => {
    if (activeTab !== '3d' || !threeScriptsLoaded || !scene3dRef.current || !svgResult) return;

    const THREE = (window as any).THREE;
    const scene = scene3dRef.current;

    // 기존 씬 안의 메쉬 제거 및 메모리 클리어
    if (mesh3dRef.current) {
      scene.remove(mesh3dRef.current);
      if (mesh3dRef.current.geometry) mesh3dRef.current.geometry.dispose();
      if (mesh3dRef.current.material) mesh3dRef.current.material.dispose();
      mesh3dRef.current = null;
    }

    try {
      // SVGLoader로 SVG 경로 해석
      const loader = new THREE.SVGLoader();
      const svgData = loader.parse(svgResult);
      const paths = svgData.paths;
      const shapes: any[] = [];

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        // SVGLoader를 이용하여 구멍(Holes) 정보가 통합된 2D 도형 완성
        const shapesForPath = THREE.SVGLoader.createShapes(path);
        shapes.push(...shapesForPath);
      }

      if (shapes.length === 0) return;

      // 돌출(Extrude) 파라미터 빌드
      const extrudeSettings = {
        depth: extrudeHeight,
        bevelEnabled: false,
        steps: 1
      };

      const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);

      // 좌표 가공: 원점 회전 및 3D 중심 정렬
      geometry.center();
      geometry.rotateX(Math.PI); // SVG Y축 반전 보정

      // 셰이딩 재질 적용
      const material = new THREE.MeshStandardMaterial({
        color: 0x60a5fa, // 스카이블루 기본 컬러 적용
        roughness: 0.4,
        metalness: 0.1,
        flatShading: true, // 로우폴리 레트로 감성의 geometric 셰이더 적용
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      mesh3dRef.current = mesh;

      // 카메라 오빗 피팅 정렬
      geometry.computeBoundingSphere();
      const sphere = geometry.boundingSphere;
      if (sphere && controls3dRef.current && camera3dRef.current) {
        const center = sphere.center;
        const radius = sphere.radius;
        controls3dRef.current.target.copy(center);
        camera3dRef.current.position.set(
          center.x,
          center.y + radius * 1.5,
          center.z + radius * 2.0
        );
        controls3dRef.current.update();
      }

      // mm 기반 예상 실측 크기 산출 (화소 단위 4px당 1mm 비례 축소 적용)
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox;
      const size = new THREE.Vector3();
      bbox.getSize(size);

      const scaleRatio = 0.25; // 4px = 1mm 스케일링 비율 적용
      setDimensions({
        x: parseFloat((size.x * scaleRatio).toFixed(1)),
        y: parseFloat((size.y * scaleRatio).toFixed(1)),
        z: extrudeHeight
      });

    } catch (err) {
      console.error('SVG 3D 실시간 돌출 렌더링 에러:', err);
    }
  }, [activeTab, threeScriptsLoaded, svgResult, extrudeHeight]);

  // --- 4. 3D 입체 STL 내보내기 및 다운로드 액션 핸들러 ---
  const handleDownloadStl = () => {
    if (!svgResult || !fileInfo) return;

    const runStlExport = () => {
      const THREE = (window as any).THREE;
      try {
        const loader = new THREE.SVGLoader();
        const svgData = loader.parse(svgResult);
        const paths = svgData.paths;
        const shapes = [];

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const shapesForPath = THREE.SVGLoader.createShapes(path);
          shapes.push(...shapesForPath);
        }

        if (shapes.length === 0) {
          showToast('STL로 변환할 수 있는 모양이 존재하지 않습니다.');
          return;
        }

        const geometry = new THREE.ExtrudeGeometry(shapes, {
          depth: extrudeHeight,
          bevelEnabled: false,
          steps: 1
        });

        // 3D 프린터 베드에 올라갈 수 있는 규격으로 스케일 가공 및 정렬
        geometry.center();
        geometry.rotateX(Math.PI);
        geometry.scale(0.25, 0.25, 1.0); // 1px = 0.25mm 척도 정밀 보정

        const material = new THREE.MeshBasicMaterial();
        const mesh = new THREE.Mesh(geometry, material);

        const exporter = new THREE.STLExporter();
        const result = exporter.parse(mesh, { binary: true });

        // 바이너리 데이터 다운로드 가동
        const blob = new Blob([result], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        const originalBaseName = fileInfo.name.substring(0, fileInfo.name.lastIndexOf('.')) || fileInfo.name;
        link.href = url;
        link.download = `${originalBaseName}_wow3d.stl`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('STL 3D 도면 파일이 성공적으로 다운로드되었습니다.');
      } catch (err) {
        console.error('STL 다운로드 모듈 에러:', err);
        showToast('STL 파일 생성 중 오류가 발생하였습니다.');
      }
    };

    // 스크립트가 아직 로딩되지 않았다면 비동기로 스크립트 먼저 준비 후 가동
    if (!threeScriptsLoaded) {
      setIs3DLoading(true);
      loadThreeAndSvgTools()
        .then(() => {
          setThreeScriptsLoaded(true);
          setIs3DLoading(false);
          runStlExport();
        })
        .catch((err) => {
          console.error(err);
          setIs3DLoading(false);
          showToast('3D 로더 모듈 해석에 실패했습니다.');
        });
    } else {
      runStlExport();
    }
  };

  // --- 실시간 자동 변환 디바운싱 처리 (300ms) ---
  useEffect(() => {
    if (!uploadedImage || !fileInfo) {
      setSvgResult(null);
      return;
    }

    // 이미 변환된 목록에 등록되지 않은 파일이고, 한도를 초과했다면 변환 작동 차단
    if (convertedFiles.length >= 10 && !convertedFiles.includes(fileInfo.name)) {
      setIsLimitExceeded(true);
      return;
    }

    const timer = setTimeout(async () => {
      setIsConverting(true);
      try {
        // 백그라운드 스레드 및 CPU 과부하 방지 최적화 처리된 변환 실행
        const result = await convertImageToSvg(uploadedImage, options);
        setSvgResult(result);

        // 변환 성공 시, 아직 기록되지 않은 새로운 파일인 경우에 한해 목록에 등록
        if (typeof window !== 'undefined' && !convertedFiles.includes(fileInfo.name)) {
          const updated = [...convertedFiles, fileInfo.name];
          setConvertedFiles(updated);
          localStorage.setItem('wow3d_converted_files', JSON.stringify(updated));
          
          if (updated.length >= 10) {
            setIsLimitExceeded(true);
          }
          showToast(`무료 변환 한도 잔여: ${10 - updated.length}개 파일`);
        }
      } catch (err: any) {
        console.error(err);
        showToast(err.message || '변환 과정에서 오류가 발생했습니다.');
      } finally {
        setIsConverting(false);
      }
    }, 300); // 300ms 디바운스 적용으로 슬라이더 조작 시 렉 발생 방지

    return () => clearTimeout(timer);
  }, [uploadedImage, options, fileInfo, convertedFiles]);

  // --- 파일 업로드 처리 로직 ---
  const processFile = (file: File) => {
    // 10개 무료 변환 제한 도달 여부 사전 확인 (이미 한 번 변환한 파일은 무제한 재업로드 및 편집 허용)
    if (convertedFiles.length >= 10 && !convertedFiles.includes(file.name)) {
      setIsLimitExceeded(true);
      showToast('무료 변환 한도(10개 파일)를 초과하였습니다.');
      return;
    }

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

  // --- 이미지 및 3D 관련 상태 초기화 ---
  const handleReset = () => {
    setUploadedImage(null);
    setFileInfo(null);
    setSvgResult(null);
    
    // 3D 상태 및 리소스 리셋
    setActiveTab('2d');
    setExtrudeHeight(10);
    setDimensions(null);
    if (mesh3dRef.current && scene3dRef.current) {
      try {
        scene3dRef.current.remove(mesh3dRef.current);
        if (mesh3dRef.current.geometry) mesh3dRef.current.geometry.dispose();
        if (mesh3dRef.current.material) mesh3dRef.current.material.dispose();
      } catch (err) {
        console.error('WebGL 리소스 초기화 에러:', err);
      }
      mesh3dRef.current = null;
    }

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

  // 새로 업로드하는 파일이 이미 변환했던 파일인지 판단
  const isCurrentFileNew = fileInfo ? !convertedFiles.includes(fileInfo.name) : true;
  // 무료 제한 도달 및 새로운 파일 변환 차단 상황 판단
  const shouldBlockConversion = isLimitExceeded && isCurrentFileNew;

  return (
    <div className={styles.container}>
      {/* AEO/SEO 최적화를 위한 SoftwareApplication 스키마 데이터 인젝션 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "이미지 SVG 무료 변환기 (Image to SVG Converter)",
            "description": "PNG, JPG, WEBP 이미지 파일을 해상도 손실이 없는 고화질 벡터 SVG 그래픽 파일로 무료 변환해 주는 브라우저 기반 온라인 도구입니다.",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires HTML5 Canvas and modern browser with ES6 support",
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

      {/* 1. 히어로 인트로 헤더 */}
      <header className={styles.heroSection}>
        <span className={styles.heroBadge}>무료 프로그램 배포</span>
        <h1 className={styles.heroTitle}>고성능 이미지 SVG 변환기</h1>
        <p className={styles.heroDesc}>
          로고, 스케치, 아이콘 등 일반 래스터 이미지(PNG, JPG)를 해상도 손실 없이 영구적으로 확대 가능한 고품질 SVG 벡터 그래픽 파일로 무료 변환하세요.
        </p>
      </header>

      {/* 1-2. 무료 변환 한도 초과(10개 파일) 경고 배너 */}
      {isLimitExceeded && (
        <div className={styles.limitBanner}>
          <div className={styles.limitText}>
            <strong>무료 이용 제한 안내:</strong> 이미 변환했던 파일 10개의 무료 변환 혜택이 모두 마감되었습니다. 
            추가로 새로운 파일을 고품질 벡터 그래픽으로 대량 변환하고 싶으시면, (주)와우쓰리디 기술 솔루션 도입 문의를 남겨주세요.
          </div>
          <a href="/contact/" className={styles.btnContact}>
            도입 및 구축 문의하기 <Sparkles size={14} />
          </a>
        </div>
      )}

      {/* 1-3. 이용 현황 인디케이터 (10개 미만일 때 잔여 횟수 표기) */}
      {!isLimitExceeded && (
        <div style={{ textAlign: 'right', marginBottom: '16px', fontSize: '0.875rem', color: '#94a3b8' }}>
          무료 혜택 현황: <strong style={{ color: '#60a5fa' }}>{convertedFiles.length}</strong> / 10개 파일 변환 완료
        </div>
      )}

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

                {/* SVG 변환 결과 및 3D 돌출 입체 미리보기 복합 뷰어 */}
                <div className={styles.viewCard}>
                  <div className={styles.viewTabs}>
                    <button 
                      className={clsx(styles.viewTab, activeTab === '2d' && styles.viewTabActive)}
                      onClick={() => setActiveTab('2d')}
                    >
                      <Sparkles size={14} /> 2D 벡터 (SVG)
                    </button>
                    <button 
                      className={clsx(styles.viewTab, activeTab === '3d' && styles.viewTabActive)}
                      onClick={() => {
                        if (svgResult) {
                          setActiveTab('3d');
                        } else {
                          showToast('이미지 변환 완료 후 3D 돌출을 시작할 수 있습니다.');
                        }
                      }}
                      disabled={!svgResult}
                      style={{ opacity: !svgResult ? 0.5 : 1 }}
                    >
                      <Box size={14} /> 3D 돌출 (STL)
                    </button>
                  </div>

                  {activeTab === '2d' ? (
                    <div className={styles.displayArea}>
                      {shouldBlockConversion ? (
                        <div className={styles.loadingOverlay} style={{ background: 'rgba(15, 23, 42, 0.92)' }}>
                          <span style={{ fontSize: '1.25rem', color: '#f87171', fontWeight: 800 }}>무료 변환 한도 초과</span>
                          <p style={{ fontSize: '0.875rem', color: '#94a3b8', padding: '0 24px', textAlign: 'center', lineHeight: 1.5 }}>
                            이미 10개의 고유 파일 변환 혜택이 모두 소진되었습니다. 무제한 변환 라이선스 획득 및 스마트상점 맞춤 도입은 구축문의를 주시면 신속하게 안내해 드립니다.
                          </p>
                          <a 
                            href="/contact/" 
                            className={styles.btnContact}
                            style={{ marginTop: '10px' }}
                          >
                            도입 문의 바로가기
                          </a>
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  ) : (
                    // 3D 돌출 미리보기 뷰어 영역
                    <div className={styles.threeCanvasContainer} ref={containerRef3d}>
                      {is3DLoading && (
                        <div className={styles.threeLoadingOverlay}>
                          <div className={styles.threeSpinner} />
                          <span className={styles.threeLoadingText}>3D 하드웨어 가속 기하 연산 중...</span>
                        </div>
                      )}
                      <canvas ref={canvasRef3d} className={styles.threeCanvas} />
                      <div className={styles.threeHelperOverlay}>
                        <div className={styles.threeHelperItem}>좌클릭 드래그: 회전</div>
                        <div className={styles.threeHelperItem}>휠 스크롤: 줌</div>
                        <div className={styles.threeHelperItem}>우클릭 드래그: 이동</div>
                      </div>
                    </div>
                  )}
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

              {/* 3D 돌출 입체 실시간 튜닝 설정 영역 (SVG 변환 결과가 있을 때 활성화) */}
              {svgResult && (
                <div className={styles.metadataBoard}>
                  <h3 className={styles.metadataTitle}>
                    <Box size={16} color="#3b82f6" /> 3D 돌출 모델 가공 설정
                  </h3>
                  
                  {activeTab === '3d' && (
                    <div className={styles.threeInfoBanner}>
                      <span style={{ display: 'flex', color: '#2563eb', marginTop: '2px' }}>
                        <Box size={14} />
                      </span>
                      <p className={styles.threeInfoText}>
                        마우스로 3D 공간 상의 모델을 회전하거나 줌하여 돌출 두께와 형태를 다각도에서 검사할 수 있습니다.
                      </p>
                    </div>
                  )}

                  <div className={styles.controlGroup}>
                    <div>
                      <div className={styles.labelWrapper}>
                        <label className={styles.label}>돌출 두께 (Extrude Height)</label>
                        <span className={styles.valueIndicator}>{extrudeHeight} mm</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="50" 
                        value={extrudeHeight} 
                        onChange={(e) => setExtrudeHeight(parseInt(e.target.value))}
                        className={styles.slider}
                      />
                      <p className={styles.uploadSubtext} style={{ marginTop: '4px' }}>
                        3D 프린팅 출력물의 입체 두께 규격을 1mm부터 50mm까지 실시간 조절합니다.
                      </p>
                    </div>
                  </div>

                  {/* 3D 실측 예측 크기 칩 리스트 */}
                  {dimensions && (
                    <div style={{ marginTop: '16px' }}>
                      <span className={styles.label} style={{ display: 'block', marginBottom: '8px' }}>예상 3D 실측 크기 (mm)</span>
                      <div className={styles.dimensionsGrid}>
                        <div className={styles.dimensionChip}>
                          <span className={styles.dimLabel}>가로 (X)</span>
                          <span className={styles.dimValue}>{dimensions.x} mm</span>
                        </div>
                        <div className={styles.dimensionChip}>
                          <span className={styles.dimLabel}>세로 (Y)</span>
                          <span className={styles.dimValue}>{dimensions.y} mm</span>
                        </div>
                        <div className={styles.dimensionChip}>
                          <span className={styles.dimLabel}>높이 (Z)</span>
                          <span className={styles.dimValue}>{dimensions.z} mm</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 다운로드 및 복사 버튼 액션 */}
            <div className={styles.actionGroup}>
              {shouldBlockConversion ? (
                <a 
                  href="/contact/" 
                  className={styles.btnPrimary}
                  style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', textDecoration: 'none' }}
                >
                  한도 초과: 관리자 도입 문의
                </a>
              ) : (
                <>
                  <button 
                    className={clsx(styles.btnPrimary, !svgResult && styles.disabled)}
                    onClick={handleDownloadSvg}
                    disabled={!svgResult}
                  >
                    <Download size={18} /> SVG 파일 다운로드
                  </button>

                  {/* 초록색 프리미엄 그라데이션이 들어간 3D STL 다운로드 버튼 */}
                  <button 
                    className={clsx(styles.btnPrimary, !svgResult && styles.disabled)}
                    style={{
                      background: svgResult ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : undefined,
                      boxShadow: svgResult ? '0 4px 15px rgba(16, 185, 129, 0.2)' : undefined
                    }}
                    onClick={handleDownloadStl}
                    disabled={!svgResult}
                  >
                    <Box size={18} /> 3D 입체 STL 다운로드
                  </button>
                  
                  <button 
                    className={clsx(styles.btnSecondary, !svgResult && styles.disabled)}
                    onClick={handleCopySvgCode}
                    disabled={!svgResult}
                  >
                    <Copy size={16} /> SVG 코드 복사
                  </button>
                </>
              )}
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
