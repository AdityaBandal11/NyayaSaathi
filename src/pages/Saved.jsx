import { useState } from 'react'
import { X, Bookmark, MessageSquareText } from 'lucide-react'
import Card from '../components/Card.jsx'
import { schemes } from '../data/schemes.js'
import { initialSavedSchemeIds, initialSavedResponses } from '../data/applications.js'
import { useToast } from '../components/Toast.jsx'

export default function Saved() {
  const { showToast } = useToast()
  const [savedSchemeIds, setSavedSchemeIds] = useState(initialSavedSchemeIds)
  const [savedResponses, setSavedResponses] = useState(initialSavedResponses)

  const savedSchemes = schemes.filter((s) => savedSchemeIds.includes(s.id))

  const removeScheme = (id) => {
    setSavedSchemeIds((prev) => prev.filter((x) => x !== id))
    showToast('Removed from saved schemes')
  }

  const removeResponse = (id) => {
    setSavedResponses((prev) => prev.filter((x) => x.id !== id))
    showToast('Removed from saved information')
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Saved</h1>
          <p>Schemes and information you've bookmarked for later.</p>
        </div>
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Saved Schemes</h3>
      {savedSchemes.length === 0 ? (
        <div className="empty-state" style={{ padding: '30px 20px' }}>
          <Bookmark size={30} />
          <h3>No saved schemes yet</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 30 }}>
          {savedSchemes.map((s) => (
            <Card key={s.id} className="saved-item">
              <div>
                <h4>{s.name}</h4>
                <p>{s.category}</p>
              </div>
              <button className="remove-btn" onClick={() => removeScheme(s.id)} aria-label={`Remove ${s.name}`}>
                <X size={16} />
              </button>
            </Card>
          ))}
        </div>
      )}

      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Saved Information</h3>
      {savedResponses.length === 0 ? (
        <div className="empty-state" style={{ padding: '30px 20px' }}>
          <MessageSquareText size={30} />
          <h3>No saved responses yet</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {savedResponses.map((r) => (
            <Card key={r.id} className="saved-item">
              <div>
                <h4>{r.title}</h4>
                <p>{r.snippet}</p>
              </div>
              <button className="remove-btn" onClick={() => removeResponse(r.id)} aria-label={`Remove ${r.title}`}>
                <X size={16} />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
