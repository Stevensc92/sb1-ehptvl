"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { TrainingDummy } from '@/lib/game/training/types';
import { TrainingCombatManager, TrainingCombatState } from '@/lib/game/training/combat-manager';
import { useEffect, useState } from "react";
import { Heart, Zap, Swords, Trophy, XCircle } from "lucide-react";
import { useGameState } from "@/hooks/use-game-state";
import { DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface TrainingCombatProps {
  dummy: TrainingDummy;
  onComplete: (results: {
    victory: boolean;
    damageDealt: number;
    skillsUsed: string[];
    combos: number;
  }) => void;
  onClose: () => void;
}

export function TrainingCombat({ dummy, onComplete, onClose }: TrainingCombatProps) {
  const { characters } = useGameState();
  const activeCharacter = characters[0];
  const [combatState, setCombatState] = useState<TrainingCombatState | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isProcessingResults, setIsProcessingResults] = useState(false);

  useEffect(() => {
    if (activeCharacter) {
      const manager = new TrainingCombatManager(activeCharacter, dummy);
      setCombatState(manager.getState());
    }
  }, [activeCharacter, dummy]);

  const handleUseSkill = async (skill: any) => {
    if (!combatState || !activeCharacter || isProcessingResults) return;

    const manager = new TrainingCombatManager(activeCharacter, dummy);
    Object.assign(manager, { state: combatState });
    const newState = manager.useSkill(skill);
    setCombatState(newState);

    if (newState.isFinished) {
      setIsProcessingResults(true);
      const results = {
        victory: newState.dummyHealth <= 0,
        damageDealt: newState.totalDamageDealt,
        skillsUsed: Array.from(newState.skillsUsed),
        combos: Math.floor(newState.combo / 3)
      };

      // Attendre un court instant pour que le joueur puisse voir le dernier coup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onComplete(results);
      setShowResults(true);
      setIsProcessingResults(false);

      // Afficher un toast avec le résultat
      if (results.victory) {
        toast.success("Victoire ! L'entraînement est terminé.");
      } else {
        toast.error("Défaite. Réessayez pour vous améliorer !");
      }
    }
  };

  const handleClose = () => {
    if (isProcessingResults) return;
    onClose();
  };

  if (!combatState || !activeCharacter) return null;

  return (
    <>
      <DialogTitle>
        {showResults ? "Résultats du combat" : "Combat d'entraînement"}
      </DialogTitle>

      {showResults ? (
        <Card className="p-6">
          <div className="text-center mb-6">
            {combatState.dummyHealth <= 0 ? (
              <div className="flex flex-col items-center gap-2">
                <Trophy className="w-12 h-12 text-yellow-500" />
                <h3 className="text-xl font-bold text-green-500">Victoire!</h3>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <XCircle className="w-12 h-12 text-red-500" />
                <h3 className="text-xl font-bold text-red-500">Défaite</h3>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span>Dégâts infligés:</span>
              <span className="font-bold">{combatState.totalDamageDealt}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Techniques utilisées:</span>
              <span className="font-bold">{combatState.skillsUsed.size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Combos réalisés:</span>
              <span className="font-bold">{Math.floor(combatState.combo / 3)}</span>
            </div>
          </div>

          <Button 
            onClick={handleClose}
            className="w-full"
            disabled={isProcessingResults}
          >
            Terminer
          </Button>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <h3 className="font-bold">{activeCharacter.name}</h3>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <Progress
                  value={(combatState.playerHealth / activeCharacter.stats.fortitude) * 100}
                  className="h-2"
                />
                <span className="text-sm">{combatState.playerHealth}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <Progress
                  value={(combatState.playerChakra / activeCharacter.stats.chakra) * 100}
                  className="h-2"
                />
                <span className="text-sm">{combatState.playerChakra}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold">{dummy.name}</h3>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <Progress
                  value={(combatState.dummyHealth / dummy.stats.fortitude) * 100}
                  className="h-2"
                />
                <span className="text-sm">{combatState.dummyHealth}</span>
              </div>
            </div>
          </div>

          <ScrollArea className="h-48 mb-4">
            <div className="space-y-1">
              {combatState.logs.map((log, index) => (
                <p key={index} className="text-sm">
                  {log}
                </p>
              ))}
            </div>
          </ScrollArea>

          <div className="grid grid-cols-2 gap-2">
            {activeCharacter.skills.map((skill) => (
              <Button
                key={skill.id}
                onClick={() => handleUseSkill(skill)}
                disabled={
                  isProcessingResults ||
                  combatState.isFinished ||
                  combatState.playerChakra < skill.chakraCost
                }
                className="w-full"
              >
                <Swords className="w-4 h-4 mr-2" />
                {skill.name}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}