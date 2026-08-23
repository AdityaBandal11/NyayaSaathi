import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext.jsx'

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme, setTheme } = useTheme()

  if (compact) {
    return (
      <button
        className="theme-toggle-compact"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
      </button>
    )
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      <button
        className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label="Light mode"
      >
        <Sun size={14} /> Light
      </button>
      <button
        className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label="Dark mode"
      >
        <Moon size={14} /> Dark
      </button>
    </div>
  )
}
