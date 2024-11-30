import { MapEvent, EventType } from './types';
import { v4 as uuidv4 } from 'uuid';

const EVENT_TEMPLATES: Record<EventType, Omit<MapEvent, 'id' | 'locationId'>> = {
  battle: {
    type: 'battle',
    name: 'Combat inattendu',
    description: 'Des ninjas hostiles ont été repérés dans la zone',
    duration: 30,
    rewards: {
      experience: 100,
      coins: 50
    }
  },
  treasure: {
    type: 'treasure',
    name: 'Trésor caché',
    description: 'Un ancien parchemin a été découvert',
    duration: 15,
    rewards: {
      items: ['scroll_rare', 'ancient_kunai'],
      coins: 100
    }
  },
  merchant: {
    type: 'merchant',
    name: 'Marchand itinérant',
    description: 'Un marchand propose des objets rares',
    duration: 60,
    rewards: {
      items: ['merchant_special_item']
    }
  },
  ambush: {
    type: 'ambush',
    name: 'Embuscade',
    description: 'Une embuscade a été tendue par des ninjas déserteurs',
    duration: 45,
    rewards: {
      experience: 150,
      coins: 75
    }
  },
  training: {
    type: 'training',
    name: 'Opportunité d\'entraînement',
    description: 'Un maître ninja propose un entraînement spécial',
    duration: 20,
    rewards: {
      experience: 200
    }
  }
};

export function generateRandomEvent(locationId: string): MapEvent {
  const eventTypes = Object.keys(EVENT_TEMPLATES) as EventType[];
  const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const template = EVENT_TEMPLATES[randomType];

  return {
    id: uuidv4(),
    locationId,
    ...template
  };
}