import { Character, Skill, StatusEffectType } from "./types";
import { processStatusEffects } from "./status-effects";
import { processCombo } from "./combo";
import { calculateRewards, processExperience } from "./rewards";

export interface CombatState {
  attacker: Character;
  defender: Character;
  turn: number;
  logs: CombatLog[];
  isFinished: boolean;
  winner?: Character;
  rewards?: CombatRewards;
}

export interface CombatLog {
  turn: number;
  message: string;
  damage?: number;
  skill?: Skill;
  target?: "attacker" | "defender";
  isStatusEffect?: boolean;
  isCombo?: boolean;
}

export function initializeCombat(attacker: Character, defender: Character): CombatState {
  return {
    attacker: { ...attacker, statusEffects: [], combo: 0 },
    defender: { ...defender, statusEffects: [], combo: 0 },
    turn: 1,
    logs: [],
    isFinished: false,
  };
}

export function calculateDamage(
  skill: Skill,
  attacker: Character,
  defender: Character,
  comboDamage: number = 0
): number {
  let baseDamage = skill.damage + comboDamage;
  
  switch (skill.type) {
    case "taijutsu":
      baseDamage += attacker.stats.taijutsu * 0.5;
      break;
    case "ninjutsu":
      baseDamage += attacker.stats.ninjutsu * 0.5;
      break;
    case "genjutsu":
      baseDamage += attacker.stats.genjutsu * 0.5;
      break;
  }

  const reduction = defender.stats.fortitude * 0.2;
  return Math.max(1, Math.floor(baseDamage - reduction));
}

export function executeSkill(
  state: CombatState,
  skill: Skill,
  attacker: "attacker" | "defender"
): CombatState {
  const attackingCharacter = state[attacker];
  const defendingCharacter = attacker === "attacker" ? state.defender : state.attacker;

  // Vérifier la paralysie
  if (attackingCharacter.statusEffects.some(e => e.type === "paralysis")) {
    return {
      ...state,
      logs: [
        ...state.logs,
        {
          turn: state.turn,
          message: `${attackingCharacter.name} est paralysé et ne peut pas attaquer`,
          target: attacker,
          isStatusEffect: true,
        },
      ],
    };
  }

  // Vérifier le chakra
  if (attackingCharacter.stats.chakra < skill.chakraCost) {
    return {
      ...state,
      logs: [
        ...state.logs,
        {
          turn: state.turn,
          message: `${attackingCharacter.name} n'a pas assez de chakra pour utiliser ${skill.name}`,
          target: attacker,
        },
      ],
    };
  }

  // Traiter les combos
  const { character: afterComboChar, bonusDamage, message: comboMessage } = 
    processCombo(attackingCharacter, skill);

  // Calculer les dégâts
  const damage = calculateDamage(skill, afterComboChar, defendingCharacter, bonusDamage);

  // Appliquer les effets de statut
  let updatedDefender = defendingCharacter;
  if (skill.statusEffect && Math.random() < (skill.statusEffectChance || 0.3)) {
    updatedDefender = {
      ...defendingCharacter,
      statusEffects: [
        ...defendingCharacter.statusEffects,
        {
          type: skill.statusEffect,
          duration: 3,
          value: Math.floor(damage * 0.2),
        },
      ],
    };
  }

  // Traiter les effets de statut existants
  const { character: afterStatusDefender, damage: statusDamage, messages: statusMessages } =
    processStatusEffects(updatedDefender);

  // Mettre à jour les stats
  const updatedAttacker = {
    ...afterComboChar,
    stats: {
      ...afterComboChar.stats,
      chakra: afterComboChar.stats.chakra - skill.chakraCost,
    },
  };

  // Vérifier si le combat est terminé
  const isFinished = afterStatusDefender.stats.fortitude <= 0;
  let rewards;
  
  if (isFinished) {
    rewards = calculateRewards(updatedAttacker, afterStatusDefender);
    const { character: finalAttacker } = processExperience(updatedAttacker, rewards.experience);
    updatedAttacker.experience = finalAttacker.experience;
    updatedAttacker.level = finalAttacker.level;
  }

  return {
    ...state,
    [attacker]: updatedAttacker,
    [attacker === "attacker" ? "defender" : "attacker"]: afterStatusDefender,
    logs: [
      ...state.logs,
      {
        turn: state.turn,
        message: `${attackingCharacter.name} utilise ${skill.name} et inflige ${damage} dégâts`,
        damage,
        skill,
        target: attacker,
      },
      ...(comboMessage ? [{ turn: state.turn, message: comboMessage, isCombo: true }] : []),
      ...statusMessages.map(message => ({
        turn: state.turn,
        message,
        isStatusEffect: true,
      })),
    ],
    turn: state.turn + 1,
    isFinished,
    winner: isFinished ? updatedAttacker : undefined,
    rewards: isFinished ? rewards : undefined,
  };
}