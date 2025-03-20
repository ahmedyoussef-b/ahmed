import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface SubmitButtonProps {
  speechText: string;
  onSubmit: () => void;
}

const SubmitButton = ({ speechText = "", onSubmit }: SubmitButtonProps) => {
  const isDisabled = typeof speechText !== "string" || !speechText.trim();

  return (
    <AnimatedSection animation="fade-in-up" delay={500} className="flex justify-center">
      <Button
        onClick={onSubmit}
        disabled={isDisabled}
        className="px-6 py-2 flex items-center gap-2"
      >
        <Send className="h-4 w-4" />
        Envoyer
      </Button>
    </AnimatedSection>
  );
};

export default SubmitButton;