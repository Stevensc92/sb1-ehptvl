import { v4 as uuidv4 } from "uuid";
import { InventoryItem, InventorySlot, InventoryState } from "./types";

export class InventoryManager {
  private state: InventoryState;

  constructor(maxSlots: number = 20) {
    this.state = {
      maxSlots,
      slots: [],
      coins: 0,
    };
  }

  public getState(): InventoryState {
    return this.state;
  }

  public addItem(item: Omit<InventoryItem, "id" | "quantity">): boolean {
    const newItem: InventoryItem = {
      ...item,
      id: uuidv4(),
      quantity: 1,
    };

    if (item.stackable) {
      const existingSlot = this.state.slots.find(
        (slot) => slot.item.name === item.name
      );

      if (existingSlot) {
        existingSlot.item.quantity++;
        return true;
      }
    }

    if (this.state.slots.length >= this.state.maxSlots) {
      return false;
    }

    const newSlot: InventorySlot = {
      item: newItem,
      position: this.getNextAvailablePosition(),
    };

    this.state.slots.push(newSlot);
    return true;
  }

  public removeItem(itemId: string, quantity: number = 1): boolean {
    const slotIndex = this.state.slots.findIndex(
      (slot) => slot.item.id === itemId
    );

    if (slotIndex === -1) return false;

    const slot = this.state.slots[slotIndex];

    if (slot.item.quantity > quantity) {
      slot.item.quantity -= quantity;
      return true;
    }

    this.state.slots.splice(slotIndex, 1);
    return true;
  }

  public moveItem(fromPosition: number, toPosition: number): boolean {
    if (
      fromPosition < 0 ||
      fromPosition >= this.state.maxSlots ||
      toPosition < 0 ||
      toPosition >= this.state.maxSlots
    ) {
      return false;
    }

    const fromSlotIndex = this.state.slots.findIndex(
      (slot) => slot.position === fromPosition
    );
    const toSlotIndex = this.state.slots.findIndex(
      (slot) => slot.position === toPosition
    );

    if (fromSlotIndex === -1) return false;

    const fromSlot = this.state.slots[fromSlotIndex];
    
    if (toSlotIndex === -1) {
      fromSlot.position = toPosition;
      return true;
    }

    const toSlot = this.state.slots[toSlotIndex];
    toSlot.position = fromPosition;
    fromSlot.position = toPosition;

    return true;
  }

  public useItem(itemId: string): boolean {
    const slot = this.state.slots.find((slot) => slot.item.id === itemId);

    if (!slot || !slot.item.usable || !slot.item.onUse) {
      return false;
    }

    slot.item.onUse();
    return this.removeItem(itemId, 1);
  }

  private getNextAvailablePosition(): number {
    const positions = new Set(this.state.slots.map((slot) => slot.position));
    let position = 0;

    while (positions.has(position)) {
      position++;
    }

    return position;
  }
}