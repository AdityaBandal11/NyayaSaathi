import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MessageCircle, Landmark, ClipboardList, Settings } from 'lucide-react'
import { useLanguage } from '../LanguageContext.jsx'

export default function MobileNav() {
  const { t } = useLanguage()

  const ITEMS = [
    { to: '/app', label: t('dashboard', 'Home'), icon: LayoutDashboard, end: true },
    { to: '/app/assistant', label: t('askAI', 'Ask AI'), icon: MessageCircle },
    { to: '/app/schemes', label: t('schemes', 'Schemes'), icon: Landmark },
    { to: '/app/applications', label: t('applications', 'Apps'), icon: ClipboardList },
    { to: '/app/settings', label: t('settings', 'Settings'), icon: Settings },
  ]

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
