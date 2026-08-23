import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Menu, X } from 'lucide-react';
import Button from './Button.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import { useLanguage } from '../LanguageContext.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { label: t('brand', 'Home'), href: '#home' },
    { label: t('howItWorks', 'How It Works'), href: '#how-it-works' },
    { label: t('features', 'Features'), href: '#features' },
    { label: t('forCitizens', 'For Citizens'), href: '#for-citizens' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="NyayaSaathi AI home">
          <span className="brand-mark">
            <Scale size={18} />
          </span>
          {t('brand', 'NyayaSaathi AI')}
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <LanguageSelector compact />
          <ThemeToggle compact />
          <Button variant="secondary" size="sm" onClick={() => navigate('/app')}>
            {t('askNyayaSaathi', 'Ask NyayaSaathi')}
          </Button>
          <Button size="sm" onClick={() => navigate('/app')}>
            {t('getStarted', 'Get Started')}
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
        <div className="mobile-drawer" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="mobile-drawer-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <LanguageSelector />
              <button className="btn-icon" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); navigate('/app'); }}>{t('askNyayaSaathi', 'Ask NyayaSaathi')}</button>
            <button onClick={() => { setOpen(false); navigate('/app'); }}>{t('getStarted', 'Get Started')}</button>
          </div>
        </div>
      )}
    </header>
  );
}
