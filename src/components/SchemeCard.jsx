import { Bookmark } from 'lucide-react'
import Card from './Card.jsx'
import Button from './Button.jsx'

export default function SchemeCard({ scheme, saved, onToggleSave, onViewDetails, onCheckEligibility }) {
  return (
    <Card hover className="scheme-card">
      <div className="scheme-card-top">
        <h3>{scheme.name}</h3>
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={() => onToggleSave(scheme.id)}
          aria-label={saved ? `Remove ${scheme.name} from saved` : `Save ${scheme.name}`}
          aria-pressed={saved}
        >
          <Bookmark size={19} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <span className="badge badge-blue" style={{ alignSelf: 'flex-start' }}>
        {scheme.category}
      </span>
      <p className="desc">{scheme.description}</p>
      <div className="scheme-meta">
        <span>
          <strong>Benefits: </strong>
          {scheme.benefits}
        </span>
        <span>
          <strong>Eligibility: </strong>
          {scheme.eligibility[0]}
          {scheme.eligibility.length > 1 ? ', and more' : ''}
        </span>
      </div>
      <div className="scheme-card-actions">
        <Button size="sm" variant="primary" onClick={() => onCheckEligibility(scheme)}>
          Check Eligibility
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onViewDetails(scheme)}>
          View Details
        </Button>
      </div>
    </Card>
  )
}
