"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameState } from "@/hooks/use-game-state";
import { InventorySlot } from "./inventory-slot";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

export function InventoryGrid() {
  const { inventory, moveItem } = useGameState();
  const slots = inventory.slots;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      moveItem(Number(active.id), Number(over.id));
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold mb-4">Inventaire</h3>
      <ScrollArea className="h-[400px]">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={slots.map((s) => s.position)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: inventory.maxSlots }).map((_, index) => {
                const slot = slots.find((s) => s.position === index);
                return <InventorySlot key={index} position={index} slot={slot} />;
              })}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>
    </Card>
  );
}