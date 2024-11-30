"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Character, Skill, StatusEffectType } from "@/lib/game/types";
import { Heart, Zap, Flame, Droplet, Skull, Zap as ZapOff } from "lucide-react";

interface CombatCharacterProps {
  character: Character;
  isPlayer: boolean;
  availableSkills: Skill[];
  onSkillUse?: (skill: Skill) => void;
}

const statusEffectIcons: Record<StatusEffectType, React.ReactNode> = {
  poison: <Skull className="w-4 h-4 text-purple-500" />,
  burn: <Flame className="w-4 h-4 text-orange-500" />,
  bleed: <Droplet className="w-4 h-4 text-red-500" />,
  paralysis: <ZapOff className="w-4 h-4 text-yellow-500" />,
  chakraBlock: <Zap className="w-4 h-4 text-gray-500" />,
};

export function CombatCharacter({
  character,
  isPlayer,
  availableSkills,
  onSkillUse,
}: CombatCharacterProps) {
  const healthPercentage = (character.stats.fortitude / 100) * 100;
  const chakraPercentage = (character.stats.chakra / 100) * 100;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{character.name}</h3>
            <p className="text-sm text-muted-foreground">Niveau {character.level}</p>
          </div>
          {character.statusEffects.length > 0 && (
            <div className="flex gap-1">
              {character.statusEffects.map((effect, index) => (
                <div
                  key={index}
                  className="relative"
                  title={`${effect.type} (${effect.duration} tours restants)`}
                >
                  {statusEffectIcons[effect.type]}
                  <span className="absolute -bottom-2 -right-2 text-xs">
                    {effect.duration}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            <Progress value={healthPercentage} className="h-2" />
            <span className="text-sm">{character.stats.fortitude}</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <Progress value={chakraPercentage} className="h-2" />
            <span className="text-sm">{character.stats.chakra}</span>
          </div>
        </div>

        {character.combo > 0 && (
          <div className="text-sm font-medium text-orange-500">
            Combo: {character.combo}
          </div>
        )}

        {isPlayer && onSkillUse && (
          <div className="grid grid-cols-2 gap-2">
            {availableSkills.map((skill) => (
              <Button
                key={skill.id}
                variant="secondary"
                size="sm"
                onClick={() => onSkillUse(skill)}
                disabled={character.stats.chakra < skill.chakraCost}
                className="relative"
              >
                {skill.name}
                {skill.statusEffect && (
                  <div className="absolute -top-1 -right-1">
                    {statusEffectIcons[skill.statusEffect]}
                  </div>
                )}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}