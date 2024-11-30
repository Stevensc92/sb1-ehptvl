"use client";

import { useGameState } from "./use-game-state";
import { QuestChainManager } from "@/lib/game/missions/quest-chain-manager";
import { INITIAL_QUEST_CHAINS } from "@/lib/game/missions/quest-chains";
import { useEffect, useState } from "react";

export function useQuestChains() {
  const { missions } = useGameState();
  const [questChainManager] = useState(() => new QuestChainManager());
  const [chains, setChains] = useState<ReturnType<typeof questChainManager.getChainProgress>[]>([]);

  useEffect(() => {
    // Initialiser les chaînes de quêtes
    INITIAL_QUEST_CHAINS.forEach(chain => {
      questChainManager.createChain(chain);
    });

    // Mettre à jour le progrès quand les missions changent
    missions.forEach(mission => {
      if (mission.status === 'completed') {
        questChainManager.onMissionComplete(mission.id);
      }
    });

    // Mettre à jour l'état local
    setChains(INITIAL_QUEST_CHAINS.map(chain => 
      questChainManager.getChainProgress(chain.id)
    ));
  }, [missions]);

  return {
    chains,
    questChainManager
  };
}