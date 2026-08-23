import { useNavigate } from 'react-router-dom'
import { MessageCircle, Landmark, FileSearch, FileText, ClipboardList, Bookmark, FolderOpen, Sparkles, ArrowRight } from 'lucide-react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import StatCard from '../components/StatCard.jsx'
import { recentActivity } from '../data/applications.js'
import { useProfile } from '../ProfileContext.jsx'

const ACTIONS = [
  {
    icon: MessageCircle,
    title: 'Ask a Question',
    desc: 'Get help with a civic or legal issue.',
    cta: 'Ask AI',
    to: '/app/assistant',
  },
  {
    icon: Landmark,
    title: 'Find a Scheme',
    desc: 'Discover government schemes you may qualify for.',
    cta: 'Browse Schemes',
    to: '/app/schemes',
  },
  {
    icon: FileSearch,
    title: 'Understand a Document',
    desc: 'Upload a government or legal document.',
    cta: 'Upload Document',
    to: '/app/documents',
  },
  {
    icon: FileText,
    title: 'Create RTI Application',
    desc: 'Create an RTI application step by step.',
    cta: 'Start RTI',
    to: '/app/rti',
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const firstName = (profile?.name || 'there').trim().split(/\s+/)[0]

  return (
    <div>
      <div className="dash-hero-wrap">
        <div className="dash-hero-glow" aria-hidden="true" />
        <div className="dash-header">
          <h1>Good morning, {firstName} 👋</h1>
          <p>How can NyayaSaathi help you today?</p>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        {ACTIONS.map((a) => (
          <Card hover key={a.title} className="action-card">
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

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <StatCard icon={ClipboardList} value="3" label="Saved Applications" tint="var(--color-primary-tint)" color="var(--color-primary)" />
        <StatCard icon={Bookmark} value="5" label="Saved Schemes" tint="var(--color-secondary-tint)" color="var(--color-secondary)" />
        <StatCard icon={FolderOpen} value="2" label="Documents Analyzed" tint="var(--color-amber-tint)" color="var(--color-amber)" />
        <StatCard icon={Sparkles} value="8" label="AI Conversations" tint="var(--color-primary-tint)" color="var(--color-primary)" />
      </div>

      <Card style={{ padding: '20px 24px' }}>
        <h3 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 8 }}>Recent Activity</h3>
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
    </div>
  )
}
