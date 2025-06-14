# 🛡️ InsuFit CRM

보험 설계사를 위한 맞춤형 고객관리 CRM 시스템입니다.  
가입일 · 상령일 기반 자동 알림과 보장 분석 상담 유도 기능으로  
**계약 유지율**을 높이고, 고객 접점을 체계적으로 관리하도록 설계되었습니다.

---

## 📌 주요 기능

- 고객 등록 / 수정 / 삭제 / 검색
- 상령일 자동 알림 (D-60 / D-30 / D-7)
- 가입일 주기 알림 (90 / 180 / 270 / 365일)
- KPI 카드: 전체 고객 수·유지율·알림 대기 수 등
- “오늘 할 일” 리스트 제공 및 상담 전환 유도
- 실시간 알림 스트림 (Kafka or WebSocket)
- 고객 통계 시각화 (상품·연령·가입일 기반)
- 사용자 설정: 알림 조건·채널·템플릿 관리

---

## 🖼️ 웹 서비스 구조

```
├── /dashboard
│   ├── KPI Cards
│   ├── Today’s Task List
│   └── Realtime Alert Feed
│
├── /customers
│   ├── Customer List
│   └── Customer Detail View
│
├── /settings
│   ├── Alert Rules (가입일 / 상령일)
│   └── Notification Channel (카카오 / SMS)
```

---

## ⚙️ 기술 스택

| 영역             | 기술                                        |
| ---------------- | ------------------------------------------- |
| **Frontend**     | React · TypeScript · Tailwind CSS · Zustand |
| **Backend**      | NestJS · PostgreSQL · Redis · Kafka         |
| **Notification** | 카카오 알림톡 API · Twilio(SMS fallback)    |
| **실시간 처리**  | Redis Pub/Sub → WebSocket Gateway           |
| **차트**         | Recharts · ApexCharts                       |

---

## 📝 커밋 메시지 규칙

### 기본 포맷

```
<타입>: <변경 요약>
```

#### 예시

```bash
feat: 고객 등록 기능 추가
fix: 상령일 계산 오류 수정
refactor: 알림 훅 리팩토링
docs: README 실행 방법 추가
```

| 타입       | 설명                        |
| ---------- | --------------------------- |
| `feat`     | 새로운 기능 추가            |
| `fix`      | 버그 수정                   |
| `refactor` | 리팩터링(기능 변경 없음)    |
| `style`    | 코드 포맷·세미콜론·공백 등  |
| `docs`     | 문서 변경                   |
| `chore`    | 설정 파일·빌드 작업 등 기타 |
| `test`     | 테스트 코드 추가 / 변경     |

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

# 4. 프론트엔드 / 백엔드 실행
pnpm dev         # frontend
pnpm start:api   # NestJS backend
```

---

## 💡 브랜치 & PR 워크플로

```bash
# 1. 기능 브랜치 생성
git checkout -b feature/이름-기능명

# 2. 작업 후 커밋
git commit -m "feat: 고객 필터 기능 추가"

# 3. 원격 푸시 및 PR 생성
git push origin feature/이름-기능명
```

---

## 📄 라이선스

MIT License © 2025 Park Junhyuk
