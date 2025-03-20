//src/app/components/Dashboard.tsx
"use client";
import React from "react";
import { SpeechProvider, useSpeechContext } from "@/contexts/SpeechContext";
import SpeechControls from "@/components/Speech/SpeechControls";
import SpeechDisplay from "@/components/Speech/SpeechDisplay";
import SpeakingControls from "@/components/Speech/SpeakingControls";
import SpeechInput from "@/components/Speech/SpeechInput";
import ResultsDisplay from "@/components/Speech/ResultsDisplay";
import AlarmManagement from "@/components/HomePage/AlarmManagement";
import { ErrorBoundary } from "react-error-boundary";

// Composant SectionHeader réutilisable
const SectionHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
    <p className="text-muted-foreground mb-8">{description}</p>
  </div>
);

// AlarmManagementWrapper avec React.memo
const AlarmManagementWrapper = React.memo(() => {
  const { selectedAlarme, setShowAlarmModal, alarmModalData } = useSpeechContext();
  return (
    <AlarmManagement
      selectedAlarme={selectedAlarme}
      onClose={() => setShowAlarmModal(false)}
      alarmModalData={alarmModalData}
    />
  );
});

AlarmManagementWrapper.displayName = "AlarmManagementWrapper";

// Composant DashboardContent
const DashboardContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent w-full items-center">
      <main className="grid grid-cols-1 gap-4 p-6 max-w-6xl mx-auto w-full bg-transparent">
        <SectionHeader
          title="Tableau de Bord"
          description="Contrôle vocal et gestion des alarmes"
        />
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

// Composant principal Dashboard
const Dashboard = () => {
  return (
    <SpeechProvider>
      <ErrorBoundary fallback={<p>Une erreur s&apos;est produite.</p>}>
        <DashboardContent />
      </ErrorBoundary>
    </SpeechProvider>
  );
};

export default Dashboard;