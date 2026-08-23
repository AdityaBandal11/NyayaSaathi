import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Scale, Menu, X } from 'lucide-react'
import Button from './Button.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'For Citizens', href: '#for-citizens' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="NyayaSaathi AI home">
          <span className="brand-mark">
            <Scale size={18} />
          </span>
          NyayaSaathi AI
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle compact />
          <Button variant="secondary" size="sm" onClick={() => navigate('/app')}>
            Ask NyayaSaathi
          </Button>
          <Button size="sm" onClick={() => navigate('/app')}>
            Get Started
          </Button>
          <button
            className="btn-icon mobile-menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-drawer" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div className="mobile-drawer-panel">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button className="btn-icon" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); navigate('/app') }}>Ask NyayaSaathi</button>
            <button onClick={() => { setOpen(false); navigate('/app') }}>Get Started</button>
          </div>
        </div>
      )}
    </header>
  )
}
