export type MissionType = 'main' | 'side' | 'daily' | 'event' | 'clan';
export type MissionStatus = 'available' | 'active' | 'completed' | 'failed';
export type ObjectiveType = 'defeat' | 'collect' | 'explore' | 'train' | 'escort';

export interface MissionObjective {
  id: string;
  type: ObjectiveType;
  description: string;
  target: string;
  required: number;
  current: number;
}

export interface Mission {
  id: string;
  type: MissionType;
  name: string;
  description: string;
  level: number;
  status: MissionStatus;
  locationId: string;
  objectives: MissionObjective[];
  rewards: {
    experience: number;
    coins: number;
    items?: string[];
    reputation?: {
      faction: string;
      amount: number;
    };
  };
  timeLimit?: number; // en minutes
  prerequisites?: {
    missions?: string[];
    level?: number;
    reputation?: {
      faction: string;
      amount: number;
    }[];
  };
}