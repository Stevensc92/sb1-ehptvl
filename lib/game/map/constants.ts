import { MapLocation } from './types';

export const INITIAL_LOCATIONS: MapLocation[] = [
  {
    id: 'konoha',
    name: 'Konoha',
    type: 'village',
    description: 'Le Village Caché des Feuilles',
    x: 50,
    y: 50,
    connections: ['training_grounds', 'forest_of_death'],
    missions: ['mission_d_rank_1', 'mission_c_rank_1'],
    resources: ['wood', 'herbs']
  },
  {
    id: 'training_grounds',
    name: 'Terrains d\'entraînement',
    type: 'forest',
    description: 'Zone d\'entraînement principale de Konoha',
    x: 40,
    y: 45,
    connections: ['konoha'],
    missions: ['training_mission_1'],
    resources: ['training_dummy']
  },
  {
    id: 'forest_of_death',
    name: 'Forêt de la Mort',
    type: 'forest',
    description: 'Une forêt dangereuse utilisée pour les examens Chunin',
    x: 60,
    y: 55,
    requiredLevel: 5,
    connections: ['konoha'],
    missions: ['chunin_exam_preliminary'],
    resources: ['rare_herbs', 'scrolls']
  }
];