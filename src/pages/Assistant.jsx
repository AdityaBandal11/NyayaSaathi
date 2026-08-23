import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bot, FileText, Landmark, ListChecks, ShieldCheck } from 'lucide-react'
import ChatMessage, { TypingRow } from '../components/ChatMessage.jsx'
import ChatInput from '../components/ChatInput.jsx'
import SourceCard from '../components/SourceCard.jsx'
import { chatSuggestions, getMockResponse } from '../data/mockResponses.js'
import { useToast } from '../components/Toast.jsx'

export default function Assistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const prefillRef = useRef(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    const prompt = location.state?.prompt
    if (prompt && !prefillRef.current) {
      setInput(prompt)
      prefillRef.current = true
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state, navigate])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    const clean = text.trim()
    if (!clean || typing) return

    const userMsg = { role: 'user', text: clean }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const data = getMockResponse(clean)
      setMessages((prev) => [...prev, { role: 'ai', data }])
      setTyping(false)
    }, 1200)
  }

  const latestAi = [...messages].reverse().find((m) => m.role === 'ai')?.data
  const hasStarted = messages.length > 0

  return (
    <div className="assistant-layout">
      <section className="chat-page assistant-conversation" aria-label="NyayaSaathi AI conversation">
        <div className="chat-topbar">
          <div className="chat-topbar-icon">
            <Bot size={20} />
          </div>
          <div>
            <h2>NyayaSaathi AI</h2>
            <div className="sub">Your Civic Rights Assistant</div>
          </div>
          <span className="status-online">
            <span className="dot" /> AI Online
          </span>
        </div>

        <div className="chat-scroll" ref={scrollRef}>
          {!hasStarted && (
            <div className="suggestions-wrap assistant-empty-state">
              <span className="eyebrow"><ShieldCheck size={14} /> Trusted civic guidance</span>
              <h3>Ask in simple language.</h3>
              <p>NyayaSaathi will turn your situation into rights, documents, next steps and sources.</p>
              <div className="assistant-empty-prompts">
                {chatSuggestions.slice(0, 4).map((s) => (
                  <button className="suggestion-chip" key={s} onClick={() => sendMessage(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} showSources={false} />
          ))}

          {typing && <TypingRow />}
        </div>

        <div className="chat-input-shell">
          <div className="chat-input-suggestions" aria-label="Suggested prompts">
            {chatSuggestions.slice(0, 3).map((s) => (
              <button key={s} onClick={() => sendMessage(s)} disabled={typing}>
                {s}
              </button>
            ))}
          </div>
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => sendMessage(input)}
            disabled={typing}
            onAttach={() => showToast('Attachment support is available in Document Explainer for this prototype.')}
          />
        </div>
      </section>

      <aside className="assistant-context-panel" aria-label="Context and action plan">
        <div className="context-panel-header">
          <span className="eyebrow"><ListChecks size={14} /> Context</span>
          <h3>Action Plan</h3>
          <p>{latestAi ? 'Based on the latest AI response.' : 'Your plan will appear here after the first response.'}</p>
        </div>

        <div className="context-list">
          {(latestAi?.actionPlan || ['Ask a question about your situation.', 'Review the suggested rights and next steps.', 'Use documents and official sources to continue.']).map((step, i) => (
            <div className="context-step" key={step}>
              <span>{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <div className="context-panel-block">
          <h4><FileText size={15} /> Documents</h4>
          <ul>
            {(latestAi?.documents || ['Identity proof', 'Any related notices or receipts']).map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>

        <div className="context-panel-block">
          <h4><Landmark size={15} /> Sources</h4>
          <div className="context-sources">
            {(latestAi?.sources || [{ org: 'Government of India', dept: 'General Civic Information', label: 'Official Information' }]).map((s, i) => (
              <SourceCard key={i} org={s.org} dept={s.dept} label={s.label} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
