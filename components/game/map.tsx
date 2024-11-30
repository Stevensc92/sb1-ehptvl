"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { INITIAL_LOCATIONS } from "@/lib/game/map/constants";
import { MapLocation } from "./map/map-location";
import { MapEvent as MapEventComponent } from "./map/map-event";
import { LocationDetails } from "./map/location-details";
import { useState, useEffect } from "react";
import { useGameState } from "@/hooks/use-game-state";
import { generateRandomEvent } from "@/lib/game/map/events";
import { MapEvent } from "@/lib/game/map/types";

interface GameMapProps {
  className?: string;
}

export function GameMap({ className }: GameMapProps) {
  const { player } = useGameState();
  const [selectedLocation, setSelectedLocation] = useState(INITIAL_LOCATIONS[0]);
  const [exploredLocations, setExploredLocations] = useState<string[]>([INITIAL_LOCATIONS[0].id]);
  const [events, setEvents] = useState<MapEvent[]>([]);

  // Génère des événements aléatoires toutes les minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const exploredLocation = exploredLocations[Math.floor(Math.random() * exploredLocations.length)];
      const newEvent = generateRandomEvent(exploredLocation);
      
      setEvents(current => [...current, newEvent]);

      // Supprime l'événement après sa durée
      setTimeout(() => {
        setEvents(current => current.filter(e => e.id !== newEvent.id));
      }, newEvent.duration * 60 * 1000);
    }, 60000);

    return () => clearInterval(interval);
  }, [exploredLocations]);

  const unlockedLocations = INITIAL_LOCATIONS.filter(
    (location) => !location.requiredLevel || player.level >= location.requiredLevel
  ).map((location) => location.id);

  const handleLocationSelect = (locationId: string) => {
    const location = INITIAL_LOCATIONS.find((loc) => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      if (!exploredLocations.includes(locationId)) {
        setExploredLocations([...exploredLocations, locationId]);
      }
    }
  };

  const handleEventClick = (event: MapEvent) => {
    // Gérer l'interaction avec l'événement
    console.log("Event clicked:", event);
  };

  return (
    <Card className={cn("h-[600px] relative overflow-hidden", className)}>
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-2 relative bg-muted rounded-lg">
            {/* Brouillard de guerre */}
            <div 
              className="absolute inset-0 bg-black/50 transition-opacity duration-500"
              style={{
                clipPath: exploredLocations.map(locId => {
                  const loc = INITIAL_LOCATIONS.find(l => l.id === locId);
                  return loc ? `circle(15% at ${loc.x}% ${loc.y}%)` : '';
                }).join(', ')
              }}
            />

            {/* Locations */}
            {INITIAL_LOCATIONS.map((location) => (
              <MapLocation
                key={location.id}
                location={location}
                isUnlocked={unlockedLocations.includes(location.id)}
                isActive={selectedLocation.id === location.id}
                onSelect={handleLocationSelect}
              />
            ))}

            {/* Événements */}
            {events.map((event) => {
              const location = INITIAL_LOCATIONS.find(loc => loc.id === event.locationId);
              if (!location) return null;

              // Ajoute un décalage aléatoire pour éviter la superposition
              const offset = {
                x: location.x + (Math.random() * 10 - 5),
                y: location.y + (Math.random() * 10 - 5)
              };

              return (
                <MapEventComponent
                  key={event.id}
                  event={event}
                  position={offset}
                  onClick={handleEventClick}
                />
              );
            })}
          </div>
          <div className="col-span-1">
            <LocationDetails location={selectedLocation} />
          </div>
        </div>
      </div>
    </Card>
  );
}