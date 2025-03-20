"use client"
import React from "react";
import { SpeechProvider, useSpeechContext } from "@/contexts/SpeechContext";
import SpeechControls from "@/components/Speech/SpeechControls";
import SpeechDisplay from "@/components/Speech/SpeechDisplay";
import SpeakingControls from "@/components/Speech/SpeakingControls";
import SpeechInput from "@/components/Speech/SpeechInput";
import ResultsDisplay from "@/components/Speech/ResultsDisplay";
import AlarmManagement from "@/components/HomePage/AlarmManagement";

// AlarmManagement consomme maintenant le contexte directement
const AlarmManagementWrapper = () => {
  const { selectedAlarme, setShowAlarmModal, alarmModalData } = useSpeechContext();
  return (
    <AlarmManagement
      selectedAlarme={selectedAlarme}
      onClose={() => setShowAlarmModal(false)}
      alarmModalData={alarmModalData}
    />
  );
};

// Composant SpeechContent
const SpeechContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent w-full items-center">
      <main className="grid grid-cols-1 gap-4 p-6 max-w-6xl mx-auto w-full bg-transparent">
        <SpeechControls />
        <SpeakingControls />
        <SpeechDisplay />
        <SpeechInput />
        <AlarmManagementWrapper />
        <ResultsDisplay />
      </main>
    </div>
  );
};

// Composant principal de la page
const SpeechRecognitionPage = () => {
  return (
    <SpeechProvider>
      <SpeechContent />
    </SpeechProvider>
  );
};

export default SpeechRecognitionPage;

