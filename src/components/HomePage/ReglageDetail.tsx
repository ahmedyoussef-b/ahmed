
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReglageDetailType } from "@/types/types";

interface ReglageDetailProps {
  reglage: ReglageDetailType;
}

const ReglageDetail = ({ reglage }: ReglageDetailProps) => {
  if (!reglage) return null;

  return (
    <Card className="mb-4 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Niveau: {reglage.reglage}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><span className="font-medium">Instrument:</span> {reglage.instrument}</p>
        <p><span className="font-medium">Action:</span> {reglage.action}</p>
        {reglage.description && (
          <p><span className="font-medium">Description:</span> {reglage.description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReglageDetail;
