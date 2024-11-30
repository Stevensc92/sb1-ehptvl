"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Coins, Star, Shield, Users } from "lucide-react";
import { ClanMission } from "@/lib/game/missions/clan";
import { cn } from "@/lib/utils";

interface ClanMissionCardProps {
  mission: ClanMission;
  onJoin?: (missionId: string) => void;
  onLeave?: (missionId: string) => void;
  onStart?: (missionId: string) => void;
  currentUserId: string;
}

export function ClanMissionCard({
  mission,
  onJoin,
  onLeave,
  onStart,
  currentUserId
}: ClanMissionCardProps) {
  const isParticipant = mission.currentParticipants.includes(currentUserId);
  const canStart = mission.currentParticipants.length >= mission.requiredParticipants;
  const hasStarted = !!mission.startTime;

  return (
    <Card className="p-4 border-l-4 border-red-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{mission.name}</h3>
          <p className="text-sm text-muted-foreground">{mission.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{mission.currentParticipants.length}/{mission.requiredParticipants}</span>
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
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{mission.timeLimit}min</span>
          </div>
        </div>

        <div className="flex gap-2">
          {!hasStarted && (
            <>
              {!isParticipant && onJoin && (
                <Button 
                  className="w-full" 
                  onClick={() => onJoin(mission.id)}
                >
                  Rejoindre
                </Button>
              )}
              {isParticipant && onLeave && (
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={() => onLeave(mission.id)}
                >
                  Quitter
                </Button>
              )}
              {isParticipant && canStart && onStart && (
                <Button 
                  className="w-full"
                  onClick={() => onStart(mission.id)}
                >
                  Démarrer
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}