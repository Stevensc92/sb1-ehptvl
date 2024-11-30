"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuestChain } from "@/lib/game/missions/quest-chain-manager";
import { Mission } from "@/lib/game/missions/types";
import { Scroll, Trophy } from "lucide-react";

interface QuestChainProgressProps {
  chain: QuestChain;
  missions: Mission[];
}

export function QuestChainProgress({ chain, missions }: QuestChainProgressProps) {
  const progress = (chain.currentStep / chain.missions.length) * 100;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Scroll className="w-5 h-5 text-blue-500" />
        <div>
          <h3 className="text-lg font-bold">{chain.name}</h3>
          <p className="text-sm text-muted-foreground">{chain.description}</p>
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-4" />

      <ScrollArea className="h-[200px] mb-4">
        <div className="space-y-2">
          {chain.missions.map((missionId, index) => {
            const mission = missions.find(m => m.id === missionId);
            if (!mission) return null;

            const isCompleted = index < chain.currentStep;
            const isCurrent = index === chain.currentStep;

            return (
              <div
                key={missionId}
                className={`p-2 rounded ${
                  isCompleted
                    ? "bg-green-100 dark:bg-green-900/20"
                    : isCurrent
                    ? "bg-blue-100 dark:bg-blue-900/20"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={isCompleted ? "line-through" : ""}>
                    {mission.name}
                  </span>
                  {isCompleted && <Trophy className="w-4 h-4 text-green-500" />}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {chain.currentStep >= chain.missions.length && (
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded">
          <h4 className="font-bold mb-2">Récompenses obtenues :</h4>
          <ul className="space-y-1 text-sm">
            <li>{chain.rewards.experience} points d'expérience</li>
            <li>{chain.rewards.coins} pièces</li>
            {chain.rewards.title && <li>Titre : {chain.rewards.title}</li>}
            {chain.rewards.items?.map((item) => (
              <li key={item}>Objet : {item}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}