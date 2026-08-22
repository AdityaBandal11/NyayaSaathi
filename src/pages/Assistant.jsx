import { useEffect, useRef, useState } from 'react'
import { Bot } from 'lucide-react'
import ChatMessage, { TypingRow } from '../components/ChatMessage.jsx'
import ChatInput from '../components/ChatInput.jsx'
import { chatSuggestions, getMockResponse } from '../data/mockResponses.js'

export default function Assistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    const userMsg = { role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const data = getMockResponse(text)
      setMessages((prev) => [...prev, { role: 'ai', data }])
      setTyping(false)
    }, 1200)
  }

  const hasStarted = messages.length > 0

  return (
    <div className="chat-page">
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
          <div className="suggestions-wrap">
            <p>Try asking about:</p>
            {chatSuggestions.map((s) => (
              <button className="suggestion-chip" key={s} onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}

        {typing && <TypingRow />}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => sendMessage(input.trim())}
        disabled={typing}
      />
    </div>
  )
}
