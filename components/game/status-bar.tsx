"use client";

import { Card } from "@/components/ui/card";
import { useGameState } from "@/hooks/use-game-state";
import { Coins, Scroll, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const { player } = useGameState();

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">0</span>
          </div>
          <div className="flex items-center space-x-2">
            <Scroll className="w-5 h-5 text-blue-500" />
            <span className="font-medium">0</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="font-medium">Level 1</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Additional status indicators will go here */}
        </div>
      </div>
    </Card>
  );
}