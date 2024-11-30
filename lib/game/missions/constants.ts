import { Mission } from './types';

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mission_d_rank_1',
    type: 'main',
    name: 'Premiers pas de ninja',
    description: 'Prouvez votre valeur en tant que Genin',
    level: 1,
    status: 'available',
    locationId: 'konoha',
    objectives: [
      {
        id: 'objective_1',
        type: 'train',
        description: 'Complétez une session d\'entraînement',
        target: 'training_grounds',
        required: 1,
        current: 0
      },
      {
        id: 'objective_2',
        type: 'defeat',
        description: 'Vaincre 3 mannequins d\'entraînement',
        target: 'training_dummy',
        required: 3,
        current: 0
      }
    ],
    rewards: {
      experience: 100,
      coins: 50,
      items: ['basic_kunai_set']
    }
  },
  {
    id: 'mission_c_rank_1',
    type: 'main',
    name: 'Protection de la caravane',
    description: 'Escortez une caravane marchande jusqu\'à sa destination',
    level: 5,
    status: 'available',
    locationId: 'konoha',
    objectives: [
      {
        id: 'objective_1',
        type: 'escort',
        description: 'Protégez la caravane jusqu\'à destination',
        target: 'merchant_caravan',
        required: 1,
        current: 0
      },
      {
        id: 'objective_2',
        type: 'defeat',
        description: 'Repoussez les bandits',
        target: 'bandit',
        required: 5,
        current: 0
      }
    ],
    rewards: {
      experience: 300,
      coins: 200,
      reputation: {
        faction: 'merchants_guild',
        amount: 100
      }
    },
    timeLimit: 60,
    prerequisites: {
      missions: ['mission_d_rank_1'],
      level: 5
    }
  }
];