import { Landmark } from 'lucide-react'

export default function SourceCard({ org, dept, label }) {
  return (
    <div className="card source-card">
      <div className="source-card-icon">
        <Landmark size={16} />
      </div>
      <div>
        <h5>{org}</h5>
        <span>
          {dept} · {label}
        </span>
      </div>
    </div>
  )
}
