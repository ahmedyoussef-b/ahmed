//src/app/api/alarme/supprimer/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
    try {
        // Extraire les données de la requête
        const { id, nom } = await req.json();

        // Validation des données
        if (!id || !nom) {
            return NextResponse.json(
                { error: "L'ID et le nom de l'alarme sont requis" },
                { status: 400 }
            );
        }

        // Vérifier si l'alarme existe
        const alarmeExistante = await prisma.alarme.findUnique({
            where: {
                id: parseInt(id), // Convertir l'ID en nombre
                nom,
            },
        });

        if (!alarmeExistante) {
            return NextResponse.json(
                { error: "Cette alarme n'existe pas." },
                { status: 404 }
            );
        }

        // Supprimer l'alarme
        await prisma.alarme.delete({
            where: {
                id: parseInt(id), // Convertir l'ID en nombre
                nom,
            },
        });

        // Retourner une réponse JSON avec un message de succès
        return NextResponse.json(
            { message: `L'alarme "${nom}" a été supprimée avec succès.` },
            { status: 200 }
        );
    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la suppression de l'alarme :", error);
        return NextResponse.json(
            { error: "Erreur interne du serveur" },
            { status: 500 }
        );
    }
}