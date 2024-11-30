export type FactionId = 
  | 'merchants_guild' 
  | 'anbu' 
  | 'medical_corps' 
  | 'academy' 
  | 'blacksmiths';

export type ReputationLevel = 
  | 'hostile'
  | 'unfriendly'
  | 'neutral'
  | 'friendly'
  | 'honored'
  | 'revered'
  | 'exalted';

export interface Faction {
  id: FactionId;
  name: string;
  description: string;
  rewards: {
    [key in ReputationLevel]?: {
      items?: string[];
      missions?: string[];
      skills?: string[];
      title?: string;
    };
  };
}

export interface ReputationState {
  [key in FactionId]: {
    level: ReputationLevel;
    points: number;
  };
}