"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGameState } from "@/hooks/use-game-state";
import { INITIAL_STATS, VILLAGES, STARTER_SKILLS } from "@/lib/game/constants";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function CharacterCreation() {
  const { addCharacter } = useGameState();
  const [name, setName] = useState("");
  const [village, setVillage] = useState(VILLAGES[0].id);

  const handleCreateCharacter = () => {
    if (!name.trim()) return;

    const selectedVillage = VILLAGES.find((v) => v.id === village)!;
    const stats = { ...INITIAL_STATS };

    // Appliquer les bonus du village
    Object.entries(selectedVillage.bonusStats).forEach(([stat, bonus]) => {
      stats[stat as keyof typeof stats] += bonus;
    });

    const character = {
      id: uuidv4(),
      name: name.trim(),
      level: 1,
      experience: 0,
      stats,
      skills: [
        ...STARTER_SKILLS.taijutsu,
        ...STARTER_SKILLS.ninjutsu,
        ...STARTER_SKILLS.genjutsu,
      ],
      equipment: {},
      village: selectedVillage.id,
    };

    addCharacter(character);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Créer un nouveau ninja</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom du ninja</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez le nom de votre ninja"
          />
        </div>

        <div className="space-y-2">
          <Label>Village</Label>
          <RadioGroup value={village} onValueChange={setVillage}>
            {VILLAGES.map((v) => (
              <div key={v.id} className="flex items-center space-x-2">
                <RadioGroupItem value={v.id} id={v.id} />
                <Label htmlFor={v.id}>{v.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button onClick={handleCreateCharacter} disabled={!name.trim()}>
          Créer le ninja
        </Button>
      </div>
    </Card>
  );
}