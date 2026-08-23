import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeechRecognition({ lang = 'en-IN', onTranscript } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const SpeechRecognitionClass =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const isSupported = Boolean(SpeechRecognitionClass);

  useEffect(() => {
    if (!isSupported) return;

    try {
      const instance = new SpeechRecognitionClass();
      instance.continuous = true;
      instance.interimResults = true;
      instance.lang = lang;

      instance.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      instance.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (onTranscript) {
          onTranscript(currentTranscript);
        }
      };

      instance.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setError('Microphone access was denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          // ignore transient quietness error
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
      };

      instance.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = instance;
    } catch (err) {
      console.error('Failed to initialize Speech Recognition:', err);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [SpeechRecognitionClass, isSupported, lang, onTranscript]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Voice input is not supported in this browser.');
      return;
    }
    setError(null);
    setTranscript('');
    try {
      if (recognitionRef.current) {
        recognitionRef.current.lang = lang;
        recognitionRef.current.start();
      }
    } catch (err) {
      // If already started, ignore or restart
      console.warn('SpeechRecognition start error:', err);
    }
  }, [isSupported, lang]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('SpeechRecognition stop error:', err);
      }
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
