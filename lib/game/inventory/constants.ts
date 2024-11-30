import { ItemRarity, ItemType } from "./types";

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: "text-gray-500",
  uncommon: "text-green-500",
  rare: "text-blue-500",
  epic: "text-purple-500",
  legendary: "text-orange-500",
};

export const RARITY_BACKGROUNDS: Record<ItemRarity, string> = {
  common: "bg-gray-100 dark:bg-gray-800",
  uncommon: "bg-green-100 dark:bg-green-900",
  rare: "bg-blue-100 dark:bg-blue-900",
  epic: "bg-purple-100 dark:bg-purple-900",
  legendary: "bg-orange-100 dark:bg-orange-900",
};

export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  headband: "Bandeau",
  cloak: "Cape",
  outfit: "Tenue",
  gloves: "Gants",
  shoes: "Chaussures",
  consumable: "Consommable",
  material: "Matériau",
};