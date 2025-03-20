"use client"
import React, { useCallback } from "react";
import { useSpeechContext } from "@/contexts/SpeechContext"; 
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import MicrophoneButton from "@/components/HomePage/MicrophoneButton";
import MicrophoneStatus from "@/components/HomePage/MicrophoneStatus";
import ErrorDisplay from "@/components/HomePage/ErrorDisplay";

const SpeechControls = () => {
  const { setSpeechText, handleSubmit } = useSpeechContext();
  const { text, isListening: isRecognitionListening, error: recognitionError, stopListening: stopRecognitionListening } = useSpeechRecognition();
  
  const {
    isListening: isSpeechListening,
    error: speechError,
    startListening: startSpeechListening,
    stopListening: stopSpeechListening,
  } = useSpeechToText(handleSubmit);

  React.useEffect(() => {
    setSpeechText(text);
  }, [text, setSpeechText]);

  const handleMicrophoneClick = useCallback(() => {
    if (isRecognitionListening || isSpeechListening) {
      stopRecognitionListening();
      stopSpeechListening();
    } else {
      startSpeechListening();
    }
  }, [isRecognitionListening, isSpeechListening, stopRecognitionListening, stopSpeechListening, startSpeechListening]);

  return (
    <>
      <MicrophoneButton 
        isListening={isRecognitionListening || isSpeechListening} 
        onClick={handleMicrophoneClick} 
      />
      <MicrophoneStatus 
        isListening={isRecognitionListening || isSpeechListening} 
      />
      <ErrorDisplay 
        error={recognitionError || speechError} 
      />
    </>
  );
};

export default SpeechControls;
