import { Mission, MissionStatus } from './types';
import { LOCATION_MISSIONS } from './location-missions';
import { generateDailyMissions } from './daily';
import { generateClanMission } from './clan';

export class MissionManager {
  private missions: Mission[] = [];
  private playerLevel: number;
  private completedMissions: Set<string> = new Set();

  constructor(playerLevel: number, completedMissions: string[] = []) {
    this.playerLevel = playerLevel;
    this.completedMissions = new Set(completedMissions);
    this.initializeMissions();
  }

  private initializeMissions() {
    // Ajoute les missions de base
    Object.values(LOCATION_MISSIONS).forEach(locationMissions => {
      locationMissions.forEach(mission => {
        if (this.isMissionAvailable(mission)) {
          this.missions.push(mission);
        }
      });
    });

    // Ajoute les missions quotidiennes
    this.missions.push(...generateDailyMissions(this.playerLevel));
  }

  private isMissionAvailable(mission: Mission): boolean {
    // Vérifie le niveau requis
    if (mission.prerequisites?.level && this.playerLevel < mission.prerequisites.level) {
      return false;
    }

    // Vérifie les missions préalables
    if (mission.prerequisites?.missions) {
      const hasCompletedPrereqs = mission.prerequisites.missions.every(
        missionId => this.completedMissions.has(missionId)
      );
      if (!hasCompletedPrereqs) {
        return false;
      }
    }

    return true;
  }

  public getMissionsForLocation(locationId: string): Mission[] {
    return this.missions.filter(mission => 
      mission.locationId === locationId && 
      mission.status === 'available'
    );
  }

  public updateMissionStatus(missionId: string, status: MissionStatus) {
    const mission = this.missions.find(m => m.id === missionId);
    if (mission) {
      mission.status = status;
      if (status === 'completed') {
        this.completedMissions.add(missionId);
      }
    }
  }

  public updateObjectiveProgress(missionId: string, objectiveId: string, progress: number) {
    const mission = this.missions.find(m => m.id === missionId);
    if (mission) {
      const objective = mission.objectives.find(o => o.id === objectiveId);
      if (objective) {
        objective.current = Math.min(objective.required, objective.current + progress);
      }
    }
  }

  public checkMissionCompletion(missionId: string): boolean {
    const mission = this.missions.find(m => m.id === missionId);
    if (!mission) return false;

    return mission.objectives.every(obj => obj.current >= obj.required);
  }
}