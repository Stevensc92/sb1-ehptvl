import { Character, CombatRewards, Item } from "./types";

const EXPERIENCE_BASE = 100;
const EXPERIENCE_LEVEL_MULTIPLIER = 0.1;
const COINS_BASE = 50;
const COINS_LEVEL_MULTIPLIER = 0.2;

export function calculateRewards(winner: Character, loser: Character): CombatRewards {
  const levelDifference = loser.level - winner.level;
  const experienceMultiplier = 1 + Math.max(0, levelDifference * EXPERIENCE_LEVEL_MULTIPLIER);
  const coinsMultiplier = 1 + Math.max(0, levelDifference * COINS_LEVEL_MULTIPLIER);

  const experience = Math.floor(EXPERIENCE_BASE * experienceMultiplier);
  const coins = Math.floor(COINS_BASE * coinsMultiplier);

  // Logique de drop d'items à implémenter selon les besoins
  const items: Item[] = [];

  return {
    experience,
    items,
    coins,
  };
}

export function processExperience(character: Character, experience: number): {
  character: Character;
  leveledUp: boolean;
  newLevel?: number;
} {
  const experienceToNextLevel = character.level * 1000;
  const newExperience = character.experience + experience;
  
  if (newExperience >= experienceToNextLevel) {
    const newLevel = character.level + 1;
    return {
      character: {
        ...character,
        level: newLevel,
        experience: newExperience - experienceToNextLevel,
        stats: {
          ...character.stats,
          taijutsu: character.stats.taijutsu + 2,
          ninjutsu: character.stats.ninjutsu + 2,
          genjutsu: character.stats.genjutsu + 2,
          fortitude: character.stats.fortitude + 5,
          chakra: character.stats.chakra + 5,
          initiative: character.stats.initiative + 1,
          precision: character.stats.precision + 1,
          speed: character.stats.speed + 1,
        },
      },
      leveledUp: true,
      newLevel,
    };
  }

  return {
    character: {
      ...character,
      experience: newExperience,
    },
    leveledUp: false,
  };
}