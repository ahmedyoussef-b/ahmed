// src/app/api/alarme/modifier/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    try {
        const { ancienNom, nouveauNom, id } = await request.json();

        // Validation des champs requis
        if (!ancienNom || !nouveauNom || !id) {
            return NextResponse.json(
                { error: "ancienNom, nouveauNom et id sont requis." },
                { status: 400 }
            );
        }

        // Vérifier si l'alarme existe
        const alarmeExistante = await prisma.alarme.findUnique({
            where: {
                id: id,
                nom: ancienNom,
            },
        });

        if (!alarmeExistante) {
            return NextResponse.json(
                { error: "Cette alarme n'existe pas." },
                { status: 404 }
            );
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
        return NextResponse.json(
            { message: "Alarme modifiée avec succès", alarme: alarmeModifiee },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors de la modification de l'alarme :", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}