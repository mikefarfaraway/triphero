# TripHero — Progress Log

## Current status: 멀티유저 MVP 프로덕션 라이브 (triphero.club)

---

## 2026-04-07 — 멀티유저 구조 + 프로덕션 배포

### Done

- [x] Theo's Seoul Guide → Mina's Seoul Guide 전체 전환 (11개 파일)
  - 타입/스키마: `whyShellLikeIt` → `localInsight`, guest optional
  - 프로필: Mina 아이덴티티 (Local Buddy 콘셉트)
  - Hero: 단일 프로필 레이아웃 (curator만 표시)
  - 홈페이지/상세시트/지도/메타데이터: 카피 전면 변경
  - 테스트 어서션 업데이트 — 11/11 통과
- [x] Mina 프로필 사진 + 파비콘 적용
- [x] GitHub 독립 리포 생성: mikefarfaraway/triphero
- [x] Google Places API로 POI 사진 고해상도 교체 (59/65장)
- [x] 멀티유저 라우트 구조 (`/mina`, `/mike`) — `data/users/registry.ts` 기반
- [x] Mike 프로필 커스터마이징 (페르소나, 맵 포스터, 파비콘)
- [x] 유저별 OG 태그 / 파비콘 / 트위터 카드 (`generateMetadata`)
- [x] 도메인 구매 및 연결: triphero.club (Cloudflare DNS + Vercel)
- [x] Vercel 프로덕션 배포 완료
- [x] Map Explorer 섹션 심플화 (Google Maps 아웃링크 중심)
- [x] 지도 썸네일 반응형 수정 (모바일 크롭 해결, PC max-w-600px)
- [x] TripHero 루트 브랜딩 메타데이터

### Backlog

- [ ] 검색 기능 추가
- [ ] 동네(neighborhood) 필터 추가
- [ ] 인앱 지도 뷰 (좌표 데이터 활용)
- [ ] 즐겨찾기/체크리스트 기능
- [ ] 추가 유저 온보딩 플로우

---

## Architecture decisions

| 결정 | 이유 |
|------|------|
| 멀티유저 동적 라우트 (`/[username]`) | 인스타그램식 개인 페이지 구조로 확장성 확보 |
| `data/users/registry.ts` 유저 레지스트리 | 유효 유저 목록 single source of truth, `generateStaticParams` 연동 |
| 유저별 CSV + profile.ts 분리 | 유저간 데이터 격리, 독립적 관리 가능 |
| guest를 optional로 변경 | Local Buddy 모델에서 guest는 불특정 외국인 방문자 |
| `whyShellLikeIt` → `localInsight` | curator의 로컬 인사이트가 콘셉트에 적합 |
| CSV → build-time transform 유지 | 65개 장소 규모에 DB 불필요, 빠른 iteration |
| Google Maps 외부 링크 유지 | 인앱 지도는 후순위, 현재는 링크로 충분 |
| Cloudflare DNS + Vercel | 빠른 배포, 자동 SSL, 글로벌 CDN |
