"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ITEM_TYPE_LABELS, RARITY_BACKGROUNDS, RARITY_COLORS } from "@/lib/game/inventory/constants";
import { InventorySlot as InventorySlotType } from "@/lib/game/inventory/types";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface InventorySlotProps {
  position: number;
  slot?: InventorySlotType;
}

export function InventorySlot({ position, slot }: InventorySlotProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: position.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!slot) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-12 h-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
      />
    );
  }

  const { item } = slot;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            variant="outline"
            className={cn(
              "w-12 h-12 p-0 relative",
              RARITY_BACKGROUNDS[item.rarity]
            )}
          >
            {item.stackable && item.quantity > 1 && (
              <span className="absolute bottom-0 right-0 text-xs bg-black/50 text-white px-1 rounded-tl">
                {item.quantity}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className={cn("font-medium", RARITY_COLORS[item.rarity])}>
              {item.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {ITEM_TYPE_LABELS[item.type]}
            </p>
            <p className="text-sm">{item.description}</p>
            {item.stats && (
              <div className="text-sm space-y-1">
                {Object.entries(item.stats).map(([stat, value]) => (
                  <p key={stat} className="text-blue-500">
                    {stat}: +{value}
                  </p>
                ))}
              </div>
            )}
            <p className="text-sm text-yellow-500">{item.value} pièces</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}