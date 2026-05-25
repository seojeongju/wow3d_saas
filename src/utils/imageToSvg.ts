/**
 * 이미지 SVG 변환을 위한 경량 고성능 유틸리티
 * 100% 클라이언트 사이드(브라우저)에서 동작하며, 외부 라이브러리 의존성 없이 실행됩니다.
 * Moore-Neighbor Tracing 알고리즘과 Douglas-Peucker 단순화 알고리즘을 구현하여
 * 고품질의 벡터 외곽선을 추출합니다.
 */

export interface TracingOptions {
  threshold: number;         // 이진화 임계값 (0 ~ 255)
  simplify: number;          // 경로 단순화 입실론(Epsilon) 값 (0 ~ 10)
  colorMode: 'binary' | 'color'; // 변환 모드: 흑백(binary) 또는 다색(color)
  numberOfColors: number;    // 컬러 모드 시 양자화할 색상 수 (2 ~ 16)
  removeBackground: boolean; // 배경색(일반적으로 밝은색/흰색) 제거 여부
  invert: boolean;           // 흑백 반전 여부
}

interface Point {
  x: number;
  y: number;
}

/**
 * 두 점 사이의 거리를 계산합니다.
 */
function getDistance(p1: Point, p2: Point): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * 점 p에서 선분 (s, e)까지의 최단 거리를 계산합니다.
 */
function getPerpendicularDistance(p: Point, s: Point, e: Point): number {
  const dx = e.x - s.x;
  const dy = e.y - s.y;
  
  if (dx === 0 && dy === 0) {
    return getDistance(p, s);
  }
  
  // 선분 벡터의 정규화 프로젝션
  const t = ((p.x - s.x) * dx + (p.y - s.y) * dy) / (dx * dx + dy * dy);
  
  if (t < 0) {
    return getDistance(p, s);
  }
  if (t > 1) {
    return getDistance(p, e);
  }
  
  const proj: Point = {
    x: s.x + t * dx,
    y: s.y + t * dy
  };
  
  return getDistance(p, proj);
}

/**
 * Douglas-Peucker 알고리즘을 사용하여 점들을 단순화합니다.
 * 입실론(epsilon) 값이 클수록 점의 개수가 줄어들며 단순한 윤곽선이 됩니다.
 */
function simplifyPath(points: Point[], epsilon: number): Point[] {
  if (points.length <= 2 || epsilon <= 0) {
    return points;
  }
  
  let maxDist = 0;
  let index = 0;
  const end = points.length - 1;
  
  for (let i = 1; i < end; i++) {
    const dist = getPerpendicularDistance(points[i], points[0], points[end]);
    if (dist > maxDist) {
      maxDist = dist;
      index = i;
    }
  }
  
  if (maxDist > epsilon) {
    const results1 = simplifyPath(points.slice(0, index + 1), epsilon);
    const results2 = simplifyPath(points.slice(index), epsilon);
    return results1.slice(0, results1.length - 1).concat(results2);
  }
  
  return [points[0], points[end]];
}

/**
 * 픽셀 그리드에서 Moore-Neighbor Tracing 알고리즘을 사용해 윤곽선을 추출합니다.
 */
function traceOutline(grid: Uint8Array, width: number, height: number): Point[][] {
  const visited = new Uint8Array(width * height);
  const contours: Point[][] = [];
  
  // Moore 영역 탐색을 위한 방향 벡터 (시계 방향)
  const dirs: Point[] = [
    { x: 0, y: -1 },  // 북
    { x: 1, y: -1 },  // 북동
    { x: 1, y: 0 },   // 동
    { x: 1, y: 1 },   // 남동
    { x: 0, y: 1 },   // 남
    { x: -1, y: 1 },  // 남서
    { x: -1, y: 0 },  // 서
    { x: -1, y: -1 }  // 북서
  ];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      
      // 방문하지 않은 전경 픽셀을 발견했을 때 경계 추적 시작
      if (grid[idx] === 1 && visited[idx] === 0) {
        // 이 픽셀이 진짜 외곽선(경계)인지 검사 (사방 픽셀 중 하나라도 배경(0)이어야 함)
        const isBoundary = 
          grid[idx - 1] === 0 || 
          grid[idx + 1] === 0 || 
          grid[idx - width] === 0 || 
          grid[idx + width] === 0;
          
        if (!isBoundary) continue;
        
        const contour: Point[] = [];
        let curr: Point = { x, y };
        
        // 탐색을 시작한 첫 외부 배경 셀의 방향을 구함 (일반적으로 왼쪽이 배경)
        let sIdx = 6; // 서쪽에서 시작
        let startPoint: Point = { x, y };
        let backtrack = false;
        
        contour.push({ ...curr });
        visited[curr.y * width + curr.x] = 1;
        
        let foundNext = false;
        let limit = 0;
        const maxLimit = width * height; // 무한 루프 방지 장치
        
        while (limit < maxLimit) {
          limit++;
          foundNext = false;
          
          // 주변 8칸 시계방향 탐색
          for (let d = 0; d < 8; d++) {
            const dirIdx = (sIdx + d) % 8;
            const nx = curr.x + dirs[dirIdx].x;
            const ny = curr.y + dirs[dirIdx].y;
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nidx = ny * width + nx;
              if (grid[nidx] === 1) {
                curr = { x: nx, y: ny };
                contour.push({ ...curr });
                visited[nidx] = 1;
                
                // 역추적 시작 방향 결정 (들어온 방향의 반대에서 +2 하여 효율적인 시계방향 지속)
                sIdx = (dirIdx + 5) % 8; 
                foundNext = true;
                break;
              }
            }
          }
          
          // 더 이상 갈 곳이 없거나 시작점으로 완벽히 돌아왔다면 루프 종료
          if (!foundNext) break;
          
          if (curr.x === startPoint.x && curr.y === startPoint.y) {
            backtrack = true;
            break;
          }
        }
        
        if (contour.length > 3) {
          contours.push(contour);
        }
      }
    }
  }
  
  return contours;
}

/**
 * RGB 색상 사이의 유클리드 거리를 계산합니다.
 */
function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/**
 * 주요 색상들로 다색 양자화(Color Quantization)를 수행합니다.
 * 고성능 구현을 위해 K-Means 대신, 이미지에서 가장 빈도가 높은 주요 색상들을 추출하는 방식을 사용합니다.
 */
function extractPalette(pixels: Uint8ClampedArray, numColors: number, removeBg: boolean): { r: number; g: number; b: number }[] {
  const colorBuckets: { [key: string]: { r: number; g: number; b: number; count: number } } = {};
  
  // 픽셀 비트 축소(Quantize)를 통한 색상 빈도 집계
  // 연산 최적화를 위해 픽셀을 5비트로 낮추어 버킷을 구성합니다.
  for (let i = 0; i < pixels.length; i += 16) { // 성능을 위해 일부 픽셀 샘플링
    const a = pixels[i + 3];
    if (a < 128) continue; // 투명 픽셀 패스
    
    const r = Math.round(pixels[i] / 8) * 8;
    const g = Math.round(pixels[i + 1] / 8) * 8;
    const b = Math.round(pixels[i + 2] / 8) * 8;
    
    // 밝은 배경 제거 옵션이 켜져있고 흰색 계열이면 패스
    if (removeBg && r > 240 && g > 240 && b > 240) {
      continue;
    }
    
    const key = `${r},${g},${b}`;
    if (colorBuckets[key]) {
      colorBuckets[key].count++;
    } else {
      colorBuckets[key] = { r, g, b, count: 1 };
    }
  }
  
  // 가장 빈도가 높은 순으로 정렬
  const sortedColors = Object.values(colorBuckets)
    .sort((a, b) => b.count - a.count)
    .slice(0, numColors);
    
  return sortedColors.map(c => ({ r: c.r, g: c.g, b: c.b }));
}

/**
 * 이미지를 SVG 문자열로 변환하는 메인 핵심 함수
 */
export async function convertImageToSvg(
  imageSrc: string,
  options: TracingOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;
    
    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        
        // 메모리 절약을 위한 캔버스 크기 제어 (최대 800px 해상도 제한으로 CPU 과부하 방지)
        const maxDimension = 800;
        let scale = 1;
        if (width > maxDimension || height > maxDimension) {
          scale = maxDimension / Math.max(width, height);
        }
        
        const canvasWidth = Math.round(width * scale);
        const canvasHeight = Math.round(height * scale);
        
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D Context를 생성할 수 없습니다.');
        }
        
        // 고해상도 리샘플링 방지 및 선명한 픽셀 드로잉 설정
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const pixels = imageData.data;
        
        let svgContent = '';
        
        if (options.colorMode === 'binary') {
          // [흑백 모드]
          const grid = new Uint8Array(canvasWidth * canvasHeight);
          
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];
            const idx = i / 4;
            
            // 완전 투명 픽셀은 배경으로 처리
            if (a < 50) {
              grid[idx] = options.invert ? 1 : 0;
              continue;
            }
            
            // 휘도 공식: Y = 0.299R + 0.587G + 0.114B
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            let val = luminance < options.threshold ? 1 : 0;
            
            if (options.invert) {
              val = val === 1 ? 0 : 1;
            }
            
            // 배경 제거가 활성화되어 있고 배경(흰색)일 때
            if (options.removeBackground && val === 0) {
              grid[idx] = 0;
            } else {
              grid[idx] = val;
            }
          }
          
          // 경계선 추출
          const contours = traceOutline(grid, canvasWidth, canvasHeight);
          
          // SVG 경로 패스 생성
          let pathsD = '';
          contours.forEach((contour) => {
            // Douglas-Peucker 경로 단순화 적용
            const simplified = simplifyPath(contour, options.simplify);
            if (simplified.length < 3) return;
            
            let d = `M ${simplified[0].x} ${simplified[0].y}`;
            for (let i = 1; i < simplified.length; i++) {
              d += ` L ${simplified[i].x} ${simplified[i].y}`;
            }
            d += ' Z';
            pathsD += ' ' + d;
          });
          
          if (pathsD.trim()) {
            svgContent += `<path d="${pathsD.trim()}" fill="black" />`;
          }
          
        } else {
          // [컬러 모드]
          // 1. 색상 팔레트 추출
          const palette = extractPalette(pixels, options.numberOfColors, options.removeBackground);
          
          // 각 색상별로 레이어 생성 및 추출
          palette.forEach((color) => {
            const grid = new Uint8Array(canvasWidth * canvasHeight);
            
            for (let i = 0; i < pixels.length; i += 4) {
              const r = pixels[i];
              const g = pixels[i + 1];
              const b = pixels[i + 2];
              const a = pixels[i + 3];
              const idx = i / 4;
              
              if (a < 50) {
                grid[idx] = 0;
                continue;
              }
              
              // 이 픽셀과 현재 팔레트 색상 간의 유사도 검증
              const dist = colorDistance(r, g, b, color.r, color.g, color.b);
              
              // 주변의 다른 팔레트 색상들과도 비교하여 가장 가까운 색상인지 확인
              let isClosest = true;
              let minDist = dist;
              
              for (const pColor of palette) {
                if (pColor === color) continue;
                const pDist = colorDistance(r, g, b, pColor.r, pColor.g, pColor.b);
                if (pDist < minDist) {
                  minDist = pDist;
                  isClosest = false;
                  break;
                }
              }
              
              grid[idx] = isClosest ? 1 : 0;
            }
            
            // 경계선 추출
            const contours = traceOutline(grid, canvasWidth, canvasHeight);
            
            // 현재 색상 레이어에 대한 SVG 경로 빌드
            let pathsD = '';
            contours.forEach((contour) => {
              const simplified = simplifyPath(contour, options.simplify);
              if (simplified.length < 3) return;
              
              let d = `M ${simplified[0].x} ${simplified[0].y}`;
              for (let i = 1; i < simplified.length; i++) {
                d += ` L ${simplified[i].x} ${simplified[i].y}`;
              }
              d += ' Z';
              pathsD += ' ' + d;
            });
            
            if (pathsD.trim()) {
              const colorStr = `rgb(${color.r},${color.g},${color.b})`;
              svgContent += `<path d="${pathsD.trim()}" fill="${colorStr}" />`;
            }
          });
        }
        
        // 최종 완성형 SVG 래핑 생성
        const finalSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}" width="100%" height="100%">
  ${svgContent}
</svg>`;
        
        resolve(finalSvg);
      } catch (err) {
        reject(err);
      }
    };
    
    img.onerror = () => {
      reject(new Error('이미지를 로드하는 과정에서 오류가 발생했습니다. 파일 형식을 확인해주세요.'));
    };
  });
}
