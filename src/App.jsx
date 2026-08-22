import { useState } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import Sidebar from './components/Sidebar.jsx'
import MobileNav from './components/MobileNav.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { useProfile } from './ProfileContext.jsx' 

import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Assistant from './pages/Assistant.jsx'
import Schemes from './pages/Schemes.jsx'
import RTIAssistant from './pages/RTIAssistant.jsx'
import Documents from './pages/Documents.jsx'
import Applications from './pages/Applications.jsx'
import Saved from './pages/Saved.jsx'
import Settings from './pages/Settings.jsx'

const PAGE_TITLES = {
  '/app': 'Dashboard',
  '/app/assistant': 'Ask AI',
  '/app/schemes': 'Government Schemes',
  '/app/rti': 'RTI Assistant',
  '/app/documents': 'My Documents',
  '/app/applications': 'My Applications',
  '/app/saved': 'Saved',
  '/app/settings': 'Settings',
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || 'NyayaSaathi AI'
  
  // 2. Grab the profile data
  const { profile } = useProfile()

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-area">
        <header className="app-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="btn-icon hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={18} />
            </button>
            <span className="app-header-title">{title}</span>
          </div>
          <div className="app-header-actions">
            <button className="btn-icon" aria-label="Notifications">
              <Bell size={17} />
            </button>
            
            {/* 3. This makes the avatar letter change automatically! */}
            <div className="avatar" style={{ width: 32, height: 32, fontSize: 12.5 }}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            
          </div>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
        <MobileNav />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="rti" element={<RTIAssistant />} />
          <Route path="documents" element={<Documents />} />
          <Route path="applications" element={<Applications />} />
          <Route path="saved" element={<Saved />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ToastProvider>
  )
}