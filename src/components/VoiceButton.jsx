import { Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function VoiceButton({ isListening, onClick, disabled }) {
  const { t } = useLanguage();

  const titleText = isListening
    ? t('stopListening', 'Stop listening')
    : t('startVoiceInput', 'Start voice input');

  return (
    <button
      type="button"
      className={`btn-icon voice-btn ${isListening ? 'listening' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={titleText}
      aria-label={titleText}
    >
      {isListening ? (
        <span className="mic-listening-wrapper">
          <MicOff size={18} className="mic-icon pulse-red" />
          <span className="listening-pulse-ring" />
        </span>
      ) : (
        <Mic size={18} className="mic-icon" />
      )}
    </button>
  );
}
