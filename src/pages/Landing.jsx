import { useNavigate } from 'react-router-dom'
import {
  Scale,
  Sparkles,
  Languages,
  ShieldCheck,
  UserCheck,
  ArrowUpRight,
  CheckCircle2,
  MessageSquareText,
  BrainCircuit,
  Landmark,
  ListChecks,
  Info,
  GraduationCap,
  Wheat,
  HardHat,
  Home as HomeIcon,
  Users,
  Store,
  ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import useReveal from '../hooks/useReveal.js'
import { useLanguage } from '../LanguageContext.jsx'

function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const HOW_IT_WORKS = [
    { num: '01', title: t('step1Title', '1. Describe Your Situation'), desc: t('step1Desc', 'Describe your situation in simple language.'), icon: MessageSquareText },
    { num: '02', title: t('step2Title', '2. Get Rights & Action Plan'), desc: t('step2Desc', 'NyayaSaathi identifies the relevant topic and context.'), icon: BrainCircuit },
    { num: '03', title: t('step3Title', '3. Take Action Easily'), desc: t('step3Desc', 'Relevant information is retrieved from official sources.'), icon: Landmark },
    { num: '04', title: t('actionPlan', '4. Take Action'), desc: 'Receive a clear step-by-step action plan.', icon: ListChecks },
  ]

  const FEATURES = [
    { icon: Sparkles, title: t('feature1Title', 'AI Civic Assistant'), desc: t('feature1Desc', '24/7 assistance for tenant issues, salary delays, consumer complaints.') },
    { icon: Languages, title: t('feature2Title', 'Voice Interaction'), desc: t('feature2Desc', 'Speak your query hands-free in English, Hindi, and Marathi.') },
    { icon: ShieldCheck, title: t('feature3Title', 'Government Schemes'), desc: t('feature3Desc', 'Instant eligibility verification for central and state schemes.') },
    { icon: UserCheck, title: t('feature4Title', 'RTI Generator'), desc: t('feature4Desc', 'Automated drafting for Right to Information applications.') },
    { icon: ArrowUpRight, title: 'Action-Oriented', desc: 'Not just information — clear next steps.' },
    { icon: Users, title: 'Accessible', desc: 'Designed for users with different levels of digital literacy.' },
  ]

  const USER_TYPES = [
    { emoji: '🎓', icon: GraduationCap, title: 'Students', example: 'Find scholarships you may qualify for.' },
    { emoji: '🌾', icon: Wheat, title: 'Farmers', example: 'Understand PM-KISAN and crop support schemes.' },
    { emoji: '👷', icon: HardHat, title: 'Workers', example: 'Know what to do about unpaid wages.' },
    { emoji: '🏠', icon: HomeIcon, title: 'Tenants', example: 'Understand your rental rights.' },
    { emoji: '👴', icon: Users, title: 'Senior Citizens', example: 'Check pension and healthcare scheme eligibility.' },
    { emoji: '🏪', icon: Store, title: 'Small Business Owners', example: 'Explore MUDRA loans for your business.' },
  ]

  return (
    <div id="home">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>
              {t('landingHeroTitle', 'Empowering Citizens with Legal & Civic Clarity')}
            </h1>
            <p className="lead">
              {t('landingHeroSubtitle', 'Understand your rights, navigate government schemes, file RTIs, and solve civic issues in simple, plain language.')}
            </p>
            <div className="hero-actions">
              <Button icon={MessageSquareText} onClick={() => navigate('/app/assistant')}>
                {t('askNyayaSaathi', 'Ask NyayaSaathi')}
              </Button>
              <Button variant="secondary" icon={Landmark} onClick={() => navigate('/app/schemes')}>
                {t('checkSchemes', 'Explore Schemes')}
              </Button>
            </div>
            <div className="trust-row">
              <span className="trust-item"><CheckCircle2 size={15} /> AI-Powered</span>
              <span className="trust-item"><CheckCircle2 size={15} /> Multilingual (EN/HI/MR)</span>
              <span className="trust-item"><CheckCircle2 size={15} /> Government Information</span>
              <span className="trust-item"><CheckCircle2 size={15} /> Citizen First</span>
            </div>
            <p className="disclaimer-inline">
              {t('footerDisclaimer', 'NyayaSaathi AI provides legal literacy and civic guidance. It does not replace professional legal representation.')}
            </p>
          </div>

          <div className="hero-preview-wrapper">
            <div className="float-badge float-badge-1"><ShieldCheck size={14} /> Trusted Sources</div>
            <div className="float-badge float-badge-2"><Languages size={14} /> हिंदी · मराठी · English</div>
            <div className="ai-preview-card">
              <div className="ai-preview-head">
                <span className="brand-mark" style={{ width: 30, height: 30 }}>
                  <Scale size={15} />
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{t('assistantTitle', 'NyayaSaathi AI')}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-faint)' }}>{t('assistantSubtitle', 'Your Civic Rights Assistant')}</div>
                </div>
                <span className="ai-dot" style={{ marginLeft: 'auto' }} />
              </div>
              <div className="ai-preview-body">
                <div className="bubble bubble-user">{t('tenant', 'My landlord has not returned my security deposit.')}</div>
                <div className="bubble bubble-ai">
                  {t('assistantEmptyDesc', 'I can help you understand your possible legal rights and next steps.')}
                </div>
                <div className="preview-checklist">
                  <div className="preview-check-item"><CheckCircle2 size={15} /> {t('actionPlan', 'Understand your rights')}</div>
                  <div className="preview-check-item"><CheckCircle2 size={15} /> {t('requiredDocuments', 'Required documents')}</div>
                  <div className="preview-check-item"><CheckCircle2 size={15} /> {t('explainMore', 'Possible next steps')}</div>
                </div>
                <button className="preview-cta" onClick={() => navigate('/app/assistant')}>
                  {t('actionPlan', 'View Action Plan')} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{t('howItWorks', 'How It Works')}</span>
              <h2>From confusion to a clear next step</h2>
              <p>Four simple stages take you from a plain-language question to a concrete plan of action.</p>
            </div>
          </Reveal>
          <div className="steps-row">
            {HOW_IT_WORKS.map((step) => (
              <Reveal key={step.num}>
                <div className="step-item">
                  <div className="step-num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section section-alt" id="features">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{t('whyNyayaSaathi', 'Why NyayaSaathi')}</span>
              <h2>Built around how citizens actually need help</h2>
            </div>
          </Reveal>
          <div className="grid-3">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <Card hover className="feature-card">
                  <div className="feature-icon">
                    <f.icon size={20} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USER TYPES */}
      <section className="section" id="for-citizens">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">{t('forCitizens', 'Built for Everyone')}</span>
              <h2>Whoever you are, there's a starting point</h2>
            </div>
          </Reveal>
          <div className="grid-3">
            {USER_TYPES.map((u) => (
              <Reveal key={u.title}>
                <Card hover className="usertype-card">
                  <div className="usertype-emoji">{u.emoji}</div>
                  <h4>{u.title}</h4>
                  <p>"{u.example}"</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(24px,3.4vw,32px)', fontWeight: 800, marginBottom: 14 }}>
              Ready to understand your situation?
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 26 }}>
              Start a conversation with NyayaSaathi AI — free, simple, and in your language.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Button icon={MessageSquareText} onClick={() => navigate('/app/assistant')}>
                {t('askNyayaSaathi', 'Ask NyayaSaathi')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/app')}>
                {t('dashboard', 'Go to Dashboard')}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="disclaimer-strip" style={{ marginBottom: 28 }}>
            <Info size={18} />
            <div>
              <strong>Disclaimer: </strong>
              {t('footerDisclaimer', 'NyayaSaathi AI provides legal literacy and civic guidance. It does not replace professional legal representation.')}
            </div>
          </div>
          <div className="footer-top">
            <div>
              <div className="brand">
                <span className="brand-mark">
                  <Scale size={16} />
                </span>
                NyayaSaathi AI
              </div>
              <p className="footer-tag">{t('tagline', 'Your Civic Rights Assistant')}</p>
            </div>
            <div className="footer-links">
              <a href="#home">About</a>
              <a href="#how-it-works">{t('howItWorks', 'How It Works')}</a>
              <a href="#features">{t('features', 'Features')}</a>
              <a href="#home">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} NyayaSaathi AI</span>
            <span>{t('allRightsReserved', 'All rights reserved.')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
