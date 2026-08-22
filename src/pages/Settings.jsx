import { useState } from 'react'
import Card from '../components/Card.jsx'
import { useToast } from '../components/Toast.jsx'

const LANGUAGES = ['English', 'Hindi', 'Marathi']

export default function Settings() {
  const { showToast } = useToast()
  const [language, setLanguage] = useState('English')
  const [profile, setProfile] = useState({
    name: 'Aditya',
    state: 'Maharashtra',
    userType: 'Citizen',
  })
  const [toggles, setToggles] = useState({
    largerText: false,
    highContrast: false,
    voiceInput: false,
  })

  const flip = (key) => {
    setToggles((t) => {
      const next = { ...t, [key]: !t[key] }
      showToast(next[key] ? 'Setting turned on' : 'Setting turned off')
      return next
    })
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
          <input id="set-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </div>
        <div className="field-group">
          <label htmlFor="set-state">State</label>
          <select id="set-state" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })}>
            <option>Maharashtra</option>
            <option>Uttar Pradesh</option>
            <option>Bihar</option>
            <option>Rajasthan</option>
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div className="field-group" style={{ marginBottom: 0 }}>
          <label htmlFor="set-usertype">User Type</label>
          <select id="set-usertype" value={profile.userType} onChange={(e) => setProfile({ ...profile, userType: e.target.value })}>
            <option>Citizen</option>
            <option>Student</option>
            <option>Farmer</option>
            <option>Worker</option>
            <option>Small Business Owner</option>
          </select>
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
