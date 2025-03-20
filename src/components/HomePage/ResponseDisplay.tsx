
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ResponseDisplayProps {
  textreponse: string;
}

const ResponseDisplay = ({ textreponse }: ResponseDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card className="border-primary/20">
        <CardContent className="pt-4">
          <p className="text-foreground">
            <span className="font-semibold">Réponse :</span> {textreponse}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResponseDisplay;
