# Google Search Console 등록 가이드 (wow3dsw.co.kr)

## 1. Google Search Console 접속

- https://search.google.com/search-console 접속
- Google 계정으로 로그인

## 2. 리소스(사이트) 추가

1. **리소스 추가** 클릭
2. **URL 접두어** 선택 후 입력: `https://wow3dsw.co.kr`
3. **계속** 클릭

## 3. 소유권 확인 — HTML 태그 방식

1. **소유권 확인 방법** 목록에서 **HTML 태그** 선택
2. 예시로 나오는 메타 태그에서 **content** 값만 복사  
   (예: `<meta name="google-site-verification" content="여기_긴_문자열" />` → `여기_긴_문자열` 부분만)
3. 아래 중 한 가지 방법으로 해당 값을 사이트에 반영

### 방법 A: Cloudflare Pages 환경 변수 (권장)

1. **Cloudflare 대시보드** → **Workers & Pages** → **wow3d-saas** 프로젝트
2. **Settings** → **Environment variables**
3. **Production**에 변수 추가:
   - **Variable name**: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - **Value**: (Search Console에서 복사한 content 값)
4. **Save** 후 **재배포** 한 번 실행 (최신 커밋으로 다시 배포)

### 방법 B: 로컬에서만 확인할 때

프로젝트 루트에 `.env.local` 파일 생성:

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=여기에_복사한_content_값
```

이후 `npm run build` 후 배포.

## 4. Search Console에서 확인

1. 메타 태그가 반영된 상태로 배포된 뒤, Search Console 화면에서 **확인** 클릭
2. "소유권이 확인되었습니다" 메시지가 나오면 완료

## 5. 사이트맵 제출

1. Search Console 왼쪽 메뉴 **색인 생성** → **Sitemaps**
2. **새 사이트맵 추가**에 아래 주소 입력:
   ```
   https://wow3dsw.co.kr/sitemap.xml
   ```
3. **제출** 클릭

이후 Google이 사이트맵을 수집하고, 며칠 안에 색인 요청·URL 검사 등이 가능해집니다.

## 요약

| 단계 | 할 일 |
|------|--------|
| 1 | search.google.com/search-console 에서 리소스 추가 (https://wow3dsw.co.kr) |
| 2 | HTML 태그 방식 선택 후 content 값 복사 |
| 3 | Cloudflare Pages 환경 변수 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`에 붙여넣기 → 재배포 |
| 4 | Search Console에서 **확인** 클릭 |
| 5 | Sitemaps에서 `https://wow3dsw.co.kr/sitemap.xml` 제출 |
