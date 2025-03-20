//src/types/types.ts
export interface Reglage {
  id: string;
  instrument: string;
  reglage: string;
  action: string;
  organeId: string;
  organe:string;
  description?: string;
}

export interface Regroupement {
  id: string;
  nom: string;
  description?: string;
  reglages?: Reglage[];
}

export interface Instruction {
  id: string;
  description: string;
}

export interface Parametre {
  id: string;
  nom: string;
  description: string;
}

export interface Alarme {
  id: string;
  nom: string;
  description: string;
  consequence: string;
  instruction: Instruction[];
  Parametre: Parametre[];

}

export interface Condition {
  id: string;
  description: string;
  type: "ConditionDemarrage" | "ConditionDeclenchement" | "ConditionOuverture" | "ConditionFermeture";
}

export interface RangeData {
  niveauInferieur: Reglage;
  niveauSuperieur: Reglage;
}

// Dans src/types/types.ts
export interface Niveau {
  id: string;
  instrument: string;
  reglage: string;
  action: string;
  organeId?: string; // Optionnel si présent dans Reglage
  organe?: string;   // Optionnel si présent dans Reglage
  description?: string;
}

export type ReglagesListType = Reglage[];
export type RegroupementsListType = Regroupement[];
export type AlarmesListType = Alarme[];
export type ConditionsListType = Condition[];
export type ReglageDetailType = Reglage;

export type ResultData =
  | ReglagesListType
  | RegroupementsListType
  | AlarmesListType
  | ReglageDetailType
  | ConditionsListType
  | RangeData
  | Alarme
  |Niveau
  | null;

export interface AlarmModalData {
  id: string;
  nom: string;
  description?: string;
  instruction?: Instruction[];
  consequence?: string;
  circuitId?: string;
  parametre?: string[];
  circuit?:string;
  message?: string;
  action:["corriger","supprimer","ajouter"]

}
