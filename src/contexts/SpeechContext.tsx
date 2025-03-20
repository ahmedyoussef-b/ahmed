//src/contexts/SpeechContext.tsx
"use client";
import React, { createContext, useState, useContext, useCallback, ReactNode } from "react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import {
 
  Alarme,
  AlarmModalData,
  ResultData,
} from "@/types/types";




interface SpeechContextType {
  responseText: string;
  setResponseText: (text: string) => void;
  results: { type: string; data: ResultData } | null;
  setResults: (results: { type: string; data: ResultData } | null) => void;
  speechText: string;
  setSpeechText: (text: string) => void;
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  selectedAlarme: string | null;
  setSelectedAlarme: (alarme: string | null) => void;
  showAlarmModal: boolean;
  setShowAlarmModal: (show: boolean) => void;
  alarmModalData: AlarmModalData | null;
  setAlarmModalData: (data: AlarmModalData | null) => void;
  showResponseTextarea: boolean;
  setShowResponseTextarea: (show: boolean) => void;
  handleSubmit: (submittedText: string) => Promise<void>;
  handleAddAlarme: (alarme: Alarme) => Promise<void>;
  handleUpdateAlarme: (id: string, alarme: Partial<Alarme>) => Promise<void>;
  handleDeleteAlarme: (id: string) => Promise<void>;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export const useSpeechContext = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error("useSpeechContext must be used within a SpeechProvider");
  }
  return context;
};

interface SpeechProviderProps {
  children: ReactNode;
}

export function SpeechProvider({ children }: SpeechProviderProps) {
  const [showResponseTextarea, setShowResponseTextarea] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [results, setResults] = useState<{ type: string; data: ResultData } | null>(null);
  const [speechText, setSpeechText] = useState("");
  const { speakText, stopSpeaking, isSpeaking } = useTextToSpeech();
  const [selectedAlarme, setSelectedAlarme] = useState<string | null>(null);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [alarmModalData, setAlarmModalData] = useState<AlarmModalData | null>(null);

  // Ajouter une alarme
  const handleAddAlarme = async (alarme: Alarme) => {
    console.log("alarme ajouter", alarme);
    try {
      const response = await fetch("/api/alarme/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alarmModalData),
      });
      console.log("response ajouter", response);

      if (!response.ok) {
        throw new Error(`Erreur lors de l'ajout de l'alarme: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Alarme ajoutée:", data);
      setResponseText("Alarme ajoutée avec succès.");
      speakText("Alarme ajoutée avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'alarme:", error);
      setResponseText("Erreur lors de l'ajout de l'alarme.");
      speakText("Erreur lors de l'ajout de l'alarme.");
    }
  };

  // Modifier une alarme
  const handleUpdateAlarme = async (id: string, alarme: Partial<Alarme>) => {
    console.log("alarme modifier", alarme);

    try {
      const response = await fetch(`/api/alarme/modifier/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alarme),
      });
      console.log("response response", response);

      if (!response.ok) {
        throw new Error(`Erreur lors de la modification de l'alarme: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Alarme modifiée:", data);
      setResponseText("Alarme modifiée avec succès.");
      speakText("Alarme modifiée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la modification de l'alarme:", error);
      setResponseText("Erreur lors de la modification de l'alarme.");
      speakText("Erreur lors de la modification de l'alarme.");
    }
  };

  // Supprimer une alarme
  const handleDeleteAlarme = async (id: string) => {
    console.log("alarme supprimer", id);

    try {
      const response = await fetch(`/api/alarme/supprimer/${id}`, {
        method: "DELETE",
      });
      console.log("alarme response", id);

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression de l'alarme: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Alarme supprimée:", data);
      setResponseText("Alarme supprimée avec succès.");
      speakText("Alarme supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'alarme:", error);
      setResponseText("Erreur lors de la suppression de l'alarme.");
      speakText("Erreur lors de la suppression de l'alarme.");
    }
  };

  // Soumettre une question ou une requête
  const handleSubmit = useCallback(
    async (submittedText: string) => {
      const normalizedText = submittedText.trim().toLowerCase();
      console.log("normalizedText", normalizedText);

      if (!normalizedText || isSpeaking) return;

      try {
        const res = await fetch("/api/question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ motCleText: normalizedText }),
        });

        if (!res.ok) {
          console.error("Erreur API :", await res.text());
          throw new Error("Erreur API lors de la récupération des données.");
        }

        const data = await res.json();
        console.log("data", data);

        // Formater les résultats pour s'assurer que `results.data` est un tableau
        let formattedData: ResultData;

        switch (data.type) {
          case "exact":
            formattedData = data.result;
            break;
          case "range":
            formattedData = {
              niveauInferieur: data.niveauInferieur,
              niveauSuperieur: data.niveauSuperieur,
            } as unknown as ResultData;
            break;
          case "all":
          case "regroupements":
          case "alarmes":
          case "ConditionDemarrage":
          case "ConditionDeclenchement":
          case "ConditionOuverture":
          case "ConditionFermeture":
            formattedData = Array.isArray(data.results) ? data.results : [data.results];
            break;
          default:
            formattedData = null;
        }

        setResults({
          type: data.type,
          data: formattedData,
        });

        if (data.type === "nouvelle_alarme") {
          setAlarmModalData({
            message: data.message ,
            id: data.id,
            action: ["corriger", "supprimer", "ajouter"],
            nom:data.nom

          });
          setShowAlarmModal(true);
          setSelectedAlarme(data.suggestion?.mot || null);
          return;
        }

        if (data.type === "alarme") {
          setResults({
            type: "alarme",
            data: data.result,
          });
          setResponseText(data.vocalMessage || `Détails de l'alarme "${data.result.nom}".`);
          speakText(data.vocalMessage || `Détails de l'alarme "${data.result.nom}".`);
        }

        // Gérer la réponse vocale
        if (data.type === "exact") {
          setResponseText(
            `Détails pour le niveau ${data.result?.reglage ?? "Inconnu"} : ${data.result?.description ?? "Aucune information disponible"}`
          );
          speakText(`Détails pour le niveau ${data.result.reglage}.`);
        } else if (data.type === "range") {
          setResponseText("Voici les niveaux proches :");
          speakText(`Attention, le niveau inférieur est ${data.niveauInferieur.reglage}.`);
        } else if (data.type === "all") {
          setResponseText("Voici les niveaux disponibles :");
          speakText("Voici les niveaux disponibles.");
        } else if (data.type === "regroupements") {
          setResponseText("Voici les regroupements de niveaux :");
          speakText("Voici les regroupements de niveaux.");
        } else if (data.type === "alarmes") {
          setResponseText("Voici les alarmes correspondantes :");
          speakText("Voici les alarmes correspondantes.");
        } else if (
          data.type === "ConditionDemarrage" ||
          data.type === "ConditionDeclenchement" ||
          data.type === "ConditionOuverture" ||
          data.type === "ConditionFermeture"
        ) {
          setResponseText(`Voici les conditions de ${data.type} :`);
          speakText(`Voici les conditions de ${data.type}.`);
        } else {
          setResponseText("Aucune information trouvée.");
          speakText("Aucune information trouvée.");
        }

        setShowResponseTextarea(true);
      } catch (error) {
        console.error("Erreur lors de la soumission :", error);
        setResponseText("Une erreur s'est produite.");
        speakText("Une erreur s'est produite.");
      }
    },
    [isSpeaking, speakText]
  );

  const value = {
    responseText,
    setResponseText,
    results,
    setResults,
    speechText,
    setSpeechText,
    isSpeaking,
    speakText,
    stopSpeaking,
    selectedAlarme,
    setSelectedAlarme,
    showAlarmModal,
    setShowAlarmModal,
    alarmModalData,
    setAlarmModalData,
    showResponseTextarea,
    setShowResponseTextarea,
    handleSubmit,
    handleAddAlarme,
    handleUpdateAlarme,
    handleDeleteAlarme,
  };

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}