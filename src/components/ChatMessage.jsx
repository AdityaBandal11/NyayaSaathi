import { useState } from 'react'
import { Bot, User, ListChecks, FileSearch, FileOutput, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react'
import Card from './Card.jsx'
import SourceCard from './SourceCard.jsx'
import { useToast } from './Toast.jsx'

function UserBubble({ text }) {
  return (
    <div className="msg-row user msg-animate">
      <div className="msg-avatar user">
        <User size={15} />
      </div>
      <div className="msg-bubble">{text}</div>
    </div>
  )
}

export function TypingRow() {
  return (
    <div className="msg-row ai typing-row msg-animate">
      <div className="msg-avatar ai">
        <Bot size={15} />
      </div>
      <div className="typing-bubble">
        <span className="typing-dots">
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  )
}

export default function ChatMessage({ message, showSources = true }) {
  const { showToast } = useToast()
  const [showDocs, setShowDocs] = useState(false)
  const [feedback, setFeedback] = useState(null)

  if (message.role === 'user') {
    return <UserBubble text={message.text} />
  }

  const { reply, actionPlan, documents, sources } = message.data

  const giveFeedback = (val) => {
    setFeedback(val)
    showToast('Thanks for your feedback.')
  }

  return (
    <div className="ai-response-block">
      <div className="msg-row ai">
        <div className="msg-avatar ai">
          <Bot size={15} />
        </div>
        <div className="msg-bubble">{reply}</div>
      </div>

      <Card className="action-plan-card">
        <h4>
          <ListChecks size={16} /> Action Plan
        </h4>
        <div className="ladder">
          {actionPlan.map((step, i) => (
            <div
              className="ladder-step ladder-step-animate"
              key={i}
              style={{ animationDelay: `${0.05 + i * 0.1}s` }}
            >
              <h4>Step {i + 1}</h4>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="ai-action-btns">
        <button className="btn btn-secondary btn-sm" onClick={() => showToast('Here is more context on this topic.')}>
          <FileSearch size={14} /> Explain More
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowDocs((s) => !s)}>
          <FileOutput size={14} /> Required Documents
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => showToast('Draft application started.')}>
          Generate Application
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => showToast('Showing the relevant authority near you.')}>
          <MapPin size={14} /> Find Authority
        </button>
      </div>

      {showDocs && (
        <div className="panel-box">
          <h5>Possible documents</h5>
          <ul>
            {documents.map((d) => (
              <li key={d}>• {d}</li>
            ))}
          </ul>
        </div>
      )}

      {showSources && (
        <div>
          <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 8 }}>Sources</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sources.map((s, i) => (
              <SourceCard key={i} org={s.org} dept={s.dept} label={s.label} />
            ))}
          </div>
        </div>
      )}

      <div className="feedback-row">
        <span>Was this helpful?</span>
        <button
          className={feedback === 'up' ? 'selected' : ''}
          onClick={() => giveFeedback('up')}
          aria-label="Mark response as helpful"
        >
          <ThumbsUp size={15} />
        </button>
        <button
          className={feedback === 'down' ? 'selected' : ''}
          onClick={() => giveFeedback('down')}
          aria-label="Mark response as not helpful"
        >
          <ThumbsDown size={15} />
        </button>
      </div>
    </div>
  )
}
