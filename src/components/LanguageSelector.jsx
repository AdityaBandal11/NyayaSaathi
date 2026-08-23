import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';
import { useProfile } from '../ProfileContext.jsx';

export default function LanguageSelector({ compact = false }) {
  const { language, setLanguage, languages, t } = useLanguage();
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code, label) => {
    setLanguage(code);
    // Sync with user profile preferred language
    const profileLangName = code === 'en' ? 'English' : code === 'hi' ? 'Hindi' : 'Marathi';
    if (profile && profile.language !== profileLangName) {
      updateProfile({ language: profileLangName });
    }
    setOpen(false);
  };

  return (
    <div className="language-selector-container" ref={containerRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className={`btn-icon lang-selector-btn ${compact ? 'compact' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t('language', 'Change language')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={17} />
        <span className="lang-code-label">
          {compact ? currentLangObj.code.toUpperCase() : currentLangObj.label}
        </span>
        <ChevronDown size={14} className={`dropdown-arrow ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="language-dropdown-menu" role="listbox" tabIndex={-1}>
          {languages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                className={`lang-option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(lang.code, lang.label)}
                role="option"
                aria-selected={isSelected}
              >
                <span className="flag-icon">{lang.flag}</span>
                <span className="lang-name">{lang.label}</span>
                {isSelected && <Check size={14} className="check-icon" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
