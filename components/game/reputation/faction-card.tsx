"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Faction, ReputationLevel } from "@/lib/game/reputation/types";
import { REPUTATION_THRESHOLDS } from "@/lib/game/reputation/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";

interface FactionCardProps {
  faction: Faction;
  reputation: {
    level: ReputationLevel;
    points: number;
  };
}

const reputationColors: Record<ReputationLevel, string> = {
  hostile: "text-red-500",
  unfriendly: "text-orange-500",
  neutral: "text-gray-500",
  friendly: "text-green-500",
  honored: "text-blue-500",
  revered: "text-purple-500",
  exalted: "text-yellow-500",
};

export function FactionCard({ faction, reputation }: FactionCardProps) {
  const currentThreshold = REPUTATION_THRESHOLDS[reputation.level];
  const nextLevel = Object.entries(REPUTATION_THRESHOLDS).find(
    ([_, threshold]) => threshold > reputation.points
  );
  
  const progress = nextLevel
    ? ((reputation.points - currentThreshold) / (nextLevel[1] - currentThreshold)) * 100
    : 100;

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold">{faction.name}</h3>
        <p className="text-sm text-muted-foreground">{faction.description}</p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className={reputationColors[reputation.level]}>
            {reputation.level.charAt(0).toUpperCase() + reputation.level.slice(1)}
          </span>
          <span className="text-sm">{reputation.points} points</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <ScrollArea className="h-32">
        <div className="space-y-2">
          {Object.entries(faction.rewards).map(([level, rewards]) => (
            <div
              key={level}
              className={cn(
                "p-2 rounded",
                reputation.level >= level as ReputationLevel
                  ? "bg-secondary"
                  : "bg-muted opacity-50"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4" />
                <span className="font-medium">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
              </div>
              <div className="text-sm space-y-1">
                {rewards.title && <p>Titre: {rewards.title}</p>}
                {rewards.items?.length > 0 && (
                  <p>Objets: {rewards.items.length} disponible(s)</p>
                )}
                {rewards.skills?.length > 0 && (
                  <p>Techniques: {rewards.skills.length} disponible(s)</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}