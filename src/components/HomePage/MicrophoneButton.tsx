
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const MicrophoneButton = ({ isListening, onClick }: MicrophoneButtonProps) => {
  return (
    <AnimatedSection 
      animation="fade-in-up" 
      delay={200}
      className="flex justify-center my-4"
    >
      <Button
        onClick={onClick}
        className={`p-6 rounded-full transition-colors duration-300 ${
          isListening ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
        }`}
        aria-label={isListening ? "Arrêter l'écoute" : "Commencer l'écoute"}
      >
        {isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </AnimatedSection>
  );
};

export default MicrophoneButton;
