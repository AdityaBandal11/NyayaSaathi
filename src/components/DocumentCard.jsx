import { FileText, ChevronRight } from 'lucide-react'

export default function DocumentCard({ name, type, date, onClick }) {
  return (
    <button className="card doc-history-item" onClick={onClick} style={{ width: '100%', textAlign: 'left' }}>
      <div className="doc-history-icon">
        <FileText size={18} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--color-text-faint)' }}>
          {type} · {date}
        </div>
      </div>
      <ChevronRight size={16} color="var(--color-text-faint)" />
    </button>
  )
}
