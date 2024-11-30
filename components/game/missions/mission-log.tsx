"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mission } from "@/lib/game/missions/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MissionCard } from "./mission-card";

interface MissionLogProps {
  missions: Mission[];
  onAcceptMission: (missionId: string) => void;
  onAbandonMission: (missionId: string) => void;
  onCompleteMission: (missionId: string) => void;
}

export function MissionLog({
  missions,
  onAcceptMission,
  onAbandonMission,
  onCompleteMission
}: MissionLogProps) {
  const availableMissions = missions.filter((m) => m.status === 'available');
  const activeMissions = missions.filter((m) => m.status === 'active');
  const completedMissions = missions.filter((m) => m.status === 'completed');

  return (
    <Card className="h-[600px]">
      <Tabs defaultValue="available" className="h-full">
        <TabsList className="w-full">
          <TabsTrigger value="available" className="flex-1">
            Disponibles ({availableMissions.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex-1">
            En cours ({activeMissions.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            Terminées ({completedMissions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="h-[calc(100%-40px)]">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {availableMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onAccept={onAcceptMission}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="active" className="h-[calc(100%-40px)]">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {activeMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onAbandon={onAbandonMission}
                  onComplete={onCompleteMission}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="completed" className="h-[calc(100%-40px)]">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {completedMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}