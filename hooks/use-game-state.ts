"use client";

import { GameContext } from "@/components/providers/game-provider";
import { useContext } from "react";
import { MissionManager } from "@/lib/game/missions/mission-manager";
import { ObjectiveManager } from "@/lib/game/missions/objective-manager";

export function useGameState() {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error("useGameState must be used within a GameProvider");
  }

  const { state, dispatch } = context;
  const missionManager = new MissionManager(state.player.level, state.completedMissions);
  const objectiveManager = new ObjectiveManager();
  
  return {
    ...state,
    updatePlayer: (data: Partial<typeof state.player>) =>
      dispatch({ type: "UPDATE_PLAYER", payload: data }),
    addCharacter: (character: any) =>
      dispatch({ type: "ADD_CHARACTER", payload: character }),
    addItem: (item: Parameters<typeof dispatch>[0] extends { type: "ADD_ITEM"; payload: infer P } ? P : never) =>
      dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (itemId: string, quantity?: number) =>
      dispatch({ type: "REMOVE_ITEM", payload: { itemId, quantity } }),
    moveItem: (fromPosition: number, toPosition: number) =>
      dispatch({ type: "MOVE_ITEM", payload: { fromPosition, toPosition } }),
    useItem: (itemId: string) =>
      dispatch({ type: "USE_ITEM", payload: itemId }),
    acceptMission: (missionId: string) =>
      dispatch({ type: "ACCEPT_MISSION", payload: missionId }),
    abandonMission: (missionId: string) =>
      dispatch({ type: "ABANDON_MISSION", payload: missionId }),
    completeMission: (missionId: string) =>
      dispatch({ type: "COMPLETE_MISSION", payload: missionId }),
    updateObjectives: (type: string, target: string, amount: number = 1) =>
      dispatch({ type: "UPDATE_OBJECTIVES", payload: { type, target, amount } }),
    addExperience: (amount: number) =>
      dispatch({ type: "ADD_EXPERIENCE", payload: amount }),
    addCoins: (amount: number) =>
      dispatch({ type: "ADD_COINS", payload: amount }),
  };
}