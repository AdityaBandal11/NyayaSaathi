import { useState } from 'react'
import { FileCheck2 } from 'lucide-react'
import Modal from './Modal.jsx'
import Button from './Button.jsx'

export default function SchemeModal({ scheme, mode = 'details', onClose, onSave, saved }) {
  const [step, setStep] = useState(mode === 'eligibility' ? 'form' : 'details')
  const [form, setForm] = useState({ age: '', occupation: '', state: '', income: '', category: '' })

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('result')
  }

  if (step === 'form') {
    return (
      <Modal title={`Check Eligibility — ${scheme.name}`} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="elig-age">Age</label>
            <input id="elig-age" type="number" min="0" required value={form.age} onChange={handleChange('age')} placeholder="e.g. 32" />
          </div>
          <div className="field-group">
            <label htmlFor="elig-occupation">Occupation</label>
            <select id="elig-occupation" required value={form.occupation} onChange={handleChange('occupation')}>
              <option value="">Select occupation</option>
              <option>Farmer</option>
              <option>Student</option>
              <option>Worker</option>
              <option>Small Business Owner</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="elig-state">State</label>
            <select id="elig-state" required value={form.state} onChange={handleChange('state')}>
              <option value="">Select state</option>
              <option>Maharashtra</option>
              <option>Uttar Pradesh</option>
              <option>Bihar</option>
              <option>Rajasthan</option>
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="elig-income">Annual Income (₹)</label>
            <input id="elig-income" type="number" min="0" required value={form.income} onChange={handleChange('income')} placeholder="e.g. 180000" />
          </div>
          <div className="field-group">
            <label htmlFor="elig-category">Category</label>
            <select id="elig-category" required value={form.category} onChange={handleChange('category')}>
              <option value="">Select category</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
              <option>Other</option>
            </select>
          </div>
          <Button type="submit" block>
            See Eligibility Result
          </Button>
        </form>
      </Modal>
    )
  }

  if (step === 'result') {
    return (
      <Modal title={`Eligibility Result — ${scheme.name}`} onClose={onClose}>
        <div className="result-banner">
          <div className="icon">🟢</div>
          <h4>You may be eligible</h4>
          <p>This is a prototype result based on the information provided. Please verify with the official scheme portal before applying.</p>
        </div>
        <div style={{ marginTop: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Documents you may need</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {scheme.documents.map((d) => (
              <li key={d} style={{ fontSize: 13.5, color: 'var(--color-text-muted)' }}>
                • {d}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      title={scheme.name}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button icon={FileCheck2} onClick={() => setStep('form')}>
            Check Eligibility
          </Button>
        </>
      }
    >
      <span className="badge badge-blue">{scheme.category}</span>
      <p style={{ marginTop: 12, color: 'var(--color-text-muted)', fontSize: 14 }}>{scheme.description}</p>

      <div style={{ marginTop: 18 }}>
        <h5 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Benefits</h5>
        <p style={{ fontSize: 13.5, color: 'var(--color-text-muted)' }}>{scheme.benefits}</p>
      </div>

      <div style={{ marginTop: 18 }}>
        <h5 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Eligibility</h5>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {scheme.eligibility.map((e) => (
            <li key={e} style={{ fontSize: 13.5, color: 'var(--color-text-muted)' }}>
              • {e}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 18 }}>
        <h5 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Documents Required</h5>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {scheme.documents.map((d) => (
            <li key={d} style={{ fontSize: 13.5, color: 'var(--color-text-muted)' }}>
              • {d}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
        <span className="badge badge-gray">{scheme.state}</span>
        <span className="badge badge-gray">{scheme.ruralUrban}</span>
      </div>

      <Button
        variant={saved ? 'secondary' : 'ghost'}
        size="sm"
        style={{ marginTop: 18 }}
        onClick={() => onSave(scheme.id)}
      >
        {saved ? 'Saved to your list' : 'Save this scheme'}
      </Button>
    </Modal>
  )
}
