import { LevelUpReward, SkillTree } from './types';

export const EXPERIENCE_TABLE: number[] = Array.from({ length: 100 }, (_, i) => 
  Math.floor(100 * Math.pow(1.5, i))
);

export const LEVEL_UP_REWARDS: Record<number, LevelUpReward> = {
  1: {
    stats: {
      taijutsu: 2,
      ninjutsu: 2,
      genjutsu: 2,
      fortitude: 5,
      chakra: 5
    },
    skillPoints: 1
  },
  5: {
    stats: {
      taijutsu: 3,
      ninjutsu: 3,
      genjutsu: 3,
      fortitude: 8,
      chakra: 8,
      initiative: 1,
      precision: 1,
      speed: 1
    },
    skillPoints: 2,
    newSkills: ['shadow_clone_jutsu']
  },
  10: {
    stats: {
      taijutsu: 5,
      ninjutsu: 5,
      genjutsu: 5,
      fortitude: 12,
      chakra: 12,
      initiative: 2,
      precision: 2,
      speed: 2
    },
    skillPoints: 3,
    newSkills: ['chakra_control_advanced']
  }
};

export const SKILL_TREES: SkillTree[] = [
  {
    id: 'taijutsu_tree',
    name: 'Voie du Taijutsu',
    description: 'Maîtrise du combat au corps à corps',
    skills: [
      {
        id: 'leaf_hurricane',
        name: 'Ouragan de la Feuille',
        description: 'Une puissante technique de coup de pied rotatif',
        type: 'active',
        cost: 2,
        requirements: {
          level: 3,
          skillPoints: 2
        },
        effects: {
          damage: 30,
          statBonus: {
            speed: 1
          }
        }
      },
      {
        id: 'eight_gates',
        name: 'Huit Portes',
        description: 'Libère les limiteurs du corps',
        type: 'active',
        cost: 5,
        requirements: {
          level: 10,
          skillPoints: 4,
          prerequisites: ['leaf_hurricane']
        },
        effects: {
          statBonus: {
            taijutsu: 10,
            speed: 5
          },
          statusEffect: 'eight_gates_drain'
        }
      }
    ]
  },
  {
    id: 'ninjutsu_tree',
    name: 'Voie du Ninjutsu',
    description: 'Maîtrise des techniques ninja',
    skills: [
      {
        id: 'fireball_jutsu',
        name: 'Technique de la Boule de Feu',
        description: 'Crache une puissante boule de feu',
        type: 'active',
        cost: 3,
        requirements: {
          level: 5,
          skillPoints: 2
        },
        effects: {
          damage: 40,
          statusEffect: 'burn'
        }
      }
    ]
  }
];