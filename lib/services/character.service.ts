import { prisma } from '@/lib/db';
import { Character, Stats } from '@prisma/client';

export class CharacterService {
  static async create(userId: string, data: {
    name: string;
    village: string;
    stats: Omit<Stats, 'id' | 'characterId'>;
  }) {
    return prisma.character.create({
      data: {
        name: data.name,
        village: data.village,
        userId,
        stats: {
          create: data.stats
        },
        inventory: {
          create: {
            maxSlots: 20,
            coins: 0
          }
        }
      },
      include: {
        stats: true,
        inventory: true
      }
    });
  }

  static async getByUserId(userId: string) {
    return prisma.character.findMany({
      where: { userId },
      include: {
        stats: true,
        inventory: {
          include: {
            items: true
          }
        },
        missions: true,
        questChains: true
      }
    });
  }

  static async updateExperience(characterId: string, experience: number) {
    return prisma.character.update({
      where: { id: characterId },
      data: { experience }
    });
  }

  static async updateStats(characterId: string, stats: Partial<Stats>) {
    return prisma.stats.update({
      where: { characterId },
      data: stats
    });
  }
}