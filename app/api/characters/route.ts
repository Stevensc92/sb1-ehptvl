import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { CharacterService } from '@/lib/services/character.service';

export async function POST(req: Request) {
    const session = await getServerSession();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const data = await req.json();
        const character = await CharacterService.create(session.user.id, data);
        return NextResponse.json(character);
    } catch (error) {
        console.error('Erreur lors de la création du personnage:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du personnage' },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    const session = await getServerSession();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const characters = await CharacterService.getByUserId(session.user.id);
        return NextResponse.json(characters);
    } catch (error) {
        console.error('Erreur lors de la récupération des personnages:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des personnages' },
            { status: 500 }
        );
    }
}