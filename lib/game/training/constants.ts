import { TrainingDummy } from './types';

export const TRAINING_DUMMIES: TrainingDummy[] = [
  {
    id: 'basic_dummy',
    name: 'Mannequin d\'entraînement basique',
    level: 1,
    stats: {
      fortitude: 50,
      chakra: 30,
      taijutsu: 3,
      ninjutsu: 2,
      genjutsu: 1
    },
    skills: ['basic_attack'],
    rewards: {
      experience: 25,
      coins: 10
    }
  },
  {
    id: 'intermediate_dummy',
    name: 'Mannequin d\'entraînement intermédiaire',
    level: 5,
    stats: {
      fortitude: 100,
      chakra: 50,
      taijutsu: 6,
      ninjutsu: 4,
      genjutsu: 2
    },
    skills: ['basic_attack', 'counter_attack'],
    rewards: {
      experience: 50,
      coins: 25
    }
  },
  {
    id: 'advanced_dummy',
    name: 'Mannequin d\'entraînement avancé',
    level: 10,
    stats: {
      fortitude: 200,
      chakra: 100,
      taijutsu: 10,
      ninjutsu: 8,
      genjutsu: 5
    },
    skills: ['basic_attack', 'counter_attack', 'defensive_stance'],
    rewards: {
      experience: 100,
      coins: 50
    }
  }
];