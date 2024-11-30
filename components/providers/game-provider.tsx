"use client";

import { createContext, useReducer, ReactNode } from "react";
import { InventoryManager } from "@/lib/game/inventory/inventory-manager";
import { Character } from "@/lib/game/types";
import { Mission } from "@/lib/game/missions/types";
import { INITIAL_MISSIONS } from "@/lib/game/missions/constants";
import { SKILL_TREES } from "@/lib/game/progression/constants";

interface GameState {
  player: {
    level: number;
    experience: number;
    coins: number;
    scrolls: number;
  };
  characters: Character[];
  inventory: ReturnType<InventoryManager["getState"]>;
  missions: Mission[];
  skillTrees: typeof SKILL_TREES;
}

const inventoryManager = new InventoryManager(20);

const initialState: GameState = {
  player: {
    level: 1,
    experience: 0,
    coins: 0,
    scrolls: 0,
  },
  characters: [],
  inventory: inventoryManager.getState(),
  missions: INITIAL_MISSIONS,
  skillTrees: SKILL_TREES,
};

type GameAction =
  | { type: "UPDATE_PLAYER"; payload: Partial<GameState["player"]> }
  | { type: "ADD_CHARACTER"; payload: Character }
  | { type: "ADD_ITEM"; payload: Parameters<InventoryManager["addItem"]>[0] }
  | { type: "REMOVE_ITEM"; payload: { itemId: string; quantity?: number } }
  | { type: "MOVE_ITEM"; payload: { fromPosition: number; toPosition: number } }
  | { type: "USE_ITEM"; payload: string }
  | { type: "ACCEPT_MISSION"; payload: string }
  | { type: "ABANDON_MISSION"; payload: string }
  | { type: "COMPLETE_MISSION"; payload: string }
  | { type: "UPDATE_OBJECTIVES"; payload: { type: string; target: string; amount: number } }
  | { type: "ADD_EXPERIENCE"; payload: number }
  | { type: "ADD_COINS"; payload: number }
  | { type: "LEARN_SKILL"; payload: string };

export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "UPDATE_PLAYER":
      return {
        ...state,
        player: { ...state.player, ...action.payload },
      };
    case "ADD_CHARACTER":
      return {
        ...state,
        characters: [...state.characters, action.payload],
      };
    case "ADD_ITEM":
      inventoryManager.addItem(action.payload);
      return {
        ...state,
        inventory: inventoryManager.getState(),
      };
    case "REMOVE_ITEM":
      inventoryManager.removeItem(action.payload.itemId, action.payload.quantity);
      return {
        ...state,
        inventory: inventoryManager.getState(),
      };
    case "MOVE_ITEM":
      inventoryManager.moveItem(
        action.payload.fromPosition,
        action.payload.toPosition
      );
      return {
        ...state,
        inventory: inventoryManager.getState(),
      };
    case "USE_ITEM":
      inventoryManager.useItem(action.payload);
      return {
        ...state,
        inventory: inventoryManager.getState(),
      };
    case "ACCEPT_MISSION":
      return {
        ...state,
        missions: state.missions.map(mission =>
          mission.id === action.payload
            ? { ...mission, status: 'active' }
            : mission
        ),
      };
    case "ABANDON_MISSION":
      return {
        ...state,
        missions: state.missions.map(mission =>
          mission.id === action.payload
            ? { ...mission, status: 'available' }
            : mission
        ),
      };
    case "COMPLETE_MISSION":
      return {
        ...state,
        missions: state.missions.map(mission =>
          mission.id === action.payload
            ? { ...mission, status: 'completed' }
            : mission
        ),
      };
    case "UPDATE_OBJECTIVES":
      return {
        ...state,
        missions: state.missions.map(mission => {
          if (mission.status !== 'active') return mission;
          
          return {
            ...mission,
            objectives: mission.objectives.map(objective =>
              objective.type === action.payload.type && 
              objective.target === action.payload.target
                ? {
                    ...objective,
                    current: Math.min(
                      objective.required,
                      objective.current + action.payload.amount
                    ),
                  }
                : objective
            ),
          };
        }),
      };
    case "ADD_EXPERIENCE":
      return {
        ...state,
        player: {
          ...state.player,
          experience: state.player.experience + action.payload,
        },
      };
    case "ADD_COINS":
      return {
        ...state,
        player: {
          ...state.player,
          coins: state.player.coins + action.payload,
        },
      };
    case "LEARN_SKILL":
      // Logique pour apprendre une nouvelle compétence
      return state;
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}