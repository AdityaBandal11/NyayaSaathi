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

const NAV_ITEMS = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/assistant', label: 'Ask AI', icon: MessageCircle },
  { to: '/app/schemes', label: 'Government Schemes', icon: Landmark },
  { to: '/app/rti', label: 'RTI Assistant', icon: FileText },
  { to: '/app/documents', label: 'My Documents', icon: FolderOpen },
  { to: '/app/applications', label: 'My Applications', icon: ClipboardList },
  { to: '/app/saved', label: 'Saved', icon: Bookmark },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  // Grab the live profile from the context
  const { profile, initials } = useProfile()
  const navigate = useNavigate()

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
          {/* Avatar dynamically shows initials from the live profile name */}
          <div className="avatar">{initials}</div>
          <div>
            {/* Display the live name and live role */}
            <div className="sidebar-profile-name">{profile.name}</div>
            <div className="sidebar-profile-role">{profile.userType}</div>
          </div>
        </button>
      </aside>
    </>
  )
}