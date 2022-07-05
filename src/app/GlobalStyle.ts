import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: none;
    touch-action: manipulation;
  }

  body {
    margin: 0;
    word-break: break-word;
    font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
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
    color: ${(props) => props.theme.hoverColor};
  }

  // =============================================滚动条===========================================
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px ${(props) => props.theme.shadowColor};
    background-color: transparent;
    border-radius: 8px;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar:horizontal {
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${(props) => props.theme.shadowColor};
  }

  // ===============================================选择文字========================================
  ::selection {
    color: ${(props) => props.theme.foregroundColor};
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

export default GlobalStyle;
