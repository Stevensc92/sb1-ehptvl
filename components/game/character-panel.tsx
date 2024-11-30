"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameState } from "@/hooks/use-game-state";
import { cn } from "@/lib/utils";
import { CharacterCard } from "./character/character-card";
import { CharacterCreation } from "./character/character-creation";

interface CharacterPanelProps {
  className?: string;
}

export function CharacterPanel({ className }: CharacterPanelProps) {
  const { characters } = useGameState();

  return (
    <Card className={cn("h-[600px]", className)}>
      <ScrollArea className="h-full p-4">
        <h2 className="text-2xl font-bold mb-4">Personnages</h2>
        <div className="space-y-4">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
          {characters.length === 0 && <CharacterCreation />}
        </div>
      </ScrollArea>
    </Card>
  );
}