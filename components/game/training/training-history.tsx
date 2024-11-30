"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrainingSession } from "@/lib/game/training/types";
import { TRAINING_DUMMIES } from "@/lib/game/training/constants";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Swords, Clock, Target } from "lucide-react";

interface TrainingHistoryProps {
  sessions: TrainingSession[];
}

export function TrainingHistory({ sessions }: TrainingHistoryProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold mb-4">Historique d'entraînement</h3>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {sessions.map((session) => {
            const dummy = TRAINING_DUMMIES.find(d => d.id === session.dummyId);
            if (!dummy || !session.results) return null;

            return (
              <Card key={session.id} className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{dummy.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(session.endTime || 0, { 
                        addSuffix: true,
                        locale: fr 
                      })}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Swords className="w-4 h-4" />
                    <span>{session.results.damageDealt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{session.results.comboDamage}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {Math.round(
                        (session.endTime! - session.startTime!) / 1000
                      )}s
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}