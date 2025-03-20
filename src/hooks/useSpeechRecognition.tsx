"use client";
import { useState, useEffect, useCallback } from "react";

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

interface CustomWindow extends Window {
  recognition?: SpeechRecognitionEvent;
}

interface UseSpeechRecognitionReturn {
  text: string;
  isListening: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'API SpeechRecognition est disponible
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("La reconnaissance vocale n'est pas prise en charge par votre navigateur.");
      return;
    }
  }, []);

  const startListening = useCallback(() => {
    if (error) return;

    // Créer une instance de SpeechRecognition
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setError("La reconnaissance vocale n'est pas prise en charge par votre navigateur.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    (window as CustomWindow).recognition = recognition;

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
    };

    // Démarrer la reconnaissance
    try {
      recognition.start();
    } catch (err) {
      console.error("Erreur lors du démarrage de la reconnaissance vocale:", err);
      setError("Impossible de démarrer la reconnaissance vocale.");
    }
  }, [error]);

  const stopListening = useCallback(() => {
    const recognition = (window as CustomWindow).recognition;
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  return { text, isListening, error, startListening, stopListening };
};