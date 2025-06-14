# 🛡️ InsuFit CRM

보험 설계사를 위한 맞춤형 고객관리 CRM 시스템입니다.  
가입일과 상령일을 기반으로 한 자동 알림, 보장 분석 상담 유도 기능을 통해  
유지율을 높이고, 고객과의 접점을 체계적으로 관리할 수 있도록 설계되었습니다.

---

## 📌 주요 기능

- 고객 등록 / 수정 / 삭제 / 검색
- 상령일 기준 자동 알림 (D-60, D-30, D-7)
- 가입일 기준 주기 알림 (90/180/270/365일)
- KPI 카드: 전체 고객 수, 유지율, 알림 대기 수 등
- “오늘 할 일” 리스트 제공 및 상담 전환 유도
- 실시간 알림 스트림 (Kafka or WebSocket 기반)
- 고객 통계 시각화 (상품별/연령대별/가입일별)
- 사용자 설정 (알림 조건, 채널, 템플릿 등)

---

## 🖼️ 웹 서비스 구조

├── /dashboard
│ ├── KPI Cards
│ ├── Today’s Task List
│ └── Realtime Alert Feed
│
├── /customers
│ ├── Customer List
│ └── Customer Detail View
│
├── /settings
│ ├── Alert Rules (가입일/상령일)
│ └── Notification Channel (카카오/SMS)

yaml
복사
편집

---

## ⚙️ 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | React, TypeScript, Tailwind CSS, Zustand |
| Backend | NestJS, PostgreSQL, Redis, Kafka |
| Notification | 카카오 알림톡 API, Twilio(SMS fallback) |
| 실시간 처리 | Redis Pub/Sub → WebSocket Gateway |
| 차트 | Recharts, ApexCharts |

---

## ▶️ 로컬 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/ParkjunHyukkk/insure-crm-fe.git
cd insufit-crm

# 2. 환경변수 파일 복사
cp .env.example .env

# 3. 의존성 설치
pnpm install

# 4. 프론트 / 백엔드 실행
pnpm dev         # frontend
pnpm start:api   # NestJS backend


# 1. 브랜치 생성
git checkout -b feature/이름-기능명

# 2. 작업 후 커밋
git commit -m "feat: 고객 필터 기능 추가"

# 3. PR 생성
push 후 GitHub에 Pull Request 작성
📄 라이선스
MIT License © 2025 Park Junhyuk
