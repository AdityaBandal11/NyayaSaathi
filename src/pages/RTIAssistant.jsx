import { useState } from 'react'
import { Check, Copy, Download, RefreshCcw, Pencil, ArrowRight, ArrowLeft } from 'lucide-react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { useToast } from '../components/Toast.jsx'

const DEPARTMENTS = [
  'Municipal Corporation',
  'Public Works Department',
  'Revenue Department',
  'Police Department',
  'Education Department',
  'Health Department',
  'Electricity Board',
  'Water Supply Department',
]

const STATE_LIST = [
  'Maharashtra',
  'Uttar Pradesh',
  'Bihar',
  'Rajasthan',
  'Tamil Nadu',
  'Karnataka',
  'Gujarat',
  'West Bengal',
]

const STEP_LABELS = ['Your Question', 'Department', 'State', 'Review']

export default function RTIAssistant() {
  const { showToast } = useToast()
  const [step, setStep] = useState(1)
  const [question, setQuestion] = useState('')
  const [department, setDepartment] = useState('')
  const [state, setState] = useState('')

  const reset = () => {
    setStep(1)
    setQuestion('')
    setDepartment('')
    setState('')
  }

  const rtiText = `RIGHT TO INFORMATION APPLICATION

To,
The Public Information Officer

Department: ${department || '[selected department]'}
State: ${state || '[selected state]'}

Subject:
Request for information regarding ${question ? question.slice(0, 60) : '[your query]'}${question && question.length > 60 ? '...' : ''}

Information Requested:
${question || '[your question]'}

Applicant:
Aditya`

  const canProceed = (step === 1 && question.trim().length > 0) || (step === 2 && department) || (step === 3 && state)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rtiText)
      showToast('RTI draft copied')
    } catch {
      showToast('Copy not supported on this device')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([rtiText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'RTI_Application.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('RTI draft downloaded')
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>RTI Assistant</h1>
          <p>Draft a Right to Information application in four simple steps.</p>
        </div>
      </div>

      <div className="wizard-progress">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1
          const isDone = step > n
          const isActive = step === n
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: n < 4 ? 1 : 'unset' }}>
              <div className={`wizard-step-dot ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                {isDone ? <Check size={14} /> : n}
              </div>
              {n < 4 && <div className={`wizard-line ${isDone ? 'done' : ''}`} />}
            </div>
          )
        })}
      </div>

      <Card className="wizard-card">
        {step === 1 && (
          <>
            <h2>What information do you need?</h2>
            <p className="hint">Describe what you'd like to know from the government department, in your own words.</p>
            <div className="field-group">
              <textarea
                rows={6}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. I want to know the status of the road repair application I submitted for my locality in March..."
                aria-label="Your RTI question"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Which department is related to your question?</h2>
            <p className="hint">Select the government department most likely to hold this information.</p>
            <div className="field-group">
              <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Select department">
                <option value="">Select a department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Select your state</h2>
            <p className="hint">This helps direct the application to the right state authority.</p>
            <div className="field-group">
              <select value={state} onChange={(e) => setState(e.target.value)} aria-label="Select state">
                <option value="">Select a state</option>
                {STATE_LIST.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Review your application</h2>
            <p className="hint">Here is your generated RTI application. You can edit, copy or download it.</p>
            <div className="rti-preview">{rtiText}</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <Button variant="secondary" size="sm" icon={Pencil} onClick={() => setStep(1)}>
                Edit
              </Button>
              <Button variant="secondary" size="sm" icon={Copy} onClick={handleCopy}>
                Copy
              </Button>
              <Button size="sm" icon={Download} onClick={handleDownload}>
                Download
              </Button>
              <Button variant="ghost" size="sm" icon={RefreshCcw} onClick={reset}>
                Start Again
              </Button>
            </div>
          </>
        )}

        {step < 4 && (
          <div className="wizard-actions">
            <Button variant="secondary" icon={ArrowLeft} onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
              Back
            </Button>
            <Button icon={ArrowRight} iconPosition="right" onClick={() => setStep((s) => s + 1)} disabled={!canProceed}>
              {step === 3 ? 'Review Application' : 'Next'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
