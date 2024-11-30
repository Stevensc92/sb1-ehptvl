import { TrainingSession, TrainingDummy } from './types';
import { TRAINING_DUMMIES } from './constants';
import { v4 as uuidv4 } from 'uuid';

export class TrainingManager {
  private sessions: TrainingSession[] = [];
  private dailyTrainingCount: number = 0;
  private lastTrainingReset: Date = new Date();

  constructor() {
    this.checkDailyReset();
  }

  private checkDailyReset() {
    const now = new Date();
    if (now.getDate() !== this.lastTrainingReset.getDate()) {
      this.dailyTrainingCount = 0;
      this.lastTrainingReset = now;
    }
  }

  public startTrainingSession(dummyId: string, type: TrainingSession['type']): TrainingSession {
    this.checkDailyReset();

    if (this.dailyTrainingCount >= 10) {
      throw new Error('Limite quotidienne d\'entraînement atteinte');
    }

    const dummy = TRAINING_DUMMIES.find(d => d.id === dummyId);
    if (!dummy) {
      throw new Error('Mannequin d\'entraînement non trouvé');
    }

    const session: TrainingSession = {
      id: uuidv4(),
      type,
      dummyId,
      status: 'in_progress',
      startTime: Date.now(),
      results: {
        damageDealt: 0,
        damageReceived: 0,
        skillsUsed: [],
        comboDamage: 0
      }
    };

    this.sessions.push(session);
    this.dailyTrainingCount++;

    return session;
  }

  public completeTrainingSession(sessionId: string, results: TrainingSession['results']) {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) {
      throw new Error('Session d\'entraînement non trouvée');
    }

    session.status = 'completed';
    session.endTime = Date.now();
    session.results = results;

    return session;
  }

  public getTrainingHistory(): TrainingSession[] {
    return this.sessions
      .filter(session => session.status === 'completed')
      .sort((a, b) => (b.endTime || 0) - (a.endTime || 0));
  }

  public getDailyProgress(): {
    completed: number;
    remaining: number;
    totalPossible: number;
  } {
    this.checkDailyReset();
    return {
      completed: this.dailyTrainingCount,
      remaining: 10 - this.dailyTrainingCount,
      totalPossible: 10
    };
  }
}