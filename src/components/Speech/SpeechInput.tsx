"use client";
import React from "react";
import { useSpeechContext } from "@/contexts/SpeechContext";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import SpeechTextArea from "@/components/HomePage/SpeechTextArea";
import SubmitButton from "@/components/HomePage/SubmitButton";

const SpeechInput = () => {
  const { speechText, setSpeechText, handleSubmit } = useSpeechContext();
  const { isListening: isSpeechListening, handleTextChange } = useSpeechToText();

  // Gestion de la soumission du texte
  const handleSubmitText = () => {
    if (typeof handleSubmit === "function") {
      handleSubmit(speechText); // Passez `speechText` à `handleSubmit`
    } else {
      console.error("handleSubmit n'est pas une fonction");
    }
  };

  return (
    <>
      <SpeechTextArea
        speechText={speechText}
        isSpeechListening={isSpeechListening}
        handleTextChange={(e) => {
          handleTextChange(e); // Gestion de la reconnaissance vocale
          setSpeechText(e.target.value); // Mise à jour du texte dans le contexte
        }}
        setSpeechText={(value) => {
          // Assurez-vous que `value` est bien une chaîne de caractères
          if (typeof value === "string") {
            setSpeechText(value);
          } else if (typeof value === "function") {
            // Si `value` est une fonction de mise à jour, appelez-la avec l'ancienne valeur
            setSpeechText(value(speechText));
          }
        }}
      />
      <SubmitButton
        speechText={speechText}
        onSubmit={handleSubmitText} // Utilisez `handleSubmitText` pour soumettre le texte
      />
    </>
  );
};

export default SpeechInput;