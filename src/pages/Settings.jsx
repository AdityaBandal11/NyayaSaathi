import { useState, useEffect } from 'react'
import Card from '../components/Card.jsx'
import { useToast } from '../components/Toast.jsx'
import { useProfile } from '../ProfileContext.jsx' 

const LANGUAGES = ['English', 'Hindi', 'Marathi']

export default function Settings() {
  const { showToast } = useToast()
  
  // 1. Grab global profile state
  const { profile, setProfile } = useProfile()
  
  // 2. Create a temporary "draft" state just for this form
  const [formData, setFormData] = useState(profile)
  
  const [language, setLanguage] = useState('English')
  const [toggles, setToggles] = useState({
    largerText: false,
    highContrast: false,
    voiceInput: false,
  })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || document.documentElement.getAttribute('data-theme') === 'dark') {
      setDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const handleThemeToggle = () => {
    const isNowDark = !darkMode
    setDarkMode(isNowDark)
    
    if (isNowDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
      showToast('Dark mode enabled')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
      showToast('Dark mode disabled')
    }
  }

  const flip = (key) => {
    const isNowOn = !toggles[key]
    setToggles({ ...toggles, [key]: isNowOn })
    showToast(isNowOn ? 'Setting turned on' : 'Setting turned off')
  }

  // 3. NEW: The Save Button Function
  const handleSaveProfile = () => {
    setProfile(formData) // This pushes the draft to the global app and updates the Sidebar
    showToast('Profile saved successfully!')
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile, language and accessibility preferences.</p>
        </div>
      </div>

      <Card className="settings-section">
        <h3>Profile</h3>
        <div className="field-group">
          <label htmlFor="set-name">Name</label>
          {/* Note: We are using formData here instead of profile now */}
          <input 
            id="set-name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        <div className="field-group">
          <label htmlFor="set-state">State</label>
          <select 
            id="set-state" 
            value={formData.state} 
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          >
            <option>Maharashtra</option>
            <option>Uttar Pradesh</option>
            <option>Bihar</option>
            <option>Rajasthan</option>
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div className="field-group">
          <label htmlFor="set-usertype">User Type</label>
          <select 
            id="set-usertype" 
            value={formData.userType} 
            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          >
            <option>Citizen</option>
            <option>Student</option>
            <option>Farmer</option>
            <option>Worker</option>
            <option>Small Business Owner</option>
          </select>
        </div>
        
        {/* NEW SAVE BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button 
            onClick={handleSaveProfile}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--primary, #0066cc)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Save Changes
          </button>
        </div>
      </Card>

      <Card className="settings-section">
        <h3>Preferred Language</h3>
        <div className="lang-pills">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              className={`lang-pill ${language === l ? 'active' : ''}`}
              onClick={() => {
                setLanguage(l)
                showToast(`Language set to ${l}`)
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </Card>

      <Card className="settings-section">
        <h3>Appearance</h3>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Dark Mode</div>
            <div className="settings-row-desc">Toggle between light and dark themes.</div>
          </div>
          <button 
            className={`toggle ${darkMode ? 'on' : ''}`} 
            onClick={handleThemeToggle} 
            role="switch" 
            aria-checked={darkMode} 
            aria-label="Dark mode" 
          />
        </div>
      </Card>

      <Card className="settings-section">
        <h3>Accessibility</h3>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Larger Text</div>
            <div className="settings-row-desc">Increase text size across the app.</div>
          </div>
          <button className={`toggle ${toggles.largerText ? 'on' : ''}`} onClick={() => flip('largerText')} role="switch" aria-checked={toggles.largerText} aria-label="Larger text" />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">High Contrast</div>
            <div className="settings-row-desc">Increase color contrast for readability.</div>
          </div>
          <button className={`toggle ${toggles.highContrast ? 'on' : ''}`} onClick={() => flip('highContrast')} role="switch" aria-checked={toggles.highContrast} aria-label="High contrast" />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Voice Input</div>
            <div className="settings-row-desc">Allow speaking your questions to the AI assistant.</div>
          </div>
          <button className={`toggle ${toggles.voiceInput ? 'on' : ''}`} onClick={() => flip('voiceInput')} role="switch" aria-checked={toggles.voiceInput} aria-label="Voice input" />
        </div>
      </Card>
    </div>
  )
}