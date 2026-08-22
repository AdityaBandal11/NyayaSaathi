import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// 1. IMPORT YOUR CSS RIGHT HERE!
import './index.css' 

// 2. Import your providers
import { ProfileProvider } from './ProfileContext.jsx' 
import { ToastProvider } from './components/Toast.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <ProfileProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProfileProvider>
    </ToastProvider>
  </React.StrictMode>,
)