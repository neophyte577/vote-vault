import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

const splash = document.getElementById('splash')
if (splash) splash.remove()

const noise = document.getElementById('noise-overlay')
if (noise) noise.remove()