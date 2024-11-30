"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapLocation as MapLocationType } from "@/lib/game/map/types";
import { MapPin, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapLocationProps {
  location: MapLocationType;
  isUnlocked: boolean;
  isActive: boolean;
  onSelect: (locationId: string) => void;
}

const locationColors = {
  village: "text-emerald-500 hover:text-emerald-600",
  forest: "text-green-500 hover:text-green-600",
  mountain: "text-gray-500 hover:text-gray-600",
  desert: "text-yellow-500 hover:text-yellow-600",
  lake: "text-blue-500 hover:text-blue-600",
};

export function MapLocation({ location, isUnlocked, isActive, onSelect }: MapLocationProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "absolute w-12 h-12 p-0 rounded-full",
              locationColors[location.type],
              isActive && "ring-2 ring-primary",
              !isUnlocked && "opacity-50"
            )}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={() => onSelect(location.id)}
            disabled={!isUnlocked}
          >
            {isUnlocked ? (
              <MapPin className="w-6 h-6" />
            ) : (
              <Lock className="w-6 h-6" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2">
            <p className="font-bold">{location.name}</p>
            <p className="text-sm">{location.description}</p>
            {location.requiredLevel && !isUnlocked && (
              <p className="text-sm text-red-500">
                Niveau {location.requiredLevel} requis
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}