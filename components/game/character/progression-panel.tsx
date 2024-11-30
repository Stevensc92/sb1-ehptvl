"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameState } from "@/hooks/use-game-state";
import { EXPERIENCE_TABLE } from "@/lib/game/progression/constants";
import { Star, Award, Scroll } from "lucide-react";
import { SkillTree } from "./skill-tree";

export function ProgressionPanel() {
  const { player, skillTrees, learnSkill } = useGameState();

  const currentLevelExp = EXPERIENCE_TABLE[player.level - 1] || 0;
  const nextLevelExp = EXPERIENCE_TABLE[player.level] || currentLevelExp * 2;
  const progress = ((player.experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">Niveau {player.level}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {player.experience - currentLevelExp} / {nextLevelExp - currentLevelExp} XP
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-500" />
          <span>{player.skillPoints} points de compétence</span>
        </div>

        <Tabs defaultValue="skills">
          <TabsList className="w-full">
            <TabsTrigger value="skills" className="flex-1">
              <Scroll className="w-4 h-4 mr-2" />
              Compétences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-4">
            {skillTrees.map((tree) => (
              <SkillTree
                key={tree.id}
                tree={tree}
                onLearnSkill={learnSkill}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}