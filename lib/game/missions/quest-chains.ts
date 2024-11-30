import { QuestChain } from './quest-chain-manager';

export const INITIAL_QUEST_CHAINS: Omit<QuestChain, 'id' | 'currentStep'>[] = [
  {
    name: "L'Éveil du Ninja",
    description: "Votre parcours pour devenir un ninja accompli commence ici",
    missions: ['mission_d_rank_1', 'basic_training', 'first_combat'],
    rewards: {
      experience: 500,
      coins: 1000,
      title: "Genin Prometteur"
    }
  },
  {
    name: "Protection du Village",
    description: "Prouvez votre valeur en défendant Konoha",
    missions: ['patrol_duty', 'defend_gates', 'repel_bandits'],
    rewards: {
      experience: 1000,
      coins: 2000,
      items: ['konoha_defender_badge'],
      title: "Protecteur de Konoha"
    }
  },
  {
    name: "Les Arts Ninja",
    description: "Maîtrisez les différentes disciplines ninja",
    missions: ['taijutsu_mastery', 'ninjutsu_training', 'genjutsu_basics'],
    rewards: {
      experience: 1500,
      coins: 3000,
      items: ['secret_scroll'],
      title: "Maître des Arts"
    }
  }
];