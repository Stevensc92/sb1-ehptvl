export type StatType = 'taijutsu' | 'ninjutsu' | 'genjutsu' | 'fortitude' | 'chakra' | 'initiative' | 'precision' | 'speed';

export interface LevelUpReward {
  stats: Partial<Record<StatType, number>>;
  skillPoints: number;
  newSkills?: string[];
}

export interface ProgressionState {
  level: number;
  experience: number;
  skillPoints: number;
  unlockedSkills: string[];
  masteredSkills: string[];
  specialization?: string;
}

export interface SkillTree {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
  requirements?: {
    level?: number;
    skills?: string[];
    specialization?: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'active' | 'passive';
  cost: number;
  requirements: {
    level: number;
    skillPoints: number;
    prerequisites?: string[];
  };
  effects: {
    damage?: number;
    healing?: number;
    statBonus?: Partial<Record<StatType, number>>;
    statusEffect?: string;
  };
}