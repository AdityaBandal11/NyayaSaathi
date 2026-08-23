import { useProfile } from '../ProfileContext.jsx'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Scale,
  LayoutDashboard,
  MessageCircle,
  Landmark,
  FileText,
  FolderOpen,
  ClipboardList,
  Bookmark,
  Settings,
  X,
} from 'lucide-react'
import { useLanguage } from '../LanguageContext.jsx'

export default function Sidebar({ open, onClose }) {
  const { profile, initials } = useProfile()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const NAV_ITEMS = [
    { to: '/app', label: t('dashboard', 'Dashboard'), icon: LayoutDashboard, end: true },
    { to: '/app/assistant', label: t('askAI', 'Ask AI'), icon: MessageCircle },
    { to: '/app/schemes', label: t('schemes', 'Government Schemes'), icon: Landmark },
    { to: '/app/rti', label: t('rti', 'RTI Assistant'), icon: FileText },
    { to: '/app/documents', label: t('documents', 'My Documents'), icon: FolderOpen },
    { to: '/app/applications', label: t('applications', 'My Applications'), icon: ClipboardList },
    { to: '/app/saved', label: t('saved', 'Saved'), icon: Bookmark },
    { to: '/app/settings', label: t('settings', 'Settings'), icon: Settings },
  ]

  const goToProfile = () => {
    onClose()
    navigate('/app/settings')
  }

  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Primary navigation">
        <div className="sidebar-brand">
          <span className="brand-mark">
            <Scale size={17} />
          </span>
          <span style={{ fontWeight: 800, fontSize: 16 }}>NyayaSaathi AI</span>
          <button className="btn-icon" style={{ marginLeft: 'auto', display: open ? 'flex' : 'none' }} onClick={onClose} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="sidebar-profile"
          onClick={goToProfile}
          style={{ textAlign: 'left', cursor: 'pointer' }}
          aria-label="Open your profile"
        >
          <div className="avatar">{initials}</div>
          <div>
            <div className="sidebar-profile-name">{profile.name}</div>
            <div className="sidebar-profile-role">{profile.userType}</div>
          </div>
        </button>
      </aside>
    </>
  )
}