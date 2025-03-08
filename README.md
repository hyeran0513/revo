# REVO 프로젝트 개요

**REVO**는 'Re: 다시'와 'Vo: 선택하다(Vote)'의 조합으로,  
가치를 다시 선택하는 중고 기기 마켓 플랫폼입니다.  
이 프로젝트는 **React**와 **Firebase**를 사용하여 개발되었습니다.

---

### 📍 사용 기술

| 기술                     | 설명                                              |
|--------------------------|---------------------------------------------------|
| **React**                | 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리 |
| **Firebase**             | 인증, 데이터베이스, 호스팅 등 백엔드 서비스 제공 |
| **react-router-dom**     | 페이지 간 이동을 위한 라우팅 라이브러리          |
| **react-query**          | 서버 상태 관리 및 데이터 fetching 라이브러리    |
| **styled-components**    | 컴포넌트 스타일링을 위한 라이브러리               |
| **useReducer**           | 복잡한 상태 관리를 위한 React hook              |
| **redux**                | 글로벌 상태 관리를 위한 라이브러리               |
| **contextAPI**           | 컴포넌트 트리 내에서 데이터를 전달하는 React API |

---

### 📍 프로젝트 설치 라이브러리

| 라이브러리                       | 설치 명령어                              |
|----------------------------------|------------------------------------------|
| `react-router-dom` (버전 6)      | `yarn add react-router-dom@6`            |
| `styled-components`              | `yarn add styled-components`            |
| `swiper`                         | `yarn add swiper`                       |
| `@tanstack/react-query`          | `yarn add @tanstack/react-query`        |
| `@reduxjs/toolkit`               | `yarn add @reduxjs/toolkit react-redux` |
| `@toast-ui/editor`               | `yarn add @toast-ui/editor`             |
| `@toast-ui/react-editor`         | `yarn add @toast-ui/react-editor`       |
| `firebase`                       | `yarn add firebase`                     |
| `react-icons`                    | `yarn add react-icons`                  |
| `react-loading-spinner`          | `yarn add react-loader-spinner`         |

---

### 📍 주요 기능

1. **메인 페이지**  
   인기 모바일, 태블릿 등의 제품을 슬라이드 형태로 확인할 수 있습니다.

2. **상품 목록**  
   모바일, 태블릿, 오디오, PC 등 다양한 카테고리 제공.  
   필터 기능을 통해 가격, 상태 등 원하는 조건으로 상품을 검색할 수 있습니다.

3. **상품 상세 페이지**  
   상품의 상세 정보를 확인하고, 판매자와 직접 소통할 수 있는 채팅 버튼이 제공됩니다.

4. **채팅 페이지**  
   거래 중인 상품들의 채팅 목록을 확인하고 실시간으로 채팅할 수 있습니다.

5. **찜 목록 페이지**  
   찜한 상품을 확인하고 관리할 수 있습니다.

6. **마이페이지**  
   판매할 상품을 업로드하고, 내가 올린 상품을 조회할 수 있습니다.

7. **다크모드 / 라이트모드 전환**  
   헤더의 테마 아이콘 클릭으로 손쉽게 테마를 전환하며, 눈의 피로를 줄여줍니다.
