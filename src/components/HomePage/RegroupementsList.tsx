
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Regroupement } from "@/types/types";

interface RegroupementsListProps {
  regroupements: Regroupement[];
}

const RegroupementsList = ({ regroupements }: RegroupementsListProps) => {
  console.log("regrouppement du reg list", regroupements)
  if (!regroupements || regroupements.length === 0) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-4">
          <p className="text-muted-foreground">Aucun regroupement disponible.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {regroupements.map((regroupement) => (
        <Card key={regroupement.nom} className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">{regroupement.nom}</CardTitle>
          </CardHeader>
          <CardContent>
            {regroupement.description && <p>{regroupement.description}</p>}
            {regroupement.reglages && regroupement.reglages.length > 0 && (
              <div className="mt-2">
                <h3 className="font-medium mb-2">Réglages associés:</h3>
                <ul className="space-y-1 pl-4">
                  {regroupement.reglages.map((reglage) => (
                    <li key={reglage.id}>
                      {reglage.instrument}: {reglage.reglage} ({reglage.action})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RegroupementsList;
