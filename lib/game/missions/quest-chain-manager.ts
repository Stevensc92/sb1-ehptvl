import { Mission, MissionObjective } from './types';
import { v4 as uuidv4 } from 'uuid';

export interface QuestChain {
  id: string;
  name: string;
  description: string;
  missions: string[]; // IDs des missions dans l'ordre
  currentStep: number;
  rewards: {
    experience: number;
    coins: number;
    items?: string[];
    title?: string;
  };
}

export class QuestChainManager {
  private chains: Map<string, QuestChain> = new Map();
  private missionToChain: Map<string, string> = new Map();

  public createChain(data: Omit<QuestChain, 'id' | 'currentStep'>): QuestChain {
    const chain: QuestChain = {
      id: uuidv4(),
      ...data,
      currentStep: 0
    };

    this.chains.set(chain.id, chain);
    data.missions.forEach(missionId => {
      this.missionToChain.set(missionId, chain.id);
    });

    return chain;
  }

  public onMissionComplete(missionId: string): void {
    const chainId = this.missionToChain.get(missionId);
    if (!chainId) return;

    const chain = this.chains.get(chainId);
    if (!chain) return;

    const currentMissionId = chain.missions[chain.currentStep];
    if (currentMissionId === missionId) {
      chain.currentStep++;
      
      // Vérifier si la chaîne est terminée
      if (chain.currentStep >= chain.missions.length) {
        this.completeChain(chainId);
      }
    }
  }

  private completeChain(chainId: string): void {
    const chain = this.chains.get(chainId);
    if (!chain) return;

    // Logique pour attribuer les récompenses finales
    console.log(`Chaîne de quêtes "${chain.name}" terminée !`);
  }

  public getNextMission(chainId: string): string | null {
    const chain = this.chains.get(chainId);
    if (!chain || chain.currentStep >= chain.missions.length) return null;
    return chain.missions[chain.currentStep];
  }

  public getChainProgress(chainId: string): {
    completed: number;
    total: number;
    percentage: number;
  } {
    const chain = this.chains.get(chainId);
    if (!chain) return { completed: 0, total: 0, percentage: 0 };

    return {
      completed: chain.currentStep,
      total: chain.missions.length,
      percentage: (chain.currentStep / chain.missions.length) * 100
    };
  }
}