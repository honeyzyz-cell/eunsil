# 🏥 인생 간호사 — 백엔드 개발 기획서

> **프로젝트명**: 최고은 | 인생 간호사  
> **현재 스택**: Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion  
> **작성일**: 2026-03-08  
> **목적**: 기존 정적 랜딩 페이지를 동적 풀스택 웹 애플리케이션으로 고도화

---

## 📋 목차

1. [현재 상태 분석](#1-현재-상태-분석)
2. [고도화 목표](#2-고도화-목표)
3. [기술 스택 선정](#3-기술-스택-선정)
4. [백엔드 아키텍처 설계](#4-백엔드-아키텍처-설계)
5. [데이터베이스 설계](#5-데이터베이스-설계)
6. [API 설계](#6-api-설계)
7. [관리자 대시보드 기획](#7-관리자-대시보드-기획)
8. [인증 및 보안](#8-인증-및-보안)
9. [배포 및 인프라](#9-배포-및-인프라)
10. [개발 일정 로드맵](#10-개발-일정-로드맵)
11. [디렉토리 구조](#11-디렉토리-구조)

---

## 1. 현재 상태 분석

### 📂 기존 프로젝트 구조

```
간호사명함2/
├── app/
│   ├── globals.css          # 디자인 토큰 (oklch 컬러 시스템)
│   ├── layout.tsx           # 루트 레이아웃 (Noto Serif/Sans KR 폰트)
│   └── page.tsx             # 메인 랜딩 페이지
├── components/
│   ├── landing/
│   │   ├── hero-section.tsx       # 히어로 (프로필 + 소셜링크)
│   │   ├── philosophy-section.tsx # 철학 소개
│   │   ├── spectrum-section.tsx   # 전문 영역 4개 소개
│   │   ├── vision-section.tsx     # 커뮤니티 비전
│   │   ├── connect-section.tsx    # 소셜 연결 카드
│   │   └── footer-section.tsx     # 푸터
│   ├── ui/                  # shadcn/ui 컴포넌트 (50+개)
│   └── theme-provider.tsx
├── hooks/
├── lib/
├── public/                  # 아이콘, 파비콘
└── styles/
```

### 🔍 현재 한계점

| 구분 | 현재 상태 | 문제점 |
|------|----------|--------|
| **콘텐츠 관리** | 하드코딩된 텍스트 | 수정 시 코드 배포 필요 |
| **문의/예약** | 카카오톡 링크만 존재 | 고객 데이터 수집 불가 |
| **방문자 분석** | Vercel Analytics만 사용 | 세부 행동 분석 불가 |
| **서비스 상세** | 4개 서비스 요약만 표시 | 상세 정보/사례 제공 불가 |
| **블로그/콘텐츠** | 외부 플랫폼 링크만 연결 | 자체 콘텐츠 허브 없음 |
| **소셜 프루프** | 없음 | 신뢰도 구축 어려움 |

---

## 2. 고도화 목표

### 🎯 핵심 목표

```
정적 명함 사이트 → 고객 유입·관리·전환이 가능한 퍼스널 브랜드 플랫폼
```

### 📌 기능별 우선순위

| 우선순위 | 기능 | 비즈니스 가치 |
|---------|------|-------------|
| 🔴 P0 | 상담 예약/문의 폼 | 고객 리드 수집 |
| 🔴 P0 | 관리자 대시보드 (CMS) | 콘텐츠 자체 관리 |
| 🟡 P1 | 블로그/컬럼 시스템 | SEO · 전문성 어필 |
| 🟡 P1 | 서비스 상세 페이지 | 전환율 향상 |
| 🟢 P2 | 후기/추천사 시스템 | 소셜 프루프 |
| 🟢 P2 | 뉴스레터 구독 | 리텐션 채널 구축 |
| ⚪ P3 | 온라인 예약 시스템 | 상담 자동화 |
| ⚪ P3 | 회원 전용 콘텐츠 | 커뮤니티 구축 |

---

## 3. 기술 스택 선정

### 🛠 추천 기술 스택

| 영역 | 기술 | 선정 이유 |
|------|------|----------|
| **프레임워크** | Next.js 16 (App Router) | 기존 스택 유지, SSR/SSG 지원 |
| **ORM** | Prisma | TypeScript 친화적, 직관적 스키마 |
| **데이터베이스** | PostgreSQL (Supabase) | 무료 티어, 실시간 기능, Auth 내장 |
| **인증** | NextAuth.js v5 | 관리자 로그인, 소셜 로그인 |
| **파일 스토리지** | Vercel Blob 또는 Supabase Storage | 이미지 업로드 (프로필, 블로그) |
| **이메일** | Resend | 문의 알림, 뉴스레터 발송 |
| **유효성 검증** | Zod (기존 설치됨) | 폼 + API 양방향 검증 |
| **상태관리** | React Hook Form (기존 설치됨) | 폼 관리 |
| **배포** | Vercel | 기존 환경 유지 |

### 💡 스택 선정 원칙

- ✅ **기존 스택과의 호환성** — Next.js, TypeScript 생태계 유지
- ✅ **비용 최소화** — 무료 티어 우선 활용
- ✅ **러닝 커브 최소화** — 문서화 잘 된 인기 라이브러리
- ✅ **확장성** — 향후 기능 추가에 유연한 구조

---

## 4. 백엔드 아키텍처 설계

### 🏗 전체 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    클라이언트 (브라우저)                      │
│  Landing Page · Blog · Service Pages · Admin Dashboard  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Next.js App Router                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Pages   │  │  Layout  │  │  Server Components   │  │
│  │  (SSR)   │  │          │  │  (데이터 페칭)         │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              API Routes (/api/*)                  │   │
│  │  /api/contact  /api/blog  /api/admin  /api/upload │   │
│  └──────────────────────┬───────────────────────────┘   │
└─────────────────────────┼───────────────────────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
     ┌──────────┐  ┌──────────┐  ┌──────────┐
     │  Prisma  │  │  Resend  │  │  Vercel  │
     │   ORM    │  │  (Email) │  │   Blob   │
     └────┬─────┘  └──────────┘  └──────────┘
          │
          ▼
   ┌──────────────┐
   │  PostgreSQL  │
   │  (Supabase)  │
   └──────────────┘
```

### 📁 API Route 구조

```
app/
├── api/
│   ├── contact/
│   │   └── route.ts          # POST: 문의/상담 요청 접수
│   ├── blog/
│   │   ├── route.ts          # GET: 글 목록 / POST: 글 작성
│   │   └── [slug]/
│   │       └── route.ts      # GET: 글 상세 / PUT: 수정 / DELETE: 삭제
│   ├── testimonials/
│   │   └── route.ts          # GET: 후기 목록 / POST: 후기 등록
│   ├── newsletter/
│   │   └── route.ts          # POST: 구독 신청 / DELETE: 구독 해지
│   ├── upload/
│   │   └── route.ts          # POST: 이미지 업로드
│   └── admin/
│       ├── stats/
│       │   └── route.ts      # GET: 대시보드 통계
│       └── settings/
│           └── route.ts      # GET/PUT: 사이트 설정
```

---

## 5. 데이터베이스 설계

### 📊 ERD (Entity Relationship Diagram)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│    User      │     │   BlogPost   │     │   Testimonial    │
├──────────────┤     ├──────────────┤     ├──────────────────┤
│ id           │     │ id           │     │ id               │
│ email        │◄────│ authorId     │     │ name             │
│ name         │     │ title        │     │ content          │
│ role         │     │ slug         │     │ rating           │
│ image        │     │ content      │     │ serviceType      │
│ createdAt    │     │ excerpt      │     │ isApproved       │
│ updatedAt    │     │ coverImage   │     │ createdAt        │
└──────────────┘     │ category     │     └──────────────────┘
                     │ tags         │
                     │ isPublished  │     ┌──────────────────┐
                     │ publishedAt  │     │   Newsletter     │
                     │ views        │     ├──────────────────┤
                     │ createdAt    │     │ id               │
                     │ updatedAt    │     │ email            │
                     └──────────────┘     │ name             │
                                          │ isActive         │
┌──────────────────┐                      │ subscribedAt     │
│   ContactForm    │                      │ unsubscribedAt   │
├──────────────────┤                      └──────────────────┘
│ id               │
│ name             │     ┌──────────────────┐
│ phone            │     │   SiteSettings   │
│ email            │     ├──────────────────┤
│ serviceType      │     │ id               │
│ message          │     │ heroTitle        │
│ status           │     │ heroSubtitle     │
│ isRead           │     │ profileImage     │
│ createdAt        │     │ philosophyItems  │ (JSON)
└──────────────────┘     │ socialLinks      │ (JSON)
                         │ footerText       │
                         │ updatedAt        │
                         └──────────────────┘
```

### 📝 Prisma 스키마 설계

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  EDITOR
}

enum ContactStatus {
  NEW         // 새 문의
  IN_PROGRESS // 처리 중
  COMPLETED   // 완료
  ARCHIVED    // 보관
}

enum ServiceType {
  NURSING     // 간호사
  INSURANCE   // 보험설계
  MARKETING   // 브랜드 블로그 & 플레이스
  WELLNESS    // 웰니스 솔루션
  OTHER       // 기타
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(ADMIN)
  image     String?
  posts     BlogPost[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  excerpt     String?
  coverImage  String?
  category    String
  tags        String[] @default([])
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  views       Int      @default(0)
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ContactForm {
  id          String        @id @default(cuid())
  name        String
  phone       String?
  email       String?
  serviceType ServiceType
  message     String        @db.Text
  status      ContactStatus @default(NEW)
  isRead      Boolean       @default(false)
  notes       String?       @db.Text  // 관리자 메모
  createdAt   DateTime      @default(now())
}

model Testimonial {
  id          String      @id @default(cuid())
  name        String
  content     String      @db.Text
  rating      Int         @default(5)   // 1-5
  serviceType ServiceType
  isApproved  Boolean     @default(false)
  createdAt   DateTime    @default(now())
}

model Newsletter {
  id             String    @id @default(cuid())
  email          String    @unique
  name           String?
  isActive       Boolean   @default(true)
  subscribedAt   DateTime  @default(now())
  unsubscribedAt DateTime?
}

model SiteSettings {
  id             String   @id @default("default")
  heroTitle      String   @default("당신의 인생을 간호합니다.")
  heroSubtitle   String   @default("간호사 · 보험설계사 · 웰니스 전문가")
  profileImage   String?
  philosophyItems Json?    // JSON 배열
  socialLinks     Json?    // JSON 배열
  footerText     String?
  updatedAt      DateTime @updatedAt
}
```

---

## 6. API 설계

### 📡 REST API 엔드포인트

#### 문의/상담 (Contact)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| `POST` | `/api/contact` | 상담 문의 접수 | ❌ |
| `GET` | `/api/contact` | 문의 목록 조회 | 🔒 Admin |
| `PATCH` | `/api/contact/[id]` | 문의 상태 변경 | 🔒 Admin |
| `DELETE` | `/api/contact/[id]` | 문의 삭제 | 🔒 Admin |

#### 블로그 (Blog)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| `GET` | `/api/blog` | 게시글 목록 (페이지네이션) | ❌ |
| `GET` | `/api/blog/[slug]` | 게시글 상세 | ❌ |
| `POST` | `/api/blog` | 새 글 작성 | 🔒 Admin |
| `PUT` | `/api/blog/[slug]` | 글 수정 | 🔒 Admin |
| `DELETE` | `/api/blog/[slug]` | 글 삭제 | 🔒 Admin |

#### 후기 (Testimonials)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| `GET` | `/api/testimonials` | 승인된 후기 목록 | ❌ |
| `POST` | `/api/testimonials` | 후기 작성 | ❌ |
| `PATCH` | `/api/testimonials/[id]` | 후기 승인/거절 | 🔒 Admin |

#### 뉴스레터 (Newsletter)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| `POST` | `/api/newsletter` | 구독 신청 | ❌ |
| `DELETE` | `/api/newsletter/[email]` | 구독 해지 | ❌ |
| `GET` | `/api/newsletter` | 구독자 목록 | 🔒 Admin |

#### 관리자 (Admin)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| `GET` | `/api/admin/stats` | 대시보드 통계 | 🔒 Admin |
| `GET` | `/api/admin/settings` | 사이트 설정 조회 | 🔒 Admin |
| `PUT` | `/api/admin/settings` | 사이트 설정 수정 | 🔒 Admin |
| `POST` | `/api/upload` | 이미지 업로드 | 🔒 Admin |

### 📨 API 응답 형식

```typescript
// 성공 응답
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// 에러 응답
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// 페이지네이션 응답
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
```

---

## 7. 관리자 대시보드 기획

### 📊 대시보드 페이지 구조

```
/admin
├── /                   # 대시보드 메인 (통계 요약)
├── /contacts           # 문의 관리
├── /blog
│   ├── /               # 글 목록
│   ├── /new            # 새 글 작성
│   └── /[slug]/edit    # 글 수정
├── /testimonials       # 후기 관리 (승인/거절)
├── /newsletter         # 구독자 관리
└── /settings           # 사이트 설정 (콘텐츠 편집)
```

### 🖥 대시보드 메인 화면 구성

| 위젯 | 표시 내용 |
|-------|---------|
| **새 문의** | 읽지 않은 문의 건수 + 최근 5건 |
| **방문자 통계** | 일/주/월 방문자 트렌드 |
| **블로그 성과** | 총 게시글 수, 총 조회수, 인기 글 Top 3 |
| **구독자** | 총 구독자 수, 이번 주 신규 구독 |
| **후기** | 미승인 후기 건수 |

---

## 8. 인증 및 보안

### 🔐 인증 전략

```
┌─────────────────────────────────────┐
│         NextAuth.js v5              │
│                                     │
│  ┌───────────┐  ┌───────────────┐  │
│  │ 이메일/PW  │  │ Google OAuth  │  │
│  │  로그인    │  │   (선택사항)   │  │
│  └───────────┘  └───────────────┘  │
│                                     │
│  → JWT 기반 세션                     │
│  → /admin/* 경로 보호               │
│  → middleware.ts로 라우트 가드       │
└─────────────────────────────────────┘
```

### 🛡 보안 체크리스트

- [ ] API Rate Limiting (문의 폼 스팸 방지)
- [ ] CSRF 토큰 적용
- [ ] 입력값 서버 사이드 Zod 검증
- [ ] SQL Injection 방지 (Prisma 파라미터 바인딩)
- [ ] XSS 방지 (블로그 콘텐츠 새니타이징)
- [ ] 이미지 업로드 파일 타입/사이즈 제한
- [ ] 환경 변수로 민감 정보 관리
- [ ] CORS 설정

---

## 9. 배포 및 인프라

### 🚀 배포 파이프라인

```
 코드 작업 → Git Push → Vercel 자동 배포
                │
                ├── Preview (PR 브랜치)
                └── Production (main 브랜치)
```

### 🌐 환경 변수 관리

```env
# .env.local (예시)

# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://your-domain.com"

# Email (Resend)
RESEND_API_KEY="re_..."

# File Upload
BLOB_READ_WRITE_TOKEN="..."

# Admin
ADMIN_EMAIL="admin@example.com"
```

### 💰 예상 인프라 비용

| 서비스 | 플랜 | 월 비용 |
|--------|------|---------|
| Vercel | Hobby (무료) | $0 |
| Supabase DB | Free Tier | $0 |
| Resend (이메일) | Free (100건/일) | $0 |
| Vercel Blob | Free (부분) | $0 |
| **합계** | | **$0 (무료 시작)** |

> 💡 트래픽이 늘어나면 Vercel Pro ($20/mo), Supabase Pro ($25/mo) 업그레이드 고려

---

## 10. 개발 일정 로드맵

### 📅 Phase 1 — 기반 구축 (1~2주)

```
Week 1-2: 백엔드 인프라 셋업
├── ✅ Prisma + PostgreSQL 연동
├── ✅ NextAuth.js 인증 설정
├── ✅ 관리자 계정 생성
├── ✅ API 미들웨어 (인증, 에러핸들링)
└── ✅ 기본 API 라우트 구조
```

### 📅 Phase 2 — 핵심 기능 (2~3주)

```
Week 3-4: 문의 시스템 + CMS
├── 📝 상담 문의 폼 (프론트 + API)
├── 📝 문의 알림 이메일 발송
├── 📝 관리자 대시보드 UI
├── 📝 사이트 설정 CMS (콘텐츠 관리)
└── 📝 문의 관리 페이지

Week 5: 블로그 시스템
├── 📝 WYSIWYG 에디터 연동
├── 📝 블로그 목록/상세 페이지
├── 📝 카테고리 & 태그 필터링
└── 📝 SEO 메타데이터 자동 생성
```

### 📅 Phase 3 — 확장 기능 (1~2주)

```
Week 6-7: 부가 기능
├── 📝 후기/추천사 시스템
├── 📝 뉴스레터 구독
├── 📝 서비스 상세 페이지 (4개)
└── 📝 이미지 업로드 & 관리
```

### 📅 Phase 4 — 고도화 (선택)

```
향후: 고도화 기능
├── 🔮 온라인 예약 캘린더
├── 🔮 회원 전용 콘텐츠
├── 🔮 카카오 알림톡 연동
└── 🔮 AI 챗봇 (FAQ 자동 응답)
```

---

## 11. 디렉토리 구조

### 📂 고도화 후 목표 구조

```
간호사명함2/
├── app/
│   ├── (main)/                    # 메인 사이트 그룹
│   │   ├── layout.tsx
│   │   ├── page.tsx               # 랜딩 페이지
│   │   ├── blog/
│   │   │   ├── page.tsx           # 블로그 목록
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # 블로그 상세
│   │   ├── services/
│   │   │   ├── page.tsx           # 서비스 전체 보기
│   │   │   └── [type]/
│   │   │       └── page.tsx       # 서비스 상세
│   │   └── contact/
│   │       └── page.tsx           # 문의하기 페이지
│   │
│   ├── admin/                     # 관리자 대시보드
│   │   ├── layout.tsx             # 관리자 레이아웃 (사이드바)
│   │   ├── page.tsx               # 대시보드 메인
│   │   ├── contacts/
│   │   │   └── page.tsx           # 문의 관리
│   │   ├── blog/
│   │   │   ├── page.tsx           # 글 목록
│   │   │   ├── new/
│   │   │   │   └── page.tsx       # 새 글 작성
│   │   │   └── [slug]/
│   │   │       └── edit/
│   │   │           └── page.tsx   # 글 수정
│   │   ├── testimonials/
│   │   │   └── page.tsx           # 후기 관리
│   │   ├── newsletter/
│   │   │   └── page.tsx           # 구독자 관리
│   │   └── settings/
│   │       └── page.tsx           # 사이트 설정
│   │
│   ├── api/                       # API 라우트
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── blog/
│   │   │   ├── route.ts
│   │   │   └── [slug]/
│   │   │       └── route.ts
│   │   ├── testimonials/
│   │   │   └── route.ts
│   │   ├── newsletter/
│   │   │   └── route.ts
│   │   ├── upload/
│   │   │   └── route.ts
│   │   └── admin/
│   │       ├── stats/route.ts
│   │       └── settings/route.ts
│   │
│   ├── login/
│   │   └── page.tsx               # 관리자 로그인
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── landing/                   # 기존 랜딩 컴포넌트
│   ├── admin/                     # 관리자 전용 컴포넌트
│   │   ├── sidebar.tsx
│   │   ├── stats-card.tsx
│   │   ├── contact-table.tsx
│   │   ├── blog-editor.tsx
│   │   └── image-uploader.tsx
│   ├── blog/                      # 블로그 컴포넌트
│   │   ├── blog-card.tsx
│   │   ├── blog-list.tsx
│   │   └── blog-content.tsx
│   ├── forms/                     # 폼 컴포넌트
│   │   ├── contact-form.tsx
│   │   ├── newsletter-form.tsx
│   │   └── testimonial-form.tsx
│   └── ui/                        # 기존 shadcn/ui
│
├── lib/
│   ├── prisma.ts                  # Prisma 클라이언트
│   ├── auth.ts                    # NextAuth 설정
│   ├── email.ts                   # 이메일 유틸
│   ├── upload.ts                  # 파일 업로드 유틸
│   ├── validations/               # Zod 스키마
│   │   ├── contact.ts
│   │   ├── blog.ts
│   │   └── newsletter.ts
│   └── utils.ts                   # 기존 유틸리티
│
├── prisma/
│   ├── schema.prisma              # DB 스키마
│   ├── seed.ts                    # 초기 데이터
│   └── migrations/                # DB 마이그레이션
│
├── middleware.ts                   # 인증 미들웨어
├── hooks/
├── public/
├── styles/
├── .env.local                     # 환경 변수
├── package.json
└── tsconfig.json
```

---

## 📌 다음 단계

1. **기획서 검토**: 이 기획서 내용을 검토하고 원하는 기능의 우선순위를 확정합니다.
2. **Phase 1 시작**: 확정된 내용에 따라 백엔드 인프라부터 구축을 시작합니다.
3. **단계별 피드백**: 각 Phase 완료 후 리뷰를 진행합니다.

> ⚠️ 이 기획서는 초안이며, 오너분의 비즈니스 요구사항에 맞게 조정이 필요합니다.  
> 특히 **어떤 기능을 먼저 개발할지**, **추가하거나 제거할 기능이 있는지** 피드백 부탁드립니다.
