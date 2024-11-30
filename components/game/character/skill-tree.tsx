"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SkillTree as SkillTreeType, Skill } from "@/lib/game/progression/types";
import { useGameState } from "@/hooks/use-game-state";
import { Swords, Zap, Target, Lock } from "lucide-react";

interface SkillTreeProps {
  tree: SkillTreeType;
  onLearnSkill: (skillId: string) => void;
}

const skillTypeIcons = {
  taijutsu: Swords,
  ninjutsu: Zap,
  genjutsu: Target,
};

export function SkillTree({ tree, onLearnSkill }: SkillTreeProps) {
  const { player } = useGameState();

  const renderSkill = (skill: Skill) => {
    const canLearn = player.level >= skill.requirements.level;
    const Icon = skillTypeIcons[skill.type] || Zap;

    return (
      <TooltipProvider key={skill.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={canLearn ? "default" : "ghost"}
              className="w-full relative"
              disabled={!canLearn}
              onClick={() => onLearnSkill(skill.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {skill.name}
              {!canLearn && (
                <Lock className="w-4 h-4 absolute top-1 right-1" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2">
              <p className="font-bold">{skill.name}</p>
              <p className="text-sm">{skill.description}</p>
              <div className="text-sm space-y-1">
                {skill.effects.damage && (
                  <p className="text-red-500">Dégâts: {skill.effects.damage}</p>
                )}
                {skill.effects.healing && (
                  <p className="text-green-500">Soin: {skill.effects.healing}</p>
                )}
                {skill.effects.statBonus && (
                  <div className="text-blue-500">
                    Bonus:
                    {Object.entries(skill.effects.statBonus).map(
                      ([stat, value]) => (
                        <span key={stat} className="ml-1">
                          {stat} +{value}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Niveau requis: {skill.requirements.level}
                <br />
                Points requis: {skill.requirements.skillPoints}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold">{tree.name}</h3>
        <p className="text-sm text-muted-foreground">{tree.description}</p>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {tree.skills.map(renderSkill)}
        </div>
      </ScrollArea>
    </Card>
  );
}