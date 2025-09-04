import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ dark: boolean }>`
  * { box-sizing: border-box; }
  html, body, #__next { height: 100%; }
  body {
    margin: 0;
    padding: 28px;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, sans-serif;
    background: ${({ dark }) => (dark ? '#0F1115' : '#F3F4F6')};
    color: ${({ dark }) => (dark ? '#E7E9EE' : '#0F172A')};
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
    transition: background .25s ease, color .25s ease;
  }

  ::selection { background: rgba(99,102,241,.25); }

  /* Scrollbar – delikatny */
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb {
    background: ${({ dark }) => (dark ? '#1C1E24' : '#D2D6DF')};
    border-radius: 8px;
  }
`