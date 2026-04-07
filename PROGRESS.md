# TripHero — Progress Log

## Current status: MVP 전환 완료, 가설 검증 준비 중

---

## 2026-04-07 — Mina's Seoul Guide MVP 전환

### Done

- [x] Theo's Seoul Guide → Mina's Seoul Guide 전체 전환 (11개 파일)
  - 타입/스키마: `whyShellLikeIt` → `localInsight`, guest optional
  - 프로필: Mina 아이덴티티 (Local Buddy 콘셉트)
  - Hero: 단일 프로필 레이아웃 (curator만 표시)
  - 홈페이지/상세시트/지도/메타데이터: 카피 전면 변경
  - 테스트 어서션 업데이트 — 8/8 통과
- [x] Mina 프로필 사진 적용
- [x] 파비콘 Mina 사진으로 교체 (SVG → PNG)
- [x] GitHub 독립 리포 생성: mikefarfaraway/triphero
- [x] Google Places API 사진 다운로드 스크립트 작성 (`scripts/fetch-place-photos.ts`)

### In progress

- [ ] Google Places API 키 제한 변경 대기 (HTTP 리퍼러 → IP 주소)
  - 변경 반영 후 `npx tsx scripts/fetch-place-photos.ts` 실행하여 62장 고해상도 교체

### Backlog

- [ ] POI 사진 고해상도 교체 (Places API 키 준비 후)
- [ ] 새 도메인 연결 (theoandsheila.xyz → 새 도메인)
- [ ] OG 이미지 Mina 브랜딩으로 교체
- [ ] 검색 기능 추가
- [ ] 동네(neighborhood) 필터 추가
- [ ] 인앱 지도 뷰 (좌표 데이터 활용)
- [ ] 즐겨찾기/체크리스트 기능
- [ ] 배포 (Vercel 등)

---

## Architecture decisions

| 결정 | 이유 |
|------|------|
| guest를 optional로 변경 | Local Buddy 모델에서 guest는 불특정 외국인 방문자 |
| `whyShellLikeIt` → `localInsight` | "Mina의 로컬 인사이트"가 콘셉트에 적합 |
| CSV → build-time transform 유지 | 65개 장소 규모에 DB 불필요, 빠른 iteration |
| Google Maps 외부 링크 유지 | 인앱 지도는 후순위, 현재는 링크로 충분 |
