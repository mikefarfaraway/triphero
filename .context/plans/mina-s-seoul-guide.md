# Mina's Seoul Guide - 전환 플랜

## Context

현재 "Theo's Seoul Guide"는 Theo가 여자친구 Sheila를 위해 만든 개인적인 서울 가이드 앱이다. 이를 **외국인 관광객 대상 Local Buddy 가설 검증**을 위해 "Mina's Seoul Guide"로 전환한다.

**핵심 내러티브 변경**: 커플 로맨스 → 로컬 버디가 외국인 친구들에게 추천하는 Hidden Gems

- FROM: "Theo가 여자친구 Sheila를 위해 만든 서울 가이드"
- TO: "한국인 로컬 버디 Mina가 방한 외국인 친구들을 위해 엄선한 서울 Hidden Gems"

---

## 설계 결정사항

### 1. Hero 섹션: 단일 프로필 (Mina만 표시)
기존 2인 카드(guest + curator)에서 Mina 1인 카드로 변경. "guest"는 더 이상 특정인이 아닌 불특정 외국인 방문자이므로, guest 카드를 제거하고 curator(Mina) 카드를 확장 표시.

### 2. 필드명: `whyShellLikeIt` → `localInsight`
"Mina의 로컬 인사이트"라는 프레이밍이 Local Buddy 콘셉트에 가장 적합. 디테일 시트의 라벨도 "Mina's local insight"로 변경.

### 3. Google Maps URL
기존 Theo의 My Maps URL을 유지하되, 카피만 변경. 추후 Mina 전용 지도 생성 시 URL만 교체하면 됨.

### 4. 프로필 이미지
Mina 캐릭터의 portrait 이미지가 필요. 우선 기존 이미지를 placeholder로 활용하고, 실제 이미지는 별도 준비.

---

## 작업 순서

### Step 1: 타입 & 스키마 변경 (Foundation)
모든 곳에서 참조하는 기반이므로 먼저 수행.

**`types/content.ts`**
- Line 22: `guest: PersonProfile` → `guest?: PersonProfile` (optional)
- Line 43: `whyShellLikeIt: string` → `localInsight: string`

**`lib/content.ts`**
- Zod 스키마에서 `whyShellLikeIt` → `localInsight`
- CSV 매핑에서 `whyShellLikeIt: row.reason` → `localInsight: row.reason`
- `profileBundleSchema`에서 guest를 optional로 변경

### Step 2: 프로필 데이터 변경 (New Identity)

**`data/profile.ts`** - 전체 재작성
```
siteTitle: "Mina's Seoul Edit"
subtitle: "A local Korean's handpicked hidden gems for visiting friends."
introNote: "These are the Seoul spots I'd actually take you to — soulful food, quieter hanok corners, and hidden gems that rarely show up in tourist guides. Think of this as borrowing a local friend's personal map."
guest: (제거)
curator: {
  name: "Mina",
  role: "Your local Seoul friend",
  shortBio: "Born and raised in Seoul. Years of collecting the places she'd actually bring friends to — not the obvious tourist picks, but the spots that make Seoul feel like Seoul.",
  heroImage: "/images/people/mina-portrait.jpg",
  accentColors: { primary: "#0F3D3E", secondary: "#C3F4D6" }
}
```

### Step 3: Hero 컴포넌트 (Single-Profile Layout)

**`components/hero.tsx`**
- guest가 없을 때 curator 카드만 full-width로 렌더링하도록 조건부 처리
- Badge: "Private Seoul guide" → "Local Seoul guide"
- "What this guide optimizes for" 리스트 수정:
  - "A better first Seoul trip for a Chinese visitor..." → "A better first Seoul trip for visitors who care about taste and atmosphere"
  - "...personally collected by Theo" → dynamic `${profile.curator.name}`

### Step 4: 홈페이지 카피 변경

**`components/home-page.tsx`**
- Line 91: "A Seoul guide, made with Sheila in mind" → "A Seoul guide, made by a local"
- Line 94: "Theo saved the side of Seoul..." → "The side of Seoul a local friend would actually show you"
- Lines 97-100: Sheila/China/Theo 참조 전부 → 범용 외국인 방문자 맥락으로 재작성

### Step 5: 장소 상세 시트

**`components/spot-detail-sheet.tsx`**
- Line 110: "Why Sheila will like it" → "Mina's local insight"
- Line 111: `spot.whyShellLikeIt` → `spot.localInsight`
- Line 115: `alt="Theo portrait"` → dynamic `` alt={`${profileBundleData.curator.name} portrait`} ``

### Step 6: 지도 컴포넌트

**`components/spot-map.tsx`**
- Line 23: "Theo's Google Map..." → "Mina's Seoul Map, as a quick preview"
- Line 27: "Theo's full public Google Map" → "Mina's full Seoul map"
- Line 41: "Open Theo's map" → "Open Mina's map"

### Step 7: SEO 메타데이터

**`app/layout.tsx`**
- title: "Mina's Seoul Guide — Hidden Gems from a Local Friend"
- description: "A local Korean's handpicked hidden gems. Your friend Mina's personal Seoul guide."
- applicationName: "Mina's Seoul Edit"
- OG/Twitter 필드 전부 동일하게 업데이트
- metadataBase URL은 임시 유지 (도메인 확정 후 변경)
- OG image alt text 업데이트

### Step 8: 이미지 에셋

**`public/images/people/`**
- `mina-portrait.jpg` 추가 (우선 placeholder로 기존 이미지 복사 또는 AI 생성)
- `mina-portrait.svg` 추가
- 기존 Theo/Sheila 이미지는 삭제하지 않고 유지 (참조 없으면 무해)

### Step 9: 테스트 업데이트

**`tests/fixtures.ts`**
- siteTitle → "Mina's Seoul Edit"
- guest 필드 제거
- curator → name: "Mina", heroImage: mina 경로
- `whyShellLikeIt` → `localInsight`

**`tests/hero.test.tsx`**
- "Sheila's Seoul Edit" → "Mina's Seoul Edit"
- "Sheila" 검증 제거 (guest 없음)
- "Theo" → "Mina"

**`tests/content.test.ts`**
- `toContain("Sheila")` → `toContain("Mina")`

**`tests/spot-detail-sheet.test.tsx`**
- "Theo portrait" → "Mina portrait"

**`e2e/mobile-flow.spec.ts`**
- "Sheila's Seoul Edit" → "Mina's Seoul Edit"

---

## 수정 대상 파일 목록 (11개)

| 파일 | 변경 범위 |
|------|-----------|
| `types/content.ts` | 필드명 변경, guest optional |
| `lib/content.ts` | Zod 스키마, CSV 매핑 |
| `data/profile.ts` | 전체 재작성 |
| `components/hero.tsx` | 조건부 레이아웃 + 카피 |
| `components/home-page.tsx` | 카피 전면 변경 |
| `components/spot-detail-sheet.tsx` | 필드명 + 라벨 + alt |
| `components/spot-map.tsx` | 카피 3곳 |
| `app/layout.tsx` | 메타데이터 전체 |
| `tests/fixtures.ts` | 테스트 데이터 |
| `tests/hero.test.tsx`, `content.test.ts`, `spot-detail-sheet.test.tsx` | 어서션 |
| `e2e/mobile-flow.spec.ts` | E2E 어서션 |

---

## 검증 방법

1. **타입 체크**: `npx tsc --noEmit` — 컴파일 에러 없음 확인
2. **단위 테스트**: `npx vitest run` — 모든 테스트 통과
3. **개발 서버**: `npm run dev` → 브라우저에서 확인
   - Hero에 Mina 프로필만 표시되는지
   - 장소 상세 시트에서 "Mina's local insight" 표시되는지
   - 지도 섹션에서 "Mina's Seoul Map" 카피 확인
   - Theo/Sheila 문구가 어디에도 남아있지 않은지
4. **E2E 테스트**: `npx playwright test` — 모바일 플로우 통과
5. **전체 텍스트 검색**: `grep -r "Theo\|Sheila\|whyShell" --include="*.ts" --include="*.tsx"` — 잔여 참조 없음 확인
