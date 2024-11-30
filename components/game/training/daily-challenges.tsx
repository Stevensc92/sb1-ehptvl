"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Target, Award } from "lucide-react";

interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  current: number;
  required: number;
  reward: {
    experience: number;
    coins: number;
  };
}

const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'combo_master',
    name: 'Maître des combos',
    description: 'Effectuez 10 combos pendant l\'entraînement',
    current: 0,
    required: 10,
    reward: {
      experience: 200,
      coins: 100
    }
  },
  {
    id: 'endurance',
    name: 'Endurance',
    description: 'Complétez 5 sessions d\'entraînement',
    current: 0,
    required: 5,
    reward: {
      experience: 300,
      coins: 150
    }
  },
  {
    id: 'perfect_training',
    name: 'Entraînement parfait',
    description: 'Terminez une session sans subir de dégâts',
    current: 0,
    required: 1,
    reward: {
      experience: 500,
      coins: 250
    }
  }
];

export function DailyChallenges() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5" />
        <h3 className="text-lg font-bold">Défis quotidiens</h3>
      </div>

      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {DAILY_CHALLENGES.map((challenge) => (
            <Card key={challenge.id} className="p-3">
              <div className="mb-2">
                <h4 className="font-medium">{challenge.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {challenge.description}
                </p>
              </div>

              <div className="space-y-2">
                <Progress
                  value={(challenge.current / challenge.required) * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-sm">
                  <span>
                    {challenge.current}/{challenge.required}
                  </span>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>{challenge.reward.experience} XP</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}