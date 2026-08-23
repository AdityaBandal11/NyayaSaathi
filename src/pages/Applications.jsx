import { useState } from 'react'
import { CalendarClock, ClipboardList, FileText } from 'lucide-react'
import Card from '../components/Card.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import { initialApplications } from '../data/applications.js'

const STATUS_STEPS = ['Draft', 'Submitted', 'Processing', 'Completed']

function getStepState(status, step) {
  const current = STATUS_STEPS.indexOf(status)
  const idx = STATUS_STEPS.indexOf(step)
  if (idx < current) return 'done'
  if (idx === current) return 'active'
  return ''
}

function ApplicationTimeline({ status }) {
  return (
    <div className="application-timeline" aria-label={`Application status: ${status}`}>
      {STATUS_STEPS.map((step) => (
        <div key={step} className={`application-step ${getStepState(status, step)}`}>
          <span className="application-step-dot" />
          <span>{step}</span>
        </div>
      ))}
    </div>
  )
}

export default function Applications() {
  const [applications] = useState(initialApplications)
  const [active, setActive] = useState(null)

  return (
    <div className="applications-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Track progress</span>
          <h1>My Applications</h1>
          <p>Track the status of everything you've started with NyayaSaathi.</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={40} />
          <h3>No applications yet</h3>
          <p>Applications you create will show up here.</p>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((a) => (
            <Card hover key={a.id} className="application-status-card" onClick={() => setActive(a)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') setActive(a) }}>
              <div className="application-card-head">
                <div className="application-icon">
                  <FileText size={18} />
                </div>
                <StatusBadge status={a.status} />
              </div>
              <h3>{a.title}</h3>
              <p>{a.subtitle}</p>
              <ApplicationTimeline status={a.status} />
              <div className="application-card-foot">
                <span>{a.type}</span>
                <span><CalendarClock size={14} /> {a.updated}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {active && (
        <Modal
          title={active.title}
          onClose={() => setActive(null)}
          footer={<Button variant="secondary" onClick={() => setActive(null)}>Close</Button>}
        >
          <div className="application-modal-body">
            <StatusBadge status={active.status} />
            <p>{active.subtitle}</p>
            <ApplicationTimeline status={active.status} />
            <div className="application-modal-meta">
              <span>Type: {active.type}</span>
              <span>Last updated {active.updated}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
