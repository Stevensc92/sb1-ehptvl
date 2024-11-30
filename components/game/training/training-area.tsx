"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TRAINING_DUMMIES } from "@/lib/game/training/constants";
import { useGameState } from "@/hooks/use-game-state";
import { useState } from "react";
import { Swords, Shield, Zap, Target } from "lucide-react";
import { TrainingHistory } from "./training-history";
import { DailyChallenges } from "./daily-challenges";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingCombat } from "./training-combat";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { TrainingDummy } from "@/lib/game/training/types";
import { toast } from "sonner";

export function TrainingArea() {
  const { player, characters, updateObjectives, addExperience, addCoins } = useGameState();
  const [selectedDummy, setSelectedDummy] = useState<TrainingDummy | null>(null);

  const handleStartTraining = (dummy: TrainingDummy) => {
    if (!characters || characters.length === 0) {
      toast.error("Vous devez d'abord créer un personnage!");
      return;
    }
    setSelectedDummy(dummy);
  };

  const handleTrainingComplete = (results: {
    victory: boolean;
    damageDealt: number;
    skillsUsed: string[];
    combos: number;
  }) => {
    if (results.victory) {
      // Mettre à jour les objectifs de mission
      updateObjectives('defeat', 'training_dummy');
      updateObjectives('train', 'training_session');

      // Attribuer les récompenses
      const dummy = selectedDummy!;
      const experienceBonus = Math.floor(results.damageDealt * 0.1);
      const totalExperience = dummy.rewards.experience + experienceBonus;
      
      addExperience(totalExperience);
      addCoins(dummy.rewards.coins);

      toast.success(
        `Entraînement réussi! +${totalExperience} XP (${experienceBonus} bonus), +${dummy.rewards.coins} pièces`
      );
    } else {
      toast.error("Échec de l'entraînement. Réessayez!");
    }

    setSelectedDummy(null);
  };

  return (
    <>
      <Tabs defaultValue="dummies" className="h-full">
        <TabsList className="w-full">
          <TabsTrigger value="dummies" className="flex-1">
            Mannequins
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex-1">
            Défis
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dummies">
          <ScrollArea className="h-[500px]">
            <div className="space-y-4 p-4">
              {TRAINING_DUMMIES.map((dummy) => (
                <Card key={dummy.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold">{dummy.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Niveau {dummy.level}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>{dummy.stats.fortitude} PV</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Swords className="w-4 h-4" />
                      <span className="text-sm">{dummy.stats.taijutsu}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">{dummy.stats.ninjutsu}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">{dummy.stats.genjutsu}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <p>EXP: {dummy.rewards.experience}</p>
                      <p>Pièces: {dummy.rewards.coins}</p>
                    </div>
                    <Button
                      onClick={() => handleStartTraining(dummy)}
                      disabled={player.level < dummy.level}
                    >
                      Commencer l'entraînement
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="challenges">
          <DailyChallenges />
        </TabsContent>

        <TabsContent value="history">
          <TrainingHistory sessions={[]} />
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedDummy} onOpenChange={() => setSelectedDummy(null)}>
        <DialogContent className="max-w-2xl">
          <VisuallyHidden>
            <DialogTitle>Combat d'entraînement</DialogTitle>
          </VisuallyHidden>
          {selectedDummy && (
            <TrainingCombat
              dummy={selectedDummy}
              onComplete={handleTrainingComplete}
              onClose={() => setSelectedDummy(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}