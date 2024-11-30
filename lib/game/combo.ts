import { Character, Skill } from "./types";

export function processCombo(character: Character, skill: Skill): {
  character: Character;
  bonusDamage: number;
  message?: string;
} {
  const newCombo = skill.comboPoint ? character.combo + skill.comboPoint : 0;
  let bonusDamage = 0;
  let message: string | undefined;

  if (newCombo >= 3) {
    bonusDamage = Math.floor(skill.damage * 0.5);
    message = `${character.name} déclenche un combo ! (+${bonusDamage} dégâts)`;
  }

  return {
    character: {
      ...character,
      combo: newCombo >= 3 ? 0 : newCombo,
    },
    bonusDamage,
    message,
  };
}