import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Settings as SettingsIcon, Sun, Moon, LogOut } from 'lucide-react'
import { useProfile } from '../ProfileContext.jsx'
import { useAuth } from '../AuthContext.jsx'
import { useTheme } from '../ThemeContext.jsx'
import { useToast } from './Toast.jsx'

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const navigate = useNavigate()
  const { profile, initials } = useProfile()
  const { logout, isGuest } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const goTo = (path) => {
    setOpen(false)
    navigate(path)
  }

  const handleLogout = () => {
    setOpen(false)
    logout()
    showToast('You have been logged out.')
    navigate('/login')
  }

  return (
    <div className="profile-menu-wrap" ref={wrapRef}>
      <button
        className="profile-menu-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open profile menu"
      >
        <div className="avatar" style={{ width: 32, height: 32, fontSize: 12.5 }}>
          {initials}
        </div>
      </button>

      {open && (
        <div className="profile-menu-dropdown" role="menu">
          <div className="profile-menu-header">
            <div className="avatar" style={{ width: 38, height: 38, fontSize: 13 }}>
              {initials}
            </div>
            <div>
              <div className="name">{profile.name}</div>
              <div className="profile-menu-type">{isGuest ? 'Guest' : profile.userType}</div>
              {!isGuest && profile.email && <div className="email">{profile.email}</div>}
            </div>
          </div>

          <button className="profile-menu-item" role="menuitem" onClick={() => goTo('/app/settings')}>
            <User size={16} /> Profile
          </button>
          <button className="profile-menu-item" role="menuitem" onClick={() => goTo('/app/settings')}>
            <SettingsIcon size={16} /> Settings
          </button>

          <div className="profile-menu-theme-row">
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-text)' }}>
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />} Theme
            </span>
            <button
              className={`toggle ${theme === 'dark' ? 'on' : ''}`}
              onClick={toggleTheme}
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label="Toggle dark mode"
            />
          </div>

          <div className="profile-menu-divider" />

          <button className="profile-menu-item danger" role="menuitem" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  )
}
