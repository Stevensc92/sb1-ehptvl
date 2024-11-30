import { Faction, ReputationLevel } from './types';

export const REPUTATION_THRESHOLDS: Record<ReputationLevel, number> = {
  hostile: -6000,
  unfriendly: -3000,
  neutral: 0,
  friendly: 3000,
  honored: 9000,
  revered: 21000,
  exalted: 42000,
};

export const FACTIONS: Faction[] = [
  {
    id: 'merchants_guild',
    name: 'Guilde des Marchands',
    description: 'Contrôle le commerce entre les villages',
    rewards: {
      friendly: {
        items: ['merchant_discount_card'],
        title: 'Client Privilégié'
      },
      honored: {
        items: ['rare_goods_access'],
        missions: ['merchant_special_delivery'],
        title: 'Partenaire Commercial'
      },
      exalted: {
        items: ['black_market_access'],
        title: 'Magnat du Commerce'
      }
    }
  },
  {
    id: 'anbu',
    name: 'ANBU',
    description: 'Forces spéciales du village',
    rewards: {
      honored: {
        items: ['anbu_mask'],
        skills: ['shadow_assassination'],
        title: 'Agent ANBU'
      },
      exalted: {
        items: ['anbu_commander_blade'],
        title: 'Commandant ANBU'
      }
    }
  },
  {
    id: 'medical_corps',
    name: 'Corps Médical',
    description: 'Experts en ninjutsu médical',
    rewards: {
      friendly: {
        skills: ['basic_healing'],
        title: 'Apprenti Médecin'
      },
      revered: {
        skills: ['resurrection_technique'],
        title: 'Maître Guérisseur'
      }
    }
  }
];