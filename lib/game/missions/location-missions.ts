import { Mission } from './types';
import { v4 as uuidv4 } from 'uuid';

export const LOCATION_MISSIONS: Record<string, Mission[]> = {
  'konoha': [
    {
      id: 'konoha_defense',
      type: 'main',
      name: 'Défense de Konoha',
      description: 'Protégez les murs du village contre une menace imminente',
      level: 10,
      status: 'available',
      locationId: 'konoha',
      objectives: [
        {
          id: uuidv4(),
          type: 'defeat',
          description: 'Éliminez les ninjas ennemis',
          target: 'enemy_ninja',
          required: 5,
          current: 0
        },
        {
          id: uuidv4(),
          type: 'explore',
          description: 'Inspectez les points faibles des murs',
          target: 'wall_point',
          required: 3,
          current: 0
        }
      ],
      rewards: {
        experience: 500,
        coins: 300,
        reputation: {
          faction: 'anbu',
          amount: 100
        }
      }
    }
  ],
  'training_grounds': [
    {
      id: 'advanced_training',
      type: 'side',
      name: 'Entraînement avancé',
      description: 'Perfectionnez vos techniques avec un maître',
      level: 5,
      status: 'available',
      locationId: 'training_grounds',
      objectives: [
        {
          id: uuidv4(),
          type: 'train',
          description: 'Complétez des exercices spéciaux',
          target: 'special_training',
          required: 4,
          current: 0
        }
      ],
      rewards: {
        experience: 300,
        coins: 150,
        items: ['training_scroll']
      }
    }
  ],
  'forest_of_death': [
    {
      id: 'survival_test',
      type: 'main',
      name: 'Test de survie',
      description: 'Survivez dans la Forêt de la Mort',
      level: 15,
      status: 'available',
      locationId: 'forest_of_death',
      objectives: [
        {
          id: uuidv4(),
          type: 'collect',
          description: 'Récupérez des parchemins',
          target: 'heaven_scroll',
          required: 1,
          current: 0
        },
        {
          id: uuidv4(),
          type: 'collect',
          description: 'Récupérez des parchemins',
          target: 'earth_scroll',
          required: 1,
          current: 0
        },
        {
          id: uuidv4(),
          type: 'defeat',
          description: 'Survivez aux équipes adverses',
          target: 'enemy_team',
          required: 2,
          current: 0
        }
      ],
      rewards: {
        experience: 1000,
        coins: 500,
        items: ['chunin_vest'],
        reputation: {
          faction: 'academy',
          amount: 500
        }
      },
      timeLimit: 120,
      prerequisites: {
        level: 15,
        missions: ['konoha_defense']
      }
    }
  ]
};