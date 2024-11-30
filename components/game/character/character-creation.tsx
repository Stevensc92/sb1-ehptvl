"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";
import { VILLAGES, INITIAL_STATS } from "@/lib/game/constants";
import { useState } from "react";
import { CharacterService } from "@/lib/services/character.service";
import { toast } from "sonner";
import { useCharacterData } from "@/hooks/use-character-data";

export function CharacterCreation() {
  const { data: session } = useSession();
  const { refresh } = useCharacterData();
  const [name, setName] = useState("");
  const [village, setVillage] = useState(VILLAGES[0].id);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCharacter = async () => {
    if (!session?.user?.id || !name.trim() || isCreating) return;

    try {
      setIsCreating(true);
      const selectedVillage = VILLAGES.find((v) => v.id === village)!;
      const stats = { ...INITIAL_STATS };

      // Appliquer les bonus du village
      Object.entries(selectedVillage.bonusStats).forEach(([stat, bonus]) => {
        stats[stat as keyof typeof stats] += bonus;
      });

      await CharacterService.create(session.user.id, {
        name: name.trim(),
        village: selectedVillage.id,
        stats
      });

      toast.success("Personnage créé avec succès !");
      await refresh();
    } catch (error) {
      console.error("Erreur lors de la création du personnage:", error);
      toast.error("Erreur lors de la création du personnage");
    } finally {
      setIsCreating(false);
    }
  };

  if (!session) {
    return (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Connectez-vous pour créer un personnage</h3>
          <p className="text-muted-foreground">
            Vous devez être connecté pour créer et gérer vos personnages.
          </p>
        </Card>
    );
  }

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
                disabled={isCreating}
            />
          </div>

          <div className="space-y-2">
            <Label>Village</Label>
            <RadioGroup value={village} onValueChange={setVillage} disabled={isCreating}>
              {VILLAGES.map((v) => (
                  <div key={v.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={v.id} id={v.id} />
                    <Label htmlFor={v.id} className="flex-1">
                      <div>
                        <span className="font-medium">{v.name}</span>
                        <p className="text-sm text-muted-foreground">{v.description}</p>
                      </div>
                      <div className="text-sm mt-1 space-y-1">
                        {Object.entries(v.bonusStats).map(([stat, value]) => (
                            <p key={stat} className="text-green-600 dark:text-green-400">
                              +{value} {stat}
                            </p>
                        ))}
                      </div>
                    </Label>
                  </div>
              ))}
            </RadioGroup>
          </div>

          <Button
              onClick={handleCreateCharacter}
              disabled={!name.trim() || isCreating}
              className="w-full"
          >
            {isCreating ? "Création en cours..." : "Créer le ninja"}
          </Button>
        </div>
      </Card>
  );
}