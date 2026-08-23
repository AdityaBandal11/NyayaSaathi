import { useNavigate } from 'react-router-dom'
import {
  MessageCircle,
  Landmark,
  FileSearch,
  FileText,
  ClipboardList,
  Bookmark,
  FolderOpen,
  Sparkles,
  ArrowRight,
  Search,
  ShieldCheck,
} from 'lucide-react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import StatCard from '../components/StatCard.jsx'
import { recentActivity } from '../data/applications.js'
import { useProfile } from '../ProfileContext.jsx'
import { useLanguage } from '../LanguageContext.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { t } = useLanguage()
  const firstName = (profile?.name || 'there').trim().split(/\s+/)[0]

  const SECONDARY_ACTIONS = [
    {
      icon: Landmark,
      title: t('schemes', 'Government Schemes'),
      desc: 'Discover benefits you may qualify for based on your situation.',
      cta: t('checkSchemes', 'Browse Schemes'),
      to: '/app/schemes',
    },
    {
      icon: FileText,
      title: t('rti', 'RTI Assistant'),
      desc: 'Draft a clear Right to Information application step by step.',
      cta: t('fileRTI', 'Start RTI'),
      to: '/app/rti',
    },
    {
      icon: FileSearch,
      title: t('documents', 'Document Explainer'),
      desc: 'Upload a government or legal document and understand the key points.',
      cta: t('uploadDocument', 'Upload Document'),
      to: '/app/documents',
    },
  ]

  const PROMPTS = [
    { label: t('tenant', 'Tenant rights'), prompt: 'What are my rights as a tenant?' },
    { label: t('schemes', 'Government schemes'), prompt: 'Which government schemes am I eligible for?' },
    { label: t('rti', 'RTI'), prompt: 'How can I file an RTI?' },
    { label: t('consumer', 'Consumer complaint'), prompt: 'How do I complain about a consumer issue?' },
  ]

  const openAssistant = (prompt) => {
    navigate('/app/assistant', prompt ? { state: { prompt } } : undefined)
  }

  return (
    <div className="dashboard-page">
      <div className="dash-hero-wrap">
        <div className="dash-hero-glow" aria-hidden="true" />
        <div className="dash-header">
          <h1>{t('welcomeBack', 'Welcome back')}, {firstName} 👋</h1>
          <p>{t('dashboardSubtitle', 'Here is your civic rights summary and recent progress.')}</p>
        </div>
      </div>

      <Card className="dashboard-primary-card">
        <div className="dashboard-primary-glow" aria-hidden="true" />
        <div className="dashboard-primary-copy">
          <span className="eyebrow"><Sparkles size={14} /> NyayaSaathi AI</span>
          <h2>{t('askNewQuestion', 'How can we help you today?')}</h2>
          <p>{t('assistantEmptyDesc', 'Describe a civic, legal or government-service problem and get a clear action plan.')}</p>
        </div>
        <button className="dashboard-search-trigger" onClick={() => openAssistant()} aria-label="Ask NyayaSaathi about your problem">
          <Search size={18} />
          <span>{t('chatPlaceholder', 'Describe your problem...')}</span>
          <strong>{t('send', 'Ask')}</strong>
        </button>
        <div className="prompt-row" aria-label="Suggested prompts">
          {PROMPTS.map((item, idx) => (
            <button key={idx} className="prompt-chip" onClick={() => openAssistant(item.prompt)}>
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      <div className="dashboard-section-head">
        <div>
          <h2>{t('quickActions', 'Secondary tools')}</h2>
          <p>Focused workflows for schemes, RTI and documents.</p>
        </div>
      </div>

      <div className="dashboard-secondary-grid">
        {SECONDARY_ACTIONS.map((a) => (
          <Card hover key={a.title} className="action-card action-card-modern">
            <div className="feature-icon">
              <a.icon size={20} />
            </div>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
            <Button size="sm" variant="secondary" icon={ArrowRight} iconPosition="right" onClick={() => navigate(a.to)}>
              {a.cta}
            </Button>
          </Card>
        ))}
      </div>

      <div className="dashboard-tertiary-grid">
        <Card className="activity-card">
          <div className="card-title-row">
            <div>
              <h3>{t('recentActivity', 'Recent Activity')}</h3>
              <p>Your latest NyayaSaathi work</p>
            </div>
            <ShieldCheck size={18} />
          </div>
          <div className="timeline">
            {recentActivity.map((item) => (
              <div className="timeline-item" key={item.id}>
                <span className="timeline-dot" />
                <div>
                  <h4>{item.text}</h4>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="dashboard-stat-grid">
          <StatCard icon={ClipboardList} value="3" label={t('activeApplicationsCount', 'Saved Applications')} tint="var(--color-primary-tint)" color="var(--color-primary)" />
          <StatCard icon={Bookmark} value="5" label={t('savedSchemesCount', 'Saved Schemes')} tint="var(--color-secondary-tint)" color="var(--color-secondary)" />
          <StatCard icon={FolderOpen} value="2" label={t('documents', 'Documents Analyzed')} tint="var(--color-amber-tint)" color="var(--color-amber)" />
          <StatCard icon={MessageCircle} value="8" label={t('askAI', 'AI Conversations')} tint="var(--color-primary-tint)" color="var(--color-primary)" />
        </div>
      </div>
    </div>
  )
}
