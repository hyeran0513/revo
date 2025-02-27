import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 모든 요소의 마진과 패딩 리셋 */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 링크의 기본 텍스트 장식 제거 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 이미지를 반응형으로 만들어 줌 */
  img {
    max-width: 100%;
    height: auto;
  }

  /* 리스트 스타일 제거 */
  ul,
  ol {
    list-style: none;
  }

  /* 폼 요소의 기본 테두리 제거 */
  input,
  textarea,
  button {
    border: none;
    outline: none;
  }

  /* 기본 폰트 스타일 설정 */
  body {
    font-family: ${(props) => props.theme.fonts.main};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

  /* 헤더 태그의 기본 스타일 리셋 */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 100%;
  }

  /* 포커스 스타일 설정 */
  :focus {
    outline: none;
  }
`;

export default GlobalStyle;
