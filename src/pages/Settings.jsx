import { useEffect, useState } from 'react'
import { Accessibility, Palette, SlidersHorizontal, UserRound } from 'lucide-react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useToast } from '../components/Toast.jsx'
import { useProfile, getInitials } from '../ProfileContext.jsx'

const LANGUAGES = ['English', 'Hindi', 'Marathi']

const USER_TYPES = ['Citizen', 'Student', 'Farmer', 'Worker', 'Senior Citizen', 'Small Business Owner']

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
]

function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Settings() {
  const { showToast } = useToast()
  const { profile, setProfile } = useProfile()

  const [formData, setFormData] = useState(profile)
  const [errors, setErrors] = useState({})

  const [toggles, setToggles] = useState({
    largerText: false,
    highContrast: false,
    voiceInput: false,
  })

  useEffect(() => {
    setFormData(profile)
  }, [profile])

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const validate = () => {
    const next = {}
    if (!formData.name || !formData.name.trim()) {
      next.name = 'Please enter your name.'
    }
    if (formData.email && !isValidEmail(formData.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSave = () => {
    if (!validate()) {
      showToast('Please fix the errors before saving.')
      return
    }
    setProfile(formData)
    showToast('Profile updated successfully.')
  }

  const handleCancel = () => {
    setFormData(profile)
    setErrors({})
    showToast('Changes discarded.')
  }

  const flip = (key) => {
    const isNowOn = !toggles[key]
    setToggles({ ...toggles, [key]: isNowOn })
    showToast(isNowOn ? 'Setting turned on' : 'Setting turned off')
  }

  const previewInitials = getInitials(formData.name)

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Profile and preferences</span>
          <h1>Settings</h1>
          <p>Manage your profile, language and accessibility preferences.</p>
        </div>
      </div>

      <Card className="settings-section profile-information-section">
        <div className="settings-section-title">
          <span><UserRound size={17} /> Profile Information</span>
          <p>Keep your details current so NyayaSaathi can personalize civic guidance.</p>
        </div>

        <div className="settings-avatar-row">
          <div className="avatar">{previewInitials}</div>
          <div>
            <div className="name">{formData.name || 'Your name'}</div>
            <div className="role">{formData.userType || 'Citizen'} · {formData.state || 'State not set'}</div>
          </div>
        </div>

        <div className="settings-form-grid">
          <div className="field-group">
            <label htmlFor="set-name">Name</label>
            <input
              id="set-name"
              value={formData.name || ''}
              onChange={updateField('name')}
              className={errors.name ? 'has-error' : ''}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="set-email">Email</label>
            <input
              id="set-email"
              type="email"
              value={formData.email || ''}
              onChange={updateField('email')}
              className={errors.email ? 'has-error' : ''}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="set-phone">Phone</label>
            <input
              id="set-phone"
              type="tel"
              value={formData.phone || ''}
              onChange={updateField('phone')}
              placeholder="e.g. 98765 43210"
            />
          </div>

          <div className="field-group">
            <label htmlFor="set-state">State</label>
            <select id="set-state" value={formData.state || ''} onChange={updateField('state')}>
              <option value="">Select state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="set-language">Language</label>
            <select id="set-language" value={formData.language || 'English'} onChange={updateField('language')}>
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="set-usertype">User Type</label>
            <select id="set-usertype" value={formData.userType || 'Citizen'} onChange={updateField('userType')}>
              {USER_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="settings-form-actions">
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Card>

      <Card className="settings-section">
        <div className="settings-section-title">
          <span><SlidersHorizontal size={17} /> Preferences</span>
          <p>Choose the language and experience defaults you prefer.</p>
        </div>
        <div className="lang-pills">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              className={`lang-pill ${formData.language === l ? 'active' : ''}`}
              onClick={() => {
                const next = { ...formData, language: l }
                setFormData(next)
                setProfile(next)
                showToast(`Language set to ${l}`)
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </Card>

      <div className="settings-grid-two">
        <Card className="settings-section">
          <div className="settings-section-title">
            <span><Accessibility size={17} /> Accessibility</span>
            <p>Controls that make the interface easier to read and operate.</p>
          </div>
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
          <div className="settings-row" style={{ borderBottom: 'none' }}>
            <div>
              <div className="settings-row-label">Voice Input</div>
              <div className="settings-row-desc">Allow speaking your questions to the AI assistant.</div>
            </div>
            <button className={`toggle ${toggles.voiceInput ? 'on' : ''}`} onClick={() => flip('voiceInput')} role="switch" aria-checked={toggles.voiceInput} aria-label="Voice input" />
          </div>
        </Card>

        <Card className="settings-section appearance-section">
          <div className="settings-section-title">
            <span><Palette size={17} /> Appearance</span>
            <p>Switch between light and dark mode without losing your current work.</p>
          </div>
          <ThemeToggle />
        </Card>
      </div>
    </div>
  )
}
