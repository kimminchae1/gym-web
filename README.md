# 짐 케어 헬스&PT 홈페이지

## 프로젝트 개요

- **프로젝트명**: 짐 케어 헬스&PT 일산 탄현점
- **프로젝트 유형**: 헬스장 홍보 및 관리 웹 서비스

## 프로젝트 개요

- **기술 스택**: React, Axios, CSS, Spring Boot, MyBatis
- **주요 기능**: 회원 관리, PT 예약, 게시판, 운동기구 관리

## 시스템 아키텍처

### Frontend (REACT) 프로젝트 구조

```
src/
├── assets/                # 이미지, 아이콘
├── components/            # 공통 컴포넌트
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Button/
│   └── Layout/
├── pages/                 # 페이지 단위 컴포넌트
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Machine.jsx
│   ├── Reservation.jsx
│   ├── Board.jsx
│   └── Location.jsx
├── api/                   # Axios API 모듈
├── router/                # React Router 설정
├── styles/                # CSS
└── App.jsx
```

### Backend (Spring Boot) 패키지 구조

```
lx.gymproject.springboot
├── controller/            # 컨트롤러
├── dao/                   # 데이터 접근 객체 (MyBatis Mapper)
├── vo/                    # VO / DTO
├── interceptor/           # 인터셉터
└── configuration/         # 설정 클래스
```
