import { Mission } from './types';
import { v4 as uuidv4 } from 'uuid';

const DAILY_MISSION_TEMPLATES = [
  {
    name: 'Patrouille quotidienne',
    description: 'Effectuez une patrouille autour du village',
    type: 'daily' as const,
    objectives: [
      {
        type: 'explore' as const,
        description: 'Explorer les points stratégiques',
        target: 'patrol_point',
        required: 3
      }
    ],
    rewards: {
      experience: 150,
      coins: 100
    }
  },
  {
    name: 'Entraînement du jour',
    description: 'Complétez les exercices quotidiens',
    type: 'daily' as const,
    objectives: [
      {
        type: 'train' as const,
        description: 'Effectuer des sessions d\'entraînement',
        target: 'training_session',
        required: 2
      }
    ],
    rewards: {
      experience: 200,
      coins: 75
    }
  }
];

export function generateDailyMissions(playerLevel: number): Mission[] {
  return DAILY_MISSION_TEMPLATES.map(template => ({
    id: uuidv4(),
    ...template,
    level: playerLevel,
    status: 'available',
    locationId: 'konoha',
    objectives: template.objectives.map(obj => ({
      id: uuidv4(),
      ...obj,
      current: 0
    })),
    timeLimit: 1440 // 24 heures en minutes
  }));
}