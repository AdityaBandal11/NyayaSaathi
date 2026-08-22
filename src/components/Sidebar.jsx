import { NavLink } from 'react-router-dom'
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

        <div className="sidebar-profile">
          <div className="avatar">A</div>
          <div>
            <div className="sidebar-profile-name">Aditya</div>
            <div className="sidebar-profile-role">Citizen</div>
          </div>
        </div>
      </aside>
    </>
  )
}
