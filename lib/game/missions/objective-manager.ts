import { MissionObjective } from './types';

export class ObjectiveManager {
  private objectives: Map<string, MissionObjective[]> = new Map();

  public addObjective(missionId: string, objective: MissionObjective) {
    if (!this.objectives.has(missionId)) {
      this.objectives.set(missionId, []);
    }
    this.objectives.get(missionId)!.push(objective);
  }

  public updateProgress(missionId: string, objectiveType: string, target: string, amount: number = 1) {
    const missionObjectives = this.objectives.get(missionId);
    if (!missionObjectives) return false;

    let updated = false;
    missionObjectives.forEach(objective => {
      if (objective.type === objectiveType && objective.target === target) {
        objective.current = Math.min(objective.required, objective.current + amount);
        updated = true;
      }
    });

    return updated;
  }

  public checkCompletion(missionId: string): boolean {
    const objectives = this.objectives.get(missionId);
    if (!objectives) return false;

    return objectives.every(obj => obj.current >= obj.required);
  }

  public getObjectives(missionId: string): MissionObjective[] {
    return this.objectives.get(missionId) || [];
  }

  public handleTrainingCompletion(results: {
    victory: boolean;
    damageDealt: number;
    skillsUsed: string[];
    combos: number;
  }) {
    this.objectives.forEach((objectives, missionId) => {
      objectives.forEach(objective => {
        if (objective.type === 'train' && results.victory) {
          this.updateProgress(missionId, 'train', objective.target);
        }
        if (objective.type === 'defeat' && objective.target === 'training_dummy' && results.victory) {
          this.updateProgress(missionId, 'defeat', 'training_dummy');
        }
      });
    });
  }
}