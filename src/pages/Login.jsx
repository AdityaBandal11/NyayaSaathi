import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Scale, CheckCircle2, LogIn, UserRound } from 'lucide-react'
import Button from '../components/Button.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useAuth } from '../AuthContext.jsx'
import { useProfile } from '../ProfileContext.jsx'
import { useToast } from '../components/Toast.jsx'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Login() {
  const navigate = useNavigate()
  const { login, loginAsGuest, isAuthenticated } = useAuth()
  const { setGuestProfile } = useProfile()
  const { showToast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Already signed in (or continuing as guest) — no need to show the form again.
  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  const validate = () => {
    const next = {}
    if (!email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!isValidEmail(email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!password) {
      next.password = 'Please enter your password.'
    } else if (password.length < 6) {
      next.password = 'Password must contain at least 6 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      showToast('Please fix the errors in the form.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      login()
      setLoading(false)
      showToast('Welcome back to NyayaSaathi!')
      navigate('/app')
    }, 900)
  }

  const handleGuest = () => {
    loginAsGuest()
    setGuestProfile()
    showToast('Continuing as guest.')
    navigate('/app')
  }

  return (
    <div className="login-shell">
      <div className="login-topbar">
        <Link to="/" className="brand" aria-label="NyayaSaathi AI home">
          <span className="brand-mark">
            <Scale size={17} />
          </span>
          NyayaSaathi AI
        </Link>
        <ThemeToggle />
      </div>

      <div className="login-main">
        <div className="login-intro">
          <h1>Welcome back to NyayaSaathi</h1>
          <p className="lead">Understand your rights. Take the right action.</p>
          <div className="trust-row">
            <span className="trust-item"><CheckCircle2 size={15} /> AI-Powered</span>
            <span className="trust-item"><CheckCircle2 size={15} /> Multilingual</span>
            <span className="trust-item"><CheckCircle2 size={15} /> Citizen First</span>
          </div>
          <p className="disclaimer-inline">
            NyayaSaathi provides informational guidance and is not a substitute for professional legal advice.
          </p>
        </div>

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="sub">Sign in to continue to NyayaSaathi</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'has-error' : ''}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
              />
              {errors.email && (
                <p className="field-error" id="login-email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'has-error' : ''}
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
              />
              {errors.password && (
                <p className="field-error" id="login-password-error">
                  {errors.password}
                </p>
              )}
            </div>

            <Button type="submit" block disabled={loading} icon={loading ? undefined : LogIn}>
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span className="spinner" style={{ width: 15, height: 15, borderWidth: 2 }} />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="login-divider">or</div>

          <Button variant="secondary" block icon={UserRound} onClick={handleGuest}>
            Continue as Guest
          </Button>

          <p className="login-footer-text">
            Don't have an account?{' '}
            <button type="button" onClick={() => showToast('Account creation is not available in this prototype.')}>
              Create account
            </button>
          </p>

          <div className="login-demo-hint">
            <strong>Demo Mode</strong>
            Use any valid email and a password with 6+ characters.
          </div>
        </div>
      </div>
    </div>
  )
}
