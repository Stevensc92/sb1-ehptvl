import { prisma } from '@/lib/db';
import { QuestChain } from '@prisma/client';

export class QuestChainService {
  static async create(characterId: string, questChain: Omit<QuestChain, 'id' | 'characterId'>) {
    return prisma.questChain.create({
      data: {
        ...questChain,
        characterId
      }
    });
  }

  static async updateProgress(questChainId: string, currentStep: number) {
    return prisma.questChain.update({
      where: { id: questChainId },
      data: { currentStep }
    });
  }

  static async getByCharacterId(characterId: string) {
    return prisma.questChain.findMany({
      where: { characterId }
    });
  }
}