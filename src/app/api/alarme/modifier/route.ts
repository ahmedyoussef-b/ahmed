
// src/api/alarme/modifier/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { ancienNom, nouveauNom, id } = req.body;

        // Validation des champs requis
        if (!ancienNom || !nouveauNom || !id) {
            return res.status(400).json({ error: "ancienNom, nouveauNom et id sont requis." });
        }

        try {
            // Vérifier si l'alarme existe
            const alarmeExistante = await prisma.alarme.findUnique({
                where: {
                    id: id,
                    nom: ancienNom,
                },
            });

            if (!alarmeExistante) {
                return res.status(404).json({ error: "Cette alarme n'existe pas." });
            }

            // Mettre à jour l'alarme
            const alarmeModifiee = await prisma.alarme.update({
                where: {
                    id: id,
                    nom: ancienNom,
                },
                data: { nom: nouveauNom },
            });

            // Retourner la réponse avec l'alarme modifiée
            res.status(200).json({ message: "Alarme modifiée avec succès", alarme: alarmeModifiee });
        } catch (error) {
            console.error("Erreur lors de la modification de l'alarme :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    } else {
        // Gérer les autres méthodes HTTP
        res.status(405).json({ error: "Méthode non autorisée" });
    }
}