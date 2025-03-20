//src/hooks/useTextToSpeech.tsx
// src/hooks/useTextToSpeech.tsx
import { useState, useCallback, useEffect } from "react";

interface UseTextToSpeechReturn {
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (!text || isSpeaking) return;

      if (!window.speechSynthesis) {
        console.error("La synthèse vocale n'est pas prise en charge par votre navigateur.");
        return;
      }

      // Annule toute synthèse vocale en cours avant d'en démarrer une nouvelle
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";

      // Sélectionne une voix française si disponible
      if (voices.length > 0) {
        const frenchVoice = voices.find((voice) => voice.lang.includes("fr"));
        if (frenchVoice) {
          utterance.voice = frenchVoice;
        }
      }

      // Gestion des événements de synthèse vocale
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error("Erreur de synthèse vocale:", event.error);
        setIsSpeaking(false);
      };

      // Ajoute un léger délai avant de parler pour éviter les interruptions
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 200);
    },
    [isSpeaking, voices]
  );

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { isSpeaking, speakText, stopSpeaking };
};
