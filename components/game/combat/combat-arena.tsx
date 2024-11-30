"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Character, Skill } from "@/lib/game/types";
import { CombatState, executeSkill, initializeCombat } from "@/lib/game/combat";
import { useState } from "react";
import { CombatCharacter } from "./combat-character";
import { CombatLog } from "./combat-log";
import { CombatRewards } from "./combat-rewards";

interface CombatArenaProps {
  player: Character;
  opponent: Character;
  onCombatEnd: (winner: Character, rewards?: CombatRewards) => void;
}

export function CombatArena({ player, opponent, onCombatEnd }: CombatArenaProps) {
  const [combatState, setCombatState] = useState<CombatState>(() =>
    initializeCombat(player, opponent)
  );

  const handleSkillUse = (skill: Skill) => {
    if (combatState.isFinished) return;

    // Tour du joueur
    const afterPlayerTurn = executeSkill(combatState, skill, "attacker");
    
    if (afterPlayerTurn.isFinished) {
      setCombatState(afterPlayerTurn);
      onCombatEnd(afterPlayerTurn.winner!, afterPlayerTurn.rewards);
      return;
    }

    // Tour de l'adversaire (IA simple)
    const opponentSkill = opponent.skills[Math.floor(Math.random() * opponent.skills.length)];
    const afterOpponentTurn = executeSkill(afterPlayerTurn, opponentSkill, "defender");

    if (afterOpponentTurn.isFinished) {
      onCombatEnd(afterOpponentTurn.winner!, afterOpponentTurn.rewards);
    }

    setCombatState(afterOpponentTurn);
  };

  return (
    <Card className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div className="space-y-4">
        <CombatCharacter
          character={combatState.attacker}
          isPlayer
          availableSkills={player.skills}
          onSkillUse={handleSkillUse}
        />
        <CombatCharacter
          character={combatState.defender}
          isPlayer={false}
          availableSkills={[]}
        />
      </div>
      <div className="lg:border-l lg:pl-4">
        <h3 className="text-lg font-bold mb-2">Journal de combat</h3>
        <ScrollArea className="h-[400px]">
          <CombatLog logs={combatState.logs} />
        </ScrollArea>
        {combatState.isFinished && combatState.rewards && (
          <CombatRewards rewards={combatState.rewards} />
        )}
      </div>
    </Card>
  );
}