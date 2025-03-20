//src/components/HomePage/AlarmManagement.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { AlarmModalData } from "@/types/types";
import React from "react";

interface AlarmManagementProps {
  selectedAlarme: string | null;
  onClose: () => void;
  alarmModalData: AlarmModalData | null;
}

// Utiliser une fonction nommée
function AlarmManagement({ onClose, alarmModalData ,selectedAlarme}: AlarmManagementProps) {
  if (!alarmModalData) return null;
  console.log("onClose", onClose)
  console.log("alarmModalData", alarmModalData)
  console.log("selectedAlarm",selectedAlarme)
  const handleAction = async (action: string) => {
    try {
      await fetch("/api/alarme/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          actions : alarmModalData.action,
          nom: alarmModalData.nom,
          description: alarmModalData.description,
          instructions: alarmModalData.instruction || [],
          consequence: alarmModalData.consequence,
          circuitId: alarmModalData.circuitId,
          parametres: alarmModalData.parametre || [],
        }),
      });



      
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'action sur l'alarme:", error);
    }
  };

  return (
    <Dialog open={!!alarmModalData} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Nouvelle Alarme Détectée
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4">{alarmModalData.nom}</p>
          {alarmModalData.description && (
            <p className="font-semibold">
              Suggestion: {alarmModalData.consequence}
            </p>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          {
          
          alarmModalData.action.map((action) => (
            <Button
              key={action}
              onClick={() => handleAction(action)}
              variant={
               action === "corriger"
                  ? "default"
                  : action === "supprimer"
                    ? "destructive"
                    : "outline"
              }
            >
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(AlarmManagement);