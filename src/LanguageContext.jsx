import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './data/translations.js';
import { useToast } from './components/Toast.jsx';

const LanguageContext = createContext();

const STORAGE_KEY = 'nyayaSaathiLanguage';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', locale: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', locale: 'hi-IN' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳', locale: 'mr-IN' },
];

export const CODE_TO_NAME = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
};

export const NAME_TO_CODE = {
  English: 'en',
  Hindi: 'hi',
  Marathi: 'mr',
  'हिन्दी': 'hi',
  'मराठी': 'mr',
};

export function LanguageProvider({ children }) {
  const { showToast } = useToast();
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['en', 'hi', 'mr'].includes(stored)) {
        return stored;
      }
    } catch {
      // localStorage fallback
    }
    return 'en';
  });

  const changeLanguage = (newLang, skipToast = false) => {
    const validLang = ['en', 'hi', 'mr'].includes(newLang) ? newLang : 'en';
    setLanguageState(validLang);

    try {
      localStorage.setItem(STORAGE_KEY, validLang);
    } catch {
      // ignore storage errors
    }

    if (!skipToast) {
      const toastPrefix = translations[validLang]?.languageChangedToast || 'Language changed to ';
      const langName = validLang === 'en' ? 'English' : validLang === 'hi' ? 'हिन्दी' : 'मराठी';
      showToast(`${toastPrefix}${langName}`);
    }
  };

  const t = (key, fallback = '') => {
    const dict = translations[language] || translations.en;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    return translations.en[key] || fallback || key;
  };

  const currentLocale = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        currentLocale,
        languages: SUPPORTED_LANGUAGES,
        languageName: CODE_TO_NAME[language] || 'English',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
