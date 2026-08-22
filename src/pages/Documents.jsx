import { useRef, useState } from 'react'
import { UploadCloud, FileText, CalendarDays, ListChecks, AlertTriangle, ShieldQuestion, Send } from 'lucide-react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import DocumentCard from '../components/DocumentCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useToast } from '../components/Toast.jsx'

const HISTORY = [
  { name: 'Rental Agreement.pdf', type: 'Rental Agreement', date: '2 days ago' },
  { name: 'Electricity Notice.pdf', type: 'Utility Notice', date: '1 week ago' },
]

const MOCK_ANALYSIS = {
  type: 'Rental Agreement',
  points: ['11-month rental duration', 'Deposit amount: ₹50,000', '1-month notice period', 'Maintenance charges shared 50/50'],
  dates: ['Agreement start: 1 April 2026', 'Agreement end: 28 February 2027', 'Rent due date: 5th of every month'],
  responsibilities: ['Pay rent on time each month', 'Maintain the property in good condition', 'Provide notice before vacating'],
  concerns: ['Deposit return timeline is not clearly specified', 'No clause on maintenance responsibility for major repairs'],
}

export default function Documents() {
  const { showToast } = useToast()
  const [stage, setStage] = useState('idle') // idle | analyzing | done
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const [askInput, setAskInput] = useState('')
  const inputRef = useRef(null)

  const simulate = (name) => {
    setFileName(name)
    setStage('analyzing')
    setTimeout(() => {
      setStage('done')
      showToast('Document analysis complete')
    }, 1600)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) simulate(file.name)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    simulate(file ? file.name : 'Uploaded Document.pdf')
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Document Explainer</h1>
          <p>Upload a government notice, legal document or official PDF.</p>
        </div>
      </div>

      {stage === 'idle' && (
        <div
          className={`upload-card ${dragging ? 'dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="upload-icon">
            <UploadCloud size={26} />
          </div>
          <h3>Understand Your Document</h3>
          <p>Drag and drop a file here, or choose a file from your device.</p>
          <Button onClick={() => inputRef.current.click()}>Choose File</Button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      )}

      {stage === 'analyzing' && (
        <Card className="analyzing-wrap">
          <LoadingSpinner />
          <div style={{ fontWeight: 600 }}>Analyzing document...</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-faint)' }}>{fileName}</div>
        </Card>
      )}

      {stage === 'done' && (
        <div>
          <Card style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <div className="doc-history-icon"><FileText size={18} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{fileName}</div>
              <span className="badge badge-green">Analysis Complete</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setStage('idle')}>
              Upload Another
            </Button>
          </Card>

          <div className="doc-result-grid">
            <Card className="doc-result-card">
              <h4><FileText size={15} /> Document Type</h4>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{MOCK_ANALYSIS.type}</p>
            </Card>
            <Card className="doc-result-card">
              <h4><ListChecks size={15} /> Important Points</h4>
              <ul>{MOCK_ANALYSIS.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </Card>
            <Card className="doc-result-card">
              <h4><CalendarDays size={15} /> Important Dates</h4>
              <ul>{MOCK_ANALYSIS.dates.map((p) => <li key={p}>{p}</li>)}</ul>
            </Card>
            <Card className="doc-result-card">
              <h4><ShieldQuestion size={15} /> Your Responsibilities</h4>
              <ul>{MOCK_ANALYSIS.responsibilities.map((p) => <li key={p}>{p}</li>)}</ul>
            </Card>
            <Card className="doc-result-card concern" style={{ gridColumn: '1 / -1' }}>
              <h4 style={{ color: 'var(--color-amber)' }}><AlertTriangle size={15} /> Possible Concerns</h4>
              <ul>{MOCK_ANALYSIS.concerns.map((p) => <li key={p}>{p}</li>)}</ul>
            </Card>
          </div>

          <Card style={{ padding: '18px 20px', marginTop: 16 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Ask about this document</h4>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={askInput}
                onChange={(e) => setAskInput(e.target.value)}
                placeholder="e.g. What happens if I pay rent late?"
                style={{ flex: 1, padding: '11px 14px', borderRadius: 10, border: '1.5px solid var(--color-border-strong)' }}
                aria-label="Ask about this document"
              />
              <Button
                icon={Send}
                onClick={() => {
                  if (!askInput.trim()) return
                  showToast('Your question has been noted — this is a prototype response.')
                  setAskInput('')
                }}
              >
                Ask
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div style={{ marginTop: 34 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Recently Analyzed</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {HISTORY.map((h) => (
            <DocumentCard key={h.name} name={h.name} type={h.type} date={h.date} onClick={() => simulate(h.name)} />
          ))}
        </div>
      </div>
    </div>
  )
}
