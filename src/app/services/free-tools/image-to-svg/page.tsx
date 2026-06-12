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
  Box,
  AlertCircle,
  Info
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

// 개별 가공 가능한 SVG 영역(패스) 데이터 인터페이스
interface SvgPathItem {
  id: string;
  d: string;
  fill: string;
  selected: boolean;
  height: number;
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
  const [toastType, setToastType] = useState<'success' | 'info' | 'error'>('success');
  
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

  // --- 인터랙티브 다중 영역(패스) 및 가공 상태 관리 추가 ---
  const [pathItems, setPathItems] = useState<SvgPathItem[]>([]);
  const [viewBox, setViewBox] = useState<string>('0 0 500 500');
  const [is3DNeedsUpdate, setIs3DNeedsUpdate] = useState<boolean>(false);
  const [globalExtrudeHeight, setGlobalExtrudeHeight] = useState<number>(10); // 일괄 두께 제어값 (기본 10mm)

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
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastType(type);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // --- 1. SVG 변환 결과 갱신 시 DOMParser로 개별 패스(영역) 분해 추출 및 초기화 ---
  useEffect(() => {
    if (!svgResult) {
      setPathItems([]);
      setDimensions(null);
      setIs3DNeedsUpdate(false);
      return;
    }

    try {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgResult, 'image/svg+xml');
      const paths = svgDoc.querySelectorAll('path');
      
      const width = svgDoc.documentElement.getAttribute('width') || '500';
      const height = svgDoc.documentElement.getAttribute('height') || '500';
      const vb = svgDoc.documentElement.getAttribute('viewBox') || `0 0 ${width} ${height}`;
      setViewBox(vb);

      const items: SvgPathItem[] = [];
      paths.forEach((p, index) => {
        const d = p.getAttribute('d') || '';
        if (!d) return;
        
        let fill = p.getAttribute('fill') || '#60a5fa';
        if (fill === 'none' || fill === '') {
          fill = '#60a5fa';
        }

        items.push({
          id: `path-${index}-${Math.random().toString(36).substr(2, 9)}`,
          d,
          fill,
          selected: true, // 디폴트: 전체 영역 가공 On
          height: globalExtrudeHeight // 디폴트: 일괄 두께 10mm 적용
        });
      });

      setPathItems(items);
      setIs3DNeedsUpdate(true); // 새 형상 로드되었으므로 3D 갱신 필요 상태 활성화
    } catch (err) {
      console.error('SVG 가공 영역 파싱 에러:', err);
    }
  }, [svgResult]);

  // --- 2. 3D 미리보기 탭 활성화 시 Three.js CDN 동적 주입 로드 ---
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

  // --- 3. Three.js WebGL 씬(Scene) 생성 및 기본 세팅 (3D 탭 활성화 시) ---
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

  // --- 4. 지정한 영역 및 개별 조건을 3D WebGL에 실제로 렌더링 반영 (컴파일) ---
  const apply3DExtrusion = () => {
    // 2D 탭 등 3D 뷰어가 열려있지 않은 상태라면 자동으로 3D 탭으로 천이 처리 (성공적인 UX 연동)
    if (activeTab !== '3d') {
      setActiveTab('3d');
      return;
    }

    if (!threeScriptsLoaded || !scene3dRef.current || pathItems.length === 0) {
      showToast('3D 가속 그래픽 엔진이 아직 준비되지 않았습니다.', 'info');
      return;
    }

    const THREE = (window as any).THREE;
    const scene = scene3dRef.current;

    // 기존 씬 내부 메쉬 및 자원 소거 (메모리 누수 방지)
    if (mesh3dRef.current) {
      scene.remove(mesh3dRef.current);
      mesh3dRef.current.traverse((child: any) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m: any) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      mesh3dRef.current = null;
    }

    try {
      const group = new THREE.Group();
      const loader = new THREE.SVGLoader();
      let activeMeshCount = 0;

      pathItems.forEach((item) => {
        if (!item.selected) return; // 미선택 영역 돌출 제외

        // 개별 path에 대응하는 SVG sub-string 생성하여 SVGLoader 파싱 (삼각화 겹침 충돌 방지 및 구멍 정밀 가공 해결)
        const parsedData = loader.parse(`<svg viewBox="${viewBox}"><path d="${item.d}" fill="${item.fill}" /></svg>`);
        const path = parsedData.paths[0];
        if (!path) return;

        // 구멍(Holes) 정보가 통합된 2D 도형 완성
        const shapes = THREE.SVGLoader.createShapes(path);
        if (shapes.length === 0) return;

        // 개별 지정된 돌출 높이 적용
        const extrudeSettings = {
          depth: item.height,
          bevelEnabled: false,
          steps: 1
        };

        const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);

        // SVG 색상을 3D 메쉬로 투영하되, 어두운 계열(검은색 등)은 셰이딩 입체감이 극대화되는 밝은 스카이블루(#60a5fa)로 안전 보정
        let meshColor = item.fill;
        try {
          const tempColor = new THREE.Color(item.fill);
          const hsl = { h: 0, s: 0, l: 0 };
          tempColor.getHSL(hsl);
          // HSL 밝기가 0.15 이하이거나 검은색 계열인 경우 시그니처 스카이블루(#60a5fa)로 자동 변환하여 명암 가시성 확보
          if (hsl.l < 0.15 || item.fill.toLowerCase() === '#000000' || item.fill.toLowerCase() === 'black') {
            meshColor = '#60a5fa';
          }
        } catch (e) {
          meshColor = '#60a5fa';
        }

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(meshColor),
          roughness: 0.4,
          metalness: 0.15, // 메탈릭 느낌을 살려 외곽 셰이딩 입체감을 향상
          flatShading: true,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
        activeMeshCount++;
      });

      if (activeMeshCount === 0) {
        showToast('돌출을 실행할 선택된 가공 영역이 없습니다.');
        return;
      }

      // Group 내부 메쉬들의 종합 Bounding Box를 계산하여 중심 정렬
      const box = new THREE.Box3().setFromObject(group);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // 자식 객체들의 위치를 그룹 중심 반대 오프셋만큼 보정해 원점 정렬
      group.children.forEach((child: any) => {
        child.position.sub(center);
      });

      // SVG Y축 하향 좌표계 상하 회전 보정
      group.rotation.x = Math.PI;

      scene.add(group);
      mesh3dRef.current = group;

      // 카메라 조망 오버레이 피팅 정렬
      const boundingSphere = new THREE.Sphere();
      box.getBoundingSphere(boundingSphere);
      const radius = boundingSphere.radius;

      if (controls3dRef.current && camera3dRef.current) {
        controls3dRef.current.target.set(0, 0, 0); // 타겟을 정중앙 원점으로
        camera3dRef.current.position.set(
          0,
          radius * 1.5,
          radius * 2.0
        );
        controls3dRef.current.update();
      }

      // mm 기준 예상 종합 실측 크기 산출 (4px = 1mm 척도 정밀 보정)
      const groupSize = new THREE.Vector3();
      box.getSize(groupSize);

      const scaleRatio = 0.25;
      setDimensions({
        x: parseFloat((groupSize.x * scaleRatio).toFixed(1)),
        y: parseFloat((groupSize.y * scaleRatio).toFixed(1)),
        z: parseFloat(groupSize.z.toFixed(1))
      });

      setIs3DNeedsUpdate(false); // 가공 변환 적용 상태 완료 처리
      showToast('3D 가공 변환이 완벽하게 실행되었습니다.');

    } catch (err) {
      console.error('3D 입체 변환 가공 에러:', err);
      showToast('3D 변환 과정에서 오류가 발생했습니다.');
    }
  };

  // --- 5. 3D 탭 진입 시 업데이트가 필요하다면 즉시 자동 적용 ---
  useEffect(() => {
    if (activeTab === '3d' && threeScriptsLoaded && scene3dRef.current && is3DNeedsUpdate && pathItems.length > 0) {
      apply3DExtrusion();
    }
  }, [activeTab, threeScriptsLoaded, is3DNeedsUpdate, pathItems.length]);

  // --- 6. 인터랙티브 영역(패스) 가공을 위한 개별 조작 핸들러 함수들 ---
  const togglePathSelection = (id: string) => {
    setPathItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
    setIs3DNeedsUpdate(true);
  };

  const updatePathHeight = (id: string, h: number) => {
    setPathItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, height: h };
      }
      return item;
    }));
    setIs3DNeedsUpdate(true);
  };

  const toggleAllPaths = (select: boolean) => {
    setPathItems(prev => prev.map(item => ({ ...item, selected: select })));
    setIs3DNeedsUpdate(true);
  };

  const handleBatchHeightChange = (h: number) => {
    setGlobalExtrudeHeight(h);
    setPathItems(prev => prev.map(item => ({ ...item, height: h })));
    setIs3DNeedsUpdate(true);
  };

  // --- 7. 3D 입체 STL 다중 메쉬 Group 결합 다운로드 액션 핸들러 ---
  const handleDownloadStl = () => {
    if (!svgResult || !fileInfo || pathItems.length === 0) return;

    const runStlExport = () => {
      const THREE = (window as any).THREE;
      try {
        const group = new THREE.Group();
        const loader = new THREE.SVGLoader();
        let activeCount = 0;

        pathItems.forEach((item) => {
          if (!item.selected) return;

          const parsedData = loader.parse(`<svg viewBox="${viewBox}"><path d="${item.d}" fill="${item.fill}" /></svg>`);
          const path = parsedData.paths[0];
          if (!path) return;

          const shapes = THREE.SVGLoader.createShapes(path);
          if (shapes.length === 0) return;

          const geometry = new THREE.ExtrudeGeometry(shapes, {
            depth: item.height,
            bevelEnabled: false,
            steps: 1
          });

          // 3D 프린터 스케일 (1px = 0.25mm) 가공
          geometry.scale(0.25, 0.25, 1.0);

          const material = new THREE.MeshBasicMaterial();
          const mesh = new THREE.Mesh(geometry, material);
          group.add(mesh);
          activeCount++;
        });

        if (activeCount === 0) {
          showToast('STL 파일로 다운로드할 선택된 가공 영역이 존재하지 않습니다.');
          return;
        }

        // Bounding Box 정렬하여 원점 맞춤
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);

        group.children.forEach((child: any) => {
          child.position.sub(center);
        });

        // 3D 프린터 베드에 올바르게 눕히기 위한 X축 회전
        group.rotation.x = Math.PI;

        const exporter = new THREE.STLExporter();
        // Group을 전달하여 모든 가공 패스들이 단일 파일로 완전 융합된 고품질 STL로 내보내기 처리
        const result = exporter.parse(group, { binary: true });

        // 다운로드 실행
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
          <a href="/contact" className={styles.btnContact}>
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
                            href="/contact" 
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
                            pathItems.length > 0 ? (
                              <svg 
                                viewBox={viewBox} 
                                style={{ width: '90%', height: '90%', maxHeight: '420px' }}
                              >
                                {pathItems.map((item) => (
                                  <path
                                    key={item.id}
                                    d={item.d}
                                    fill={item.fill}
                                    stroke={item.selected ? '#3b82f6' : 'none'}
                                    strokeWidth={item.selected ? '2' : '0'}
                                    strokeLinejoin="round"
                                    opacity={item.selected ? 1.0 : 0.25}
                                    className={styles.interactivePath}
                                    style={{ 
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => togglePathSelection(item.id)}
                                  />
                                ))}
                              </svg>
                            ) : (
                              <div 
                                style={{ width: '90%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                dangerouslySetInnerHTML={{ __html: svgResult }} 
                              />
                            )
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

                  {/* 마스터(일괄) 두께 조절 슬라이더 */}
                  <div className={styles.batchControl}>
                    <div className={styles.batchHeader}>
                      <label className={styles.label} style={{ color: '#1d4ed8' }}>전체 두께 일괄 적용</label>
                      <span className={styles.valueIndicator}>{globalExtrudeHeight} mm</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={globalExtrudeHeight} 
                      onChange={(e) => handleBatchHeightChange(parseInt(e.target.value))}
                      className={styles.slider}
                    />
                  </div>

                  {/* 영역별 가공 상세 선택 목록 (Layers) */}
                  {pathItems.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className={styles.label}>영역별 조건 개별 설정 ({pathItems.length})</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => toggleAllPaths(true)}
                            style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            전체선택
                          </button>
                          <button 
                            onClick={() => toggleAllPaths(false)}
                            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            전체해제
                          </button>
                        </div>
                      </div>
                      
                      <div className={styles.layerList}>
                        {pathItems.map((item, idx) => (
                          <div key={item.id} className={styles.layerItem}>
                            <div className={styles.layerHeader}>
                              <div className={styles.layerInfo}>
                                <input 
                                  type="checkbox" 
                                  checked={item.selected} 
                                  onChange={() => togglePathSelection(item.id)}
                                  className={styles.checkbox}
                                  style={{ margin: 0 }}
                                />
                                <span 
                                  className={styles.layerColorChip} 
                                  style={{ backgroundColor: item.fill }}
                                />
                                <span className={styles.layerTitle}>영역 #{idx + 1}</span>
                              </div>
                              <span className={styles.layerVal}>{item.height} mm</span>
                            </div>
                            
                            {item.selected && (
                              <div className={styles.layerControls}>
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="50" 
                                  value={item.height} 
                                  onChange={(e) => updatePathHeight(item.id, parseInt(e.target.value))}
                                  className={styles.layerSlider}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3D 변환 갱신 경고 배너 및 변환 적용 버튼 */}
                  {is3DNeedsUpdate && (
                    <div className={styles.needsUpdateBanner}>
                      <span style={{ color: '#d97706', display: 'flex' }}><Box size={14} /></span>
                      <p className={styles.needsUpdateText}>가공 설정 조건 변경됨: 3D 모델에 적용이 필요합니다.</p>
                    </div>
                  )}

                  <button 
                    className={clsx(styles.btnApply3D, is3DNeedsUpdate && styles.btnApply3DPulsing)}
                    onClick={apply3DExtrusion}
                    style={{ width: '100%' }}
                  >
                    <Sparkles size={16} /> 3D 입체 변환 적용 (Apply)
                  </button>

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
                  href="/contact" 
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
      <div 
        className={clsx(styles.toast, toastMessage && styles.toastShow)}
        style={{
          borderColor: toastType === 'error' ? '#ef4444' : toastType === 'info' ? '#3b82f6' : '#10b981',
          color: toastType === 'error' ? '#f87171' : toastType === 'info' ? '#60a5fa' : '#10b981'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {toastType === 'error' && <AlertCircle size={18} />}
          {toastType === 'info' && <Info size={18} />}
          {toastType === 'success' && <Check size={18} />}
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
