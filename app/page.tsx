"use client";

import { GameDashboard } from "@/components/game/dashboard";
import { GameProvider } from "@/components/providers/game-provider";

export default function Home() {
  return (
    <GameProvider>
      <main className="min-h-screen bg-background">
        <GameDashboard />
      </main>
    </GameProvider>
  );
}