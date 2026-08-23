import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

import { ThemeProvider } from './ThemeContext.jsx'
import { AuthProvider } from './AuthContext.jsx'
import { ProfileProvider } from './ProfileContext.jsx'
import { ToastProvider } from './components/Toast.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ProfileProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProfileProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
