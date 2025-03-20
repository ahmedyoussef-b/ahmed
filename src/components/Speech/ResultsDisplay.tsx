// src/components/Speech/ResultsDisplay.tsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeechContext } from "@/contexts/SpeechContext";
import ReglageDetail from "@/components/HomePage/ReglageDetail";
import RegroupementsList from "@/components/HomePage/RegroupementsList";
import ConditionsList from "@/components/HomePage/ConditionsList";
import { Niveau, Alarme, Regroupement, Condition } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Importez les composants UI nécessaires

const ResultsDisplay = () => {
  const { showResponseTextarea, results, responseText } = useSpeechContext();

  if (!showResponseTextarea || !results || !results.data) {
    return null;
  }

  // Garde de type pour vérifier si un élément est de type Niveau
  const isNiveau = (item: unknown): item is Niveau => {
    return (
      typeof item === "object" &&
      item !== null &&
      "instrument" in item &&
      "reglage" in item &&
      "action" in item
    );
  };

  // Garde de type pour vérifier si un élément est de type Regroupement
  const isRegroupement = (item: unknown): item is Regroupement => {
    return typeof item === "object" && item !== null && "nom" in item;
  };

  // Garde de type pour vérifier si un élément est de type Alarme
  const isAlarme = (item: unknown): item is Alarme => {
    return (
      typeof item === "object" &&
      item !== null &&
      "nom" in item &&
      "description" in item &&
      "consequence" in item
    );
  };

  // Garde de type pour vérifier si un élément est de type Condition
  const isCondition = (item: unknown): item is Condition => {
    return (
      typeof item === "object" &&
      item !== null &&
      "description" in item &&
      "type" in item
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-lg font-semibold mb-4">{responseText}</p>

        {results.type === "exact" && results.data && isNiveau(results.data) ? (
          <div className="mb-4 p-4 border rounded-lg shadow-md bg-card">
            <h2 className="text-lg font-semibold">Détails du réglage</h2>
            <p>Instrument : {results.data.instrument}</p>
            <p>Réglage : {results.data.reglage}</p>
            <p>Action : {results.data.action}</p>
          </div>
        ) : results.type === "alarme" && results.data && isAlarme(results.data) ? (
          <div className="mb-4 p-4 border rounded-lg shadow-md bg-card">
            <h2 className="text-lg font-semibold">Détails de l&apos;alarme</h2>
            <p>Nom : {results.data.nom}</p>
            <p>Description : {results.data.description}</p>
            <p>Conséquence : {results.data.consequence}</p>
            {results.data.instruction && results.data.instruction.length > 0 ? (
              <div>
                <h3 className="text-md font-semibold">Instructions :</h3>
                <ul>
                  {results.data.instruction.map((instruction, index) => (
                    <li key={index}>{instruction.description}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Aucune instruction disponible.</p>
            )}
            {results.data.Parametre && results.data.Parametre.length > 0 ? (
              <div>
                <h3 className="text-md font-semibold">Paramètres :</h3>
                <ul>
                  {results.data.Parametre.map((parametre, index) => (
                    <li key={index}>
                      {parametre.nom} : {parametre.description}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Aucun paramètre disponible.</p>
            )}
          </div>
        ) : results.type === "range" &&
          results.data &&
          typeof results.data === "object" &&
          "niveauInferieur" in results.data &&
          "niveauSuperieur" in results.data &&
          results.data.niveauInferieur &&
          results.data.niveauSuperieur ? (
          <>
            <ReglageDetail reglage={results.data.niveauInferieur} />
            <ReglageDetail reglage={results.data.niveauSuperieur} />
          </>
        ) : results.type === "all" ? (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Liste des niveaux</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(results.data) && results.data.filter(isNiveau).length === 0 ? (
                  <p className="text-muted-foreground">Aucun niveau disponible.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.isArray(results.data) &&
                              (results.data as Niveau[]).map((niveau) => (
                                <div
                            key={niveau.id}
                            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
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
                )}
              </CardContent>
            </Card>
          </div>
        ) : results.type === "regroupements" ? (
          <RegroupementsList
            regroupements={
              Array.isArray(results.data)
                ? results.data.filter(isRegroupement) // Filtrer pour ne garder que les Regroupement
                : []
            }
          />
        ) : results.type === "ConditionDemarrage" ||
          results.type === "ConditionDeclenchement" ||
          results.type === "ConditionOuverture" ||
          results.type === "ConditionFermeture" ? (
          <ConditionsList
            conditions={
              Array.isArray(results.data)
                ? results.data.filter(isCondition) // Filtrer pour ne garder que les Condition
                : []
            }
          />
        ) : (
          <div className="mb-4 p-4 border rounded-lg shadow-md bg-card">
            <p>Aucune information disponible pour ce niveau</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultsDisplay;