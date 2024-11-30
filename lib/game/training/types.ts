export interface TrainingDummy {
  id: string;
  name: string;
  level: number;
  stats: {
    fortitude: number;
    chakra: number;
    taijutsu: number;
    ninjutsu: number;
    genjutsu: number;
  };
  skills: string[];
  rewards: {
    experience: number;
    coins: number;
  };
}

export interface TrainingSession {
  id: string;
  type: 'basic' | 'advanced' | 'specialized';
  dummyId: string;
  status: 'available' | 'in_progress' | 'completed';
  startTime?: number;
  endTime?: number;
  results?: {
    damageDealt: number;
    damageReceived: number;
    skillsUsed: string[];
    comboDamage: number;
  };
}