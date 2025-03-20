import { Reglage, Alarme } from "@/types/types";

// Type guard pour vérifier si un objet est de type Reglage
export function isReglage<T>(data: T): data is T & Reglage {
  return (
    typeof data === "object" &&
    data !== null &&
    "instrument" in data &&
    "reglage" in data &&
    "action" in data &&
    "organeId" in data
  );
}

// Type guard pour vérifier si un objet est de type Alarme
export function isAlarme<T>(data: T): data is T & Alarme {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "nom" in data &&
    "description" in data &&
    "consequence" in data &&
    "instruction" in data &&
    "Parametre" in data
  );
}