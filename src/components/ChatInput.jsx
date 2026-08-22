import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ChatInput({ value, onChange, onSend, disabled, placeholder }) {
  const taRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onSend()
    }
  }

  return (
    <div className="chat-input-bar">
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Describe your situation in simple language...'}
        rows={1}
        aria-label="Message NyayaSaathi AI"
      />
      <button
        className="send-btn"
        onClick={() => value.trim() && onSend()}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <ArrowUp size={19} />
      </button>
    </div>
  )
}
