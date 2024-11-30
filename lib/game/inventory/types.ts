import { CharacterStats } from "../types";

export type ItemType = "headband" | "cloak" | "outfit" | "gloves" | "shoes" | "consumable" | "material";
export type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  stats?: Partial<CharacterStats>;
  stackable: boolean;
  quantity: number;
  value: number;
  usable?: boolean;
  onUse?: () => void;
}

export interface InventorySlot {
  item: InventoryItem;
  position: number;
}

export interface InventoryState {
  maxSlots: number;
  slots: InventorySlot[];
  coins: number;
}