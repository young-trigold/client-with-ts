import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: none;
  }

  body {
    margin: 0;
    word-break: break-word;
    font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    white-space: normal;
  }

  // ====================================链接==================================================
  a {
    color: ${(props) => props.theme.textColor};
    text-decoration: none;
  }

  a:hover {
    color: ${(props) => props.theme.secondColor};
  }

  // =============================================滚动条===========================================
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px rgba(0,0,0,0.3);
    background-color: transparent;
    border-radius: 8px;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #AAA;
    border-radius: 8px;
    background: linear-gradient(90deg, ${(props) => props.theme.surfaceColor}, ${(props) =>
  props.theme.backgroundColor});
  }

  ::-webkit-scrollbar-thumb:horizontal {
    background: linear-gradient(180deg, ${(props) => props.theme.surfaceColor}, ${(props) =>
  props.theme.backgroundColor});
  }

  // ===============================================选择文字========================================
  body::-webkit-scrollbar {
    display: none;
  }

  ::selection {
    color: initial;
    background-color: #2ecc71;
  }
`;

export default GlobalStyle;
