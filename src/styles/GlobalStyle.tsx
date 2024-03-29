/** 
 * 전역 스타일 - 애플리케이션 레벨 스타일
 * 
 * */ 

import { createGlobalStyle } from "styled-components";
import "../static/fonts/font.css"

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  input {
    outline: none;
   }

   textarea {
    resize: none;
    outline: none;
    border: none;
   }

  body {
    font-family: "NotoSans";
  }
`;

export default GlobalStyle;