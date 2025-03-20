"use client"
import React from "react";
import { useSpeechContext } from "@/contexts/SpeechContext";
const SpeakingControls = () => {
  const { isSpeaking, stopSpeaking } = useSpeechContext();

  if (!isSpeaking) return null;

  return (
    <>
      <button
        onClick={stopSpeaking}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        aria-label="Arrêter la lecture"
      >
        Arrêter la lecture
      </button>
      <p className="text-green-500">Lecture en cours...</p>
    </>
  );
};

export default SpeakingControls;
