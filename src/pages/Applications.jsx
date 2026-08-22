import { useState } from 'react'
import { ClipboardList } from 'lucide-react'
import Card from '../components/Card.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import { initialApplications } from '../data/applications.js'

export default function Applications() {
  const [applications] = useState(initialApplications)
  const [active, setActive] = useState(null)

  return (
    <div>
      <div className="page-header">
        <div>
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
        <Card style={{ overflow: 'hidden' }}>
          <table className="app-table">
            <thead>
              <tr>
                <th>Application</th>
                <th>Type</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a.id} onClick={() => setActive(a)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-text-faint)' }}>{a.subtitle}</div>
                  </td>
                  <td>{a.type}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td style={{ color: 'var(--color-text-faint)' }}>{a.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <div className="app-cards">
        {applications.map((a) => (
          <Card key={a.id} className="app-list-card" onClick={() => setActive(a)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{a.title}</div>
              <StatusBadge status={a.status} />
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{a.subtitle}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-faint)' }}>{a.type} · {a.updated}</div>
          </Card>
        ))}
      </div>

      {active && (
        <Modal
          title={active.title}
          onClose={() => setActive(null)}
          footer={<Button variant="secondary" onClick={() => setActive(null)}>Close</Button>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <StatusBadge status={active.status} />
            </div>
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>{active.subtitle}</p>
            <div style={{ fontSize: 13, color: 'var(--color-text-faint)' }}>
              Type: {active.type} · Last updated {active.updated}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
