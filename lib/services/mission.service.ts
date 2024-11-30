import { prisma } from '@/lib/db';
import { Mission } from '@prisma/client';

export class MissionService {
  static async create(characterId: string, mission: Omit<Mission, 'id' | 'characterId'>) {
    return prisma.mission.create({
      data: {
        ...mission,
        characterId
      }
    });
  }

  static async updateStatus(missionId: string, status: string) {
    return prisma.mission.update({
      where: { id: missionId },
      data: { status }
    });
  }

  static async updateObjectives(missionId: string, objectives: string) {
    return prisma.mission.update({
      where: { id: missionId },
      data: { objectives }
    });
  }

  static async getActiveByCharacterId(characterId: string) {
    return prisma.mission.findMany({
      where: {
        characterId,
        status: 'active'
      }
    });
  }
}