"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapEvent } from "@/lib/game/map/types";
import { Swords, Coins, Gift, Store, Crosshair, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapEventProps {
  event: MapEvent;
  onClick: (event: MapEvent) => void;
  position: { x: number; y: number };
}

const eventIcons = {
  battle: Swords,
  treasure: Gift,
  merchant: Store,
  ambush: Crosshair,
  training: Dumbbell
};

const eventColors = {
  battle: "text-red-500 hover:text-red-600",
  treasure: "text-yellow-500 hover:text-yellow-600",
  merchant: "text-purple-500 hover:text-purple-600",
  ambush: "text-orange-500 hover:text-orange-600",
  training: "text-blue-500 hover:text-blue-600"
};

export function MapEvent({ event, onClick, position }: MapEventProps) {
  const Icon = eventIcons[event.type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "absolute w-8 h-8 p-0 rounded-full animate-pulse",
              eventColors[event.type]
            )}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onClick={() => onClick(event)}
          >
            <Icon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2">
            <p className="font-bold">{event.name}</p>
            <p className="text-sm">{event.description}</p>
            {event.rewards && (
              <div className="text-sm space-y-1">
                {event.rewards.experience && (
                  <p className="text-blue-500">+{event.rewards.experience} XP</p>
                )}
                {event.rewards.coins && (
                  <p className="flex items-center gap-1 text-yellow-500">
                    <Coins className="w-3 h-3" />
                    {event.rewards.coins}
                  </p>
                )}
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Durée: {event.duration} minutes
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}