"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Character } from "@/lib/game/types";
import { Flame, Swords, Target } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { stats } = character;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{character.name}</h3>
          <p className="text-sm text-muted-foreground">
            Niveau {character.level}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4" />
          <div className="flex-1">
            <Progress value={(stats.taijutsu / 100) * 100} className="h-2" />
          </div>
          <span className="text-sm">{stats.taijutsu}</span>
        </div>

        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4" />
          <div className="flex-1">
            <Progress value={(stats.ninjutsu / 100) * 100} className="h-2" />
          </div>
          <span className="text-sm">{stats.ninjutsu}</span>
        </div>

        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <div className="flex-1">
            <Progress value={(stats.genjutsu / 100) * 100} className="h-2" />
          </div>
          <span className="text-sm">{stats.genjutsu}</span>
        </div>
      </div>
    </Card>
  );
}