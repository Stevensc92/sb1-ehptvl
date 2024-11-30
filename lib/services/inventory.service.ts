import { prisma } from '@/lib/db';
import { Item } from '@prisma/client';

export class InventoryService {
  static async addItem(inventoryId: string, item: Omit<Item, 'id' | 'inventoryId'>) {
    return prisma.item.create({
      data: {
        ...item,
        inventoryId
      }
    });
  }

  static async removeItem(itemId: string) {
    return prisma.item.delete({
      where: { id: itemId }
    });
  }

  static async updateItemPosition(itemId: string, position: number) {
    return prisma.item.update({
      where: { id: itemId },
      data: { position }
    });
  }

  static async updateCoins(inventoryId: string, amount: number) {
    return prisma.inventory.update({
      where: { id: inventoryId },
      data: {
        coins: {
          increment: amount
        }
      }
    });
  }
}