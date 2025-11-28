import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { store } from './store/index.js'
import { Provider } from "react-redux";

/**
 * main.jsx
 * Application entry point - mounts React app to DOM.
 * 
 * Setup:
 * - StrictMode: Enables additional dev checks and warnings
 * - Redux Provider: Makes store available to all components
 * - Renders into #root element (defined in index.html)
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}><App /></Provider>
  </StrictMode>,
)
