"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Mission } from "@/lib/game/missions/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Coins, Star, Shield, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  mission: Mission;
  onAccept?: (missionId: string) => void;
  onAbandon?: (missionId: string) => void;
  onComplete?: (missionId: string) => void;
}

const missionTypeColors = {
  main: "border-l-4 border-blue-500",
  side: "border-l-4 border-green-500",
  daily: "border-l-4 border-yellow-500",
  event: "border-l-4 border-purple-500",
  clan: "border-l-4 border-red-500"
};

export function MissionCard({ mission, onAccept, onAbandon, onComplete }: MissionCardProps) {
  const totalProgress = mission.objectives.reduce((acc, obj) => acc + (obj.current / obj.required), 0) / mission.objectives.length * 100;
  const canComplete = totalProgress === 100;

  return (
    <Card className={cn("p-4", missionTypeColors[mission.type])}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{mission.name}</h3>
          <p className="text-sm text-muted-foreground">{mission.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Niveau {mission.level}</span>
        </div>
      </div>

      <ScrollArea className="h-32 mb-4">
        <div className="space-y-2">
          {mission.objectives.map((objective) => (
            <div key={objective.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{objective.description}</span>
                <span>
                  {objective.current}/{objective.required}
                </span>
              </div>
              <Progress 
                value={(objective.current / objective.required) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{mission.rewards.experience} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span>{mission.rewards.coins}</span>
          </div>
          {mission.timeLimit && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{mission.timeLimit}min</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {mission.status === 'available' && onAccept && (
            <Button 
              className="w-full" 
              onClick={() => onAccept(mission.id)}
            >
              Accepter
            </Button>
          )}
          {mission.status === 'active' && (
            <>
              {canComplete && onComplete && (
                <Button 
                  className="w-full"
                  onClick={() => onComplete(mission.id)}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Terminer
                </Button>
              )}
              {onAbandon && (
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={() => onAbandon(mission.id)}
                >
                  Abandonner
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}