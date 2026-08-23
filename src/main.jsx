import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

import { ThemeProvider } from './ThemeContext.jsx'
import { AuthProvider } from './AuthContext.jsx'
import { ProfileProvider } from './ProfileContext.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { LanguageProvider } from './LanguageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <LanguageProvider>
          <AuthProvider>
            <ProfileProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ProfileProvider>
          </AuthProvider>
        </LanguageProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
