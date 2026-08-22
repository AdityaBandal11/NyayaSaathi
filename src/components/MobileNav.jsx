import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MessageCircle, Landmark, ClipboardList, Settings } from 'lucide-react'

const ITEMS = [
  { to: '/app', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/app/assistant', label: 'Ask AI', icon: MessageCircle },
  { to: '/app/schemes', label: 'Schemes', icon: Landmark },
  { to: '/app/applications', label: 'Apps', icon: ClipboardList },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <div className="mobile-nav-inner">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={19} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
