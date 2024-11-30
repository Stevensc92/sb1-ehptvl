"use client";

import { CombatLog as CombatLogType } from "@/lib/game/combat";
import { cn } from "@/lib/utils";

interface CombatLogProps {
  logs: CombatLogType[];
}

export function CombatLog({ logs }: CombatLogProps) {
  return (
    <div className="space-y-2">
      {logs.map((log, index) => (
        <div
          key={index}
          className={cn(
            "text-sm p-2 rounded",
            log.isStatusEffect && "bg-purple-100 dark:bg-purple-900/20",
            log.isCombo && "bg-orange-100 dark:bg-orange-900/20",
            !log.isStatusEffect && !log.isCombo && "bg-muted"
          )}
        >
          <span className="font-medium">Tour {log.turn}:</span> {log.message}
          {log.damage && (
            <span className="text-red-500 ml-1">(-{log.damage})</span>
          )}
        </div>
      ))}
    </div>
  );
}