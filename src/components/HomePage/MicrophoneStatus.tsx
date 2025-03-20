
import React from "react";
import AnimatedSection from "@/components/AnimatedSection";

interface MicrophoneStatusProps {
  isListening: boolean;
}

const MicrophoneStatus = ({ isListening }: MicrophoneStatusProps) => {
  return (
    <AnimatedSection 
      animation="fade-in-up" 
      delay={300}
      className="flex justify-center text-center"
    >
      {isListening ? (
        <p className="text-green-500 font-medium">
          Microphone actif - En écoute...
        </p>
      ) : (
        <p className="text-muted-foreground">
          Cliquez sur le microphone pour parler
        </p>
      )}
    </AnimatedSection>
  );
};

export default MicrophoneStatus;
