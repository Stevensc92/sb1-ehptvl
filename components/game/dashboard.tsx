"use client";

import { CharacterPanel } from "@/components/game/character-panel";
import { GameMap } from "@/components/game/map";
import { StatusBar } from "@/components/game/status-bar";
import { InventoryGrid } from "@/components/game/inventory/inventory-grid";
import { MissionLog } from "@/components/game/missions/mission-log";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Mission } from "@/lib/game/missions/types";
import { INITIAL_MISSIONS } from "@/lib/game/missions/constants";

export function GameDashboard() {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);

  const handleAcceptMission = (missionId: string) => {
    setMissions(current =>
      current.map(mission =>
        mission.id === missionId
          ? { ...mission, status: 'active' }
          : mission
      )
    );
  };

  const handleAbandonMission = (missionId: string) => {
    setMissions(current =>
      current.map(mission =>
        mission.id === missionId
          ? { ...mission, status: 'available' }
          : mission
      )
    );
  };

  const handleCompleteMission = (missionId: string) => {
    setMissions(current =>
      current.map(mission =>
        mission.id === missionId
          ? { ...mission, status: 'completed' }
          : mission
      )
    );
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <StatusBar className="col-span-full" />
      <div className="lg:col-span-3 space-y-4">
        <CharacterPanel />
        <InventoryGrid />
      </div>
      <div className="lg:col-span-6">
        <GameMap />
      </div>
      <div className="lg:col-span-3">
        <MissionLog
          missions={missions}
          onAcceptMission={handleAcceptMission}
          onAbandonMission={handleAbandonMission}
          onCompleteMission={handleCompleteMission}
        />
      </div>
    </div>
  );
}