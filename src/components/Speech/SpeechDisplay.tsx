"use client"
import React from "react";
import { useSpeechContext } from "@/contexts/SpeechContext";
 import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { AnimatePresence } from "framer-motion";
import QuestionDisplay from "@/components/HomePage/QuestionDisplay";
import ResponseDisplay from "@/components/HomePage/ResponseDisplay";

const SpeechDisplay = () => {
  const { responseText } = useSpeechContext();
  const { text } = useSpeechRecognition();

  return (
    <AnimatePresence>
      {text && <QuestionDisplay text={text} />}
      {responseText && <ResponseDisplay textreponse={responseText} />}
    </AnimatePresence>
  );
};

export default SpeechDisplay;
