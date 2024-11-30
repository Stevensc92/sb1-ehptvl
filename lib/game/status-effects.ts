import { Character, StatusEffect, StatusEffectType } from "./types";

export function applyStatusEffect(
  character: Character,
  type: StatusEffectType,
  duration: number,
  value: number
): Character {
  const newEffect: StatusEffect = { type, duration, value };
  
  return {
    ...character,
    statusEffects: [...character.statusEffects, newEffect],
  };
}

export function processStatusEffects(character: Character): {
  character: Character;
  damage: number;
  messages: string[];
} {
  let totalDamage = 0;
  const messages: string[] = [];
  const updatedEffects: StatusEffect[] = [];

  for (const effect of character.statusEffects) {
    switch (effect.type) {
      case "poison":
        totalDamage += effect.value;
        messages.push(`${character.name} subit ${effect.value} dégâts de poison`);
        break;
      case "burn":
        totalDamage += effect.value;
        messages.push(`${character.name} subit ${effect.value} dégâts de brûlure`);
        break;
      case "bleed":
        totalDamage += effect.value;
        messages.push(`${character.name} subit ${effect.value} dégâts de saignement`);
        break;
      case "paralysis":
        messages.push(`${character.name} est paralysé`);
        break;
      case "chakraBlock":
        messages.push(`${character.name} ne peut pas utiliser de chakra`);
        break;
    }

    if (effect.duration > 1) {
      updatedEffects.push({ ...effect, duration: effect.duration - 1 });
    }
  }

  return {
    character: {
      ...character,
      stats: {
        ...character.stats,
        fortitude: Math.max(0, character.stats.fortitude - totalDamage),
      },
      statusEffects: updatedEffects,
    },
    damage: totalDamage,
    messages,
  };
}