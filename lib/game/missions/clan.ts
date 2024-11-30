import { Mission } from './types';
import { v4 as uuidv4 } from 'uuid';

export interface ClanMission extends Mission {
  requiredParticipants: number;
  currentParticipants: string[]; // IDs des participants
  startTime?: number; // Timestamp du début
}

const CLAN_MISSION_TEMPLATES = [
  {
    name: 'Défense du village',
    description: 'Protégez le village contre une menace majeure',
    type: 'clan' as const,
    requiredParticipants: 5,
    objectives: [
      {
        type: 'defeat' as const,
        description: 'Vaincre les envahisseurs',
        target: 'invader',
        required: 20
      }
    ],
    rewards: {
      experience: 1000,
      coins: 500,
      items: ['clan_defense_medal']
    }
  },
  {
    name: 'Raid sur le repaire',
    description: 'Infiltrez et éliminez une base ennemie',
    type: 'clan' as const,
    requiredParticipants: 3,
    objectives: [
      {
        type: 'explore' as const,
        description: 'Localiser les documents secrets',
        target: 'secret_documents',
        required: 1
      },
      {
        type: 'defeat' as const,
        description: 'Éliminer les gardes',
        target: 'guard',
        required: 10
      }
    ],
    rewards: {
      experience: 800,
      coins: 400,
      items: ['enemy_intel']
    }
  }
];

export function generateClanMission(clanLevel: number): ClanMission {
  const template = CLAN_MISSION_TEMPLATES[Math.floor(Math.random() * CLAN_MISSION_TEMPLATES.length)];
  
  return {
    id: uuidv4(),
    ...template,
    level: clanLevel,
    status: 'available',
    locationId: 'clan_grounds',
    objectives: template.objectives.map(obj => ({
      id: uuidv4(),
      ...obj,
      current: 0
    })),
    currentParticipants: [],
    timeLimit: 120 // 2 heures en minutes
  };
}