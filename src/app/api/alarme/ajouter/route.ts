//src/app/api/alarme/ajouter/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        // Extraire les données de la requête
        const { action, nom, description, instruction, consequence, circuitId, parametre } = await req.json();

        console.log("Données reçues :", { action, nom, description, instruction, consequence, circuitId, parametre });

        // Validation des données
        if (!action || !nom || !description || !instruction || !consequence || !circuitId || !parametre) {
            return NextResponse.json(
                { error: "Tous les champs sont obligatoires" },
                { status: 400 }
            );
        }

        // Créer une nouvelle alarme dans la base de données
        const nouvelleAlarme = await prisma.alarme.create({
            data: {
                nom,
                description,
                instruction: {
                    create: instruction.map((instruction: string, index: number) => ({
                        description: instruction,
                        ordre: index + 1,
                    })),
                },
                consequence,
                circuit: { connect: { id: circuitId } },
                Parametre: {
                    create: parametre.map((parametre: { nom: string; description: string }) => ({
                        nom: parametre.nom,
                        description: parametre.description,
                    })),
                },
            },
            include: {
                instruction: true,
                Parametre: true,
                circuit: true,
            },
        });

        console.log("Nouvelle alarme créée :", nouvelleAlarme);

        // Retourner une réponse JSON avec un message de succès
        return NextResponse.json({
            type: "alarme_ajoutee",
            result: nouvelleAlarme,
            toastify: true,
            message: `L'alarme "${nom}" a été ajoutée avec succès.`,
        });

    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de l'ajout de l'alarme :", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur", details: error },
            { status: 500 }
        );
    }
}