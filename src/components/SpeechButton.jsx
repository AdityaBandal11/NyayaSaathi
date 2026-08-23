import { useState, useEffect } from 'react';
import { Volume2, Square, VolumeX } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';
import { useToast } from './Toast.jsx';

// Active global speech reference so only one message is spoken at a time
let activeUtterance = null;
let activeSetSpeakingState = null;

export default function SpeechButton({ textToSpeak, label = '' }) {
  const { currentLocale, t } = useLanguage();
  const { showToast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => {
      // Clean up if component unmounts while speaking
      if (isSpeaking && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);

  const handleToggleSpeech = () => {
    if (!isSupported) {
      showToast(t('ttsNotSupported', 'Text-to-speech is not supported in this browser.'));
      return;
    }

    const synth = window.speechSynthesis;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      activeUtterance = null;
      activeSetSpeakingState = null;
      return;
    }

    // Stop any existing speech playing
    synth.cancel();
    if (activeSetSpeakingState) {
      activeSetSpeakingState(false);
    }

    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLocale;
    utterance.rate = 0.95; // Clear natural speed

    utterance.onstart = () => {
      setIsSpeaking(true);
      activeUtterance = utterance;
      activeSetSpeakingState = setIsSpeaking;
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      activeUtterance = null;
      activeSetSpeakingState = null;
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
      activeUtterance = null;
      activeSetSpeakingState = null;
    };

    synth.speak(utterance);
  };

  const actionTitle = isSpeaking
    ? t('stopSpeaking', 'Stop speaking')
    : t('readAloud', 'Read response aloud');

  return (
    <button
      type="button"
      className={`btn btn-secondary btn-sm speech-btn ${isSpeaking ? 'speaking' : ''}`}
      onClick={handleToggleSpeech}
      title={actionTitle}
      aria-label={actionTitle}
    >
      {isSpeaking ? (
        <>
          <Square size={14} className="stop-icon" />
          <span>{t('stopSpeaking', 'Stop')}</span>
        </>
      ) : (
        <>
          <Volume2 size={14} className="volume-icon" />
          <span>{label || t('readAloud', 'Listen')}</span>
        </>
      )}
    </button>
  );
}
