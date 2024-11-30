"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapLocation } from "@/lib/game/map/types";
import { MapPin, Scroll, TreePine } from "lucide-react";
import { useGameState } from "@/hooks/use-game-state";
import { MissionCard } from "../missions/mission-card";
import { TrainingArea } from "../training/training-area";

interface LocationDetailsProps {
  location: MapLocation;
}

export function LocationDetails({ location }: LocationDetailsProps) {
  const { missions, acceptMission, abandonMission, completeMission } = useGameState();
  const locationMissions = missions.filter(m => m.locationId === location.id);

  return (
    <Card className="p-4">
      <h3 className="text-xl font-bold mb-4">{location.name}</h3>
      <p className="text-muted-foreground mb-4">{location.description}</p>
      
      <div className="space-y-4">
        {location.id === 'training_grounds' && (
          <TrainingArea />
        )}

        {locationMissions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Scroll className="w-4 h-4" />
              Missions disponibles
            </h4>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {locationMissions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onAccept={acceptMission}
                    onAbandon={abandonMission}
                    onComplete={completeMission}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {location.resources && location.resources.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              Ressources disponibles
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {location.resources.map((resource) => (
                <Button
                  key={resource}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  {resource}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}