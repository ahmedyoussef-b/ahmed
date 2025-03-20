
import React from "react";
import AnimatedSection from "@/components/AnimatedSection";

interface SpeechTextAreaProps {
  speechText: string;
  isSpeechListening: boolean;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setSpeechText: React.Dispatch<React.SetStateAction<string>>;
}

const SpeechTextArea = ({
  speechText,
  isSpeechListening,
  handleTextChange,
  setSpeechText,
}: SpeechTextAreaProps) => {
  return (
    <AnimatedSection animation="fade-in-up" delay={400} className="w-full">
      <div className="relative">
        <textarea
          className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
          placeholder="Tapez votre question ou cliquez sur le microphone pour parler..."
          value={speechText}
          onChange={handleTextChange}
          disabled={isSpeechListening}
        />
        {!isSpeechListening && speechText && (
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={() => setSpeechText("")}
            aria-label="Effacer le texte"
          >
            ✕
          </button>
        )}
      </div>
    </AnimatedSection>
  );
};

export default SpeechTextArea;
