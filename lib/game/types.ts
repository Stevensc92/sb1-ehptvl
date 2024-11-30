export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  stats: CharacterStats;
  skills: Skill[];
  equipment: Equipment;
  statusEffects: StatusEffect[];
  combo: number;
}

export interface CharacterStats {
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  fortitude: number;
  chakra: number;
  initiative: number;
  precision: number;
  speed: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  chakraCost: number;
  damage: number;
  type: "taijutsu" | "ninjutsu" | "genjutsu";
  cooldown: number;
  statusEffect?: StatusEffectType;
  statusEffectChance?: number;
  comboPoint?: number;
}

export interface Equipment {
  headband?: Item;
  cloak?: Item;
  outfit?: Item;
  gloves?: Item;
  shoes?: Item;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  stats: Partial<CharacterStats>;
  type: "headband" | "cloak" | "outfit" | "gloves" | "shoes";
}

export interface StatusEffect {
  type: StatusEffectType;
  duration: number;
  value: number;
}

export type StatusEffectType = 
  | "poison"
  | "paralysis"
  | "burn"
  | "bleed"
  | "chakraBlock";

export interface CombatRewards {
  experience: number;
  items: Item[];
  coins: number;
}