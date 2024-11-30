"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CharacterService } from '@/lib/services/character.service';
import { Character, Stats, Inventory, Mission, QuestChain } from '@prisma/client';

type FullCharacter = Character & {
  stats: Stats;
  inventory: Inventory;
  missions: Mission[];
  questChains: QuestChain[];
};

export function useCharacterData() {
  const { data: session } = useSession();
  const [characters, setCharacters] = useState<FullCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCharacters() {
      if (!session?.user?.id) return;

      try {
        const data = await CharacterService.getByUserId(session.user.id);
        setCharacters(data);
      } catch (err) {
        setError('Erreur lors du chargement des personnages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [session]);

  return {
    characters,
    loading,
    error,
    refresh: async () => {
      if (session?.user?.id) {
        setLoading(true);
        const data = await CharacterService.getByUserId(session.user.id);
        setCharacters(data);
        setLoading(false);
      }
    }
  };
}