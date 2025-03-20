"use client";
import { useState, useCallback } from "react";

// Déclaration des types pour l'API SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionEvent;
    webkitSpeechRecognition: new () => SpeechRecognitionEvent;
  }
}

interface SpeechRecognitionEvent extends Event {
  stop(): unknown;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface UseSpeechToTextReturn {
  text: string;
  isListening: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const useSpeechToText = (
  onSubmit?: (text: string) => void
): UseSpeechToTextReturn => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("La reconnaissance vocale n'est pas prise en charge par votre navigateur.");
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setError("La reconnaissance vocale n'est pas prise en charge par votre navigateur.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();

    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setText("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setText(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Erreur de reconnaissance vocale:", event.error);
      setError(`Erreur: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (onSubmit && text.trim()) {
        onSubmit(text.trim());
      }
    };

    try {
      recognition.start();
      // Stocker l'instance pour pouvoir l'arrêter plus tard
      (window as { speechToTextRecognition?: SpeechRecognitionEvent }).speechToTextRecognition =
        recognition;
    } catch (err) {
      console.error("Erreur lors du démarrage de la reconnaissance vocale:", err);
      setError("Impossible de démarrer la reconnaissance vocale.");
    }
  }, [onSubmit, text]);

  const stopListening = useCallback(() => {
    const recognition = (window as { speechToTextRecognition?: SpeechRecognitionEvent })
      .speechToTextRecognition;
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  return {
    text,
    isListening,
    error,
    startListening,
    stopListening,
    handleTextChange,
  };
};