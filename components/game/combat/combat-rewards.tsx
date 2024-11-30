"use client";

import { Card } from "@/components/ui/card";
import { CombatRewards as CombatRewardsType } from "@/lib/game/types";
import { Coins, Star } from "lucide-react";

interface CombatRewardsProps {
  rewards: CombatRewardsType;
}

export function CombatRewards({ rewards }: CombatRewardsProps) {
  return (
    <Card className="p-4 mt-4">
      <h4 className="text-lg font-bold mb-2">Récompenses</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{rewards.experience} points d'expérience</span>
        </div>
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-yellow-500" />
          <span>{rewards.coins} pièces</span>
        </div>
        {rewards.items.length > 0 && (
          <div className="mt-2">
            <h5 className="font-medium mb-1">Objets obtenus:</h5>
            <ul className="space-y-1">
              {rewards.items.map((item) => (
                <li key={item.id} className="text-sm">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}