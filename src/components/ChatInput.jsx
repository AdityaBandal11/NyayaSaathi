import { useRef } from 'react';
import { ArrowUp, Paperclip } from 'lucide-react';
import VoiceButton from './VoiceButton.jsx';
import { useLanguage } from '../LanguageContext.jsx';

export default function ChatInput({
  value,
  onChange,
  onSend,
  onAttach,
  disabled,
  placeholder,
  isListening,
  onVoiceToggle,
  listeningError,
}) {
  const taRef = useRef(null);
  const { t } = useLanguage();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSend();
    }
  };

  return (
    <div className="chat-input-wrapper">
      {isListening && (
        <div className="listening-banner msg-animate">
          <span className="listening-pulse-dot" />
          <span className="listening-text">🎤 {t('listening', 'Listening...')}</span>
        </div>
      )}
      {listeningError && (
        <div className="listening-error-banner msg-animate">
          <span>⚠️ {listeningError}</span>
        </div>
      )}
      <div className={`chat-input-bar ${isListening ? 'listening-active' : ''}`}>
        <button
          type="button"
          className="attach-btn"
          onClick={onAttach}
          aria-label={t('uploadDocument', 'Attach document')}
        >
          <Paperclip size={18} />
        </button>

        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isListening
              ? t('listening', 'Listening...')
              : placeholder || t('chatPlaceholder', 'Describe your situation in simple language...')
          }
          rows={1}
          aria-label={t('chatPlaceholder', 'Message NyayaSaathi AI')}
        />

        <VoiceButton
          isListening={isListening}
          onClick={onVoiceToggle}
          disabled={disabled}
        />

        <button
          type="button"
          className="send-btn"
          onClick={() => value.trim() && onSend()}
          disabled={disabled || !value.trim()}
          aria-label={t('send', 'Send message')}
        >
          <ArrowUp size={19} />
        </button>
      </div>
    </div>
  );
}
