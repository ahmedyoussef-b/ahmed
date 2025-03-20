
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConditionsListType } from "@/types/types";

interface ConditionsListProps {
  conditions: ConditionsListType;
}

const ConditionsList = ({ conditions }: ConditionsListProps) => {
  if (!conditions || conditions.length === 0) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-4">
          <p className="text-muted-foreground">Aucune condition disponible.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition.id } className="p-3 border rounded-md">
              <p>{condition.description}</p>
              <p className="text-sm text-muted-foreground">Type: {condition.type}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConditionsList;
