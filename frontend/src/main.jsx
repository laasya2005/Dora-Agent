import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Global styles
const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #FFFFFF;
    color: #1A1A1A;
    line-height: 1.5;
    min-height: 100vh;
  }

  #root {
    height: 100vh;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`

// Inject global styles
const styleElement = document.createElement('style')
styleElement.textContent = globalStyles
document.head.appendChild(styleElement)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
