//src/compoenents/HomePage/NiveauxList.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assurez-vous que le chemin est correct
import { Niveau } from "@/types/types";
// Définir une interface pour les niveaux


interface NiveauxListProps {
  niveaux: Niveau[];
}

const NiveauxList = ({ niveaux }: NiveauxListProps) => {
  if (!niveaux || niveaux.length === 0) {
    return (
      <Card>
        <CardContent>
          <p className="text-muted-foreground">Aucun niveau disponible.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des niveaux</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {niveaux.map((niveau) => (
              <div key={niveau.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="font-medium text-lg">{niveau.instrument}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-semibold">Réglage :</span> {niveau.reglage}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-semibold">Action :</span> {niveau.action}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NiveauxList;