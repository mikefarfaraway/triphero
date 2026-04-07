# TripHero — Mina's Seoul Guide

## Project overview

Local Buddy 가설 검증을 위한 서울 여행 가이드 웹앱.
한국인 로컬 버디 "Mina"가 방한 외국인 친구들을 위해 엄선한 Hidden Gems을 소개한다.

- **Product hypothesis**: 외국인 관광객이 한국인 Local Buddy의 큐레이션에 가치를 느끼는가?
- **Domain**: 미정 (기존 theoandsheila.xyz → 새 도메인 필요)
- **Repo**: https://github.com/mikefarfaraway/triphero

## Tech stack

- Next.js 15 / React 19 / TypeScript (strict)
- Tailwind CSS 3 + Framer Motion
- Zod (runtime schema validation)
- Vitest + Testing Library (unit) / Playwright (E2E, iPhone 13)
- Data: CSV → build-time transform (no database)

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm test             # Vitest unit tests
npm run test:e2e     # Playwright E2E tests
```

## Architecture

```
app/            → Next.js pages & API routes
components/     → Client components (Hero, HomePage, SpotCard, SpotDetailSheet, SpotMap, SpotVisual)
data/           → Static data (profile.ts, spots.csv)
lib/            → Content processing & presentation helpers
types/          → TypeScript type definitions
scripts/        → Utility scripts (e.g. fetch-place-photos.ts)
tests/          → Vitest unit tests
e2e/            → Playwright E2E tests
public/         → Static assets (images, favicon)
```

## Data flow

`data/spots.csv` → `lib/content.ts` (parse, validate with Zod, infer vibeTags/bestTime/priceLevel) → API routes / page props → components

## Key conventions

- 모든 spot 데이터는 `spots.csv`를 single source of truth로 사용
- 프로필/브랜딩 정보는 `data/profile.ts`에서 관리
- `localInsight` 필드: 각 장소에 대한 Mina의 로컬 인사이트 (CSV의 reason 컬럼)
- `ProfileBundle.guest`는 optional — 현재 Mina(curator) 단일 프로필로 운영
- 이미지가 없는 장소는 카테고리 기반 팔레트 그라디언트 폴백

## Environment variables

```
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY  — Google Maps embed용
GOOGLE_MAPS_PLACES_API_KEY             — Places API (사진 다운로드 스크립트용)
```

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
