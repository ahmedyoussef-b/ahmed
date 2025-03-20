
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionDisplayProps {
  text: string;
}

const QuestionDisplay = ({ text }: QuestionDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card>
        <CardContent className="pt-4">
          <p className="text-foreground">
            <span className="font-semibold">Votre question :</span> {text}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionDisplay;
