import { 
  ProgressionState, 
  LevelUpReward, 
  Skill,
  StatType 
} from './types';
import { 
  EXPERIENCE_TABLE, 
  LEVEL_UP_REWARDS,
  SKILL_TREES 
} from './constants';
import { Character } from '../types';

export class ProgressionManager {
  private state: ProgressionState;
  private character: Character;

  constructor(character: Character) {
    this.character = character;
    this.state = {
      level: character.level,
      experience: character.experience,
      skillPoints: 0,
      unlockedSkills: [],
      masteredSkills: []
    };
  }

  public addExperience(amount: number): {
    leveledUp: boolean;
    newLevel?: number;
    rewards?: LevelUpReward;
  } {
    const oldLevel = this.state.level;
    this.state.experience += amount;

    // Vérifier si le niveau augmente
    while (
      this.state.level < EXPERIENCE_TABLE.length &&
      this.state.experience >= EXPERIENCE_TABLE[this.state.level]
    ) {
      this.state.level++;
    }

    if (this.state.level > oldLevel) {
      const rewards = LEVEL_UP_REWARDS[this.state.level];
      if (rewards) {
        this.applyLevelUpRewards(rewards);
      }
      return {
        leveledUp: true,
        newLevel: this.state.level,
        rewards
      };
    }

    return { leveledUp: false };
  }

  private applyLevelUpRewards(rewards: LevelUpReward) {
    // Appliquer les bonus de stats
    if (rewards.stats) {
      Object.entries(rewards.stats).forEach(([stat, value]) => {
        this.character.stats[stat as StatType] += value;
      });
    }

    // Ajouter les points de compétence
    this.state.skillPoints += rewards.skillPoints;

    // Débloquer les nouvelles compétences
    if (rewards.newSkills) {
      this.state.unlockedSkills.push(...rewards.newSkills);
    }
  }

  public canLearnSkill(skillId: string): boolean {
    const skill = this.findSkill(skillId);
    if (!skill) return false;

    return (
      this.state.level >= skill.requirements.level &&
      this.state.skillPoints >= skill.requirements.skillPoints &&
      (!skill.requirements.prerequisites ||
        skill.requirements.prerequisites.every(prereq =>
          this.state.masteredSkills.includes(prereq)
        ))
    );
  }

  public learnSkill(skillId: string): boolean {
    if (!this.canLearnSkill(skillId)) return false;

    const skill = this.findSkill(skillId);
    if (!skill) return false;

    this.state.skillPoints -= skill.requirements.skillPoints;
    this.state.masteredSkills.push(skillId);

    // Appliquer les bonus passifs
    if (skill.type === 'passive' && skill.effects.statBonus) {
      Object.entries(skill.effects.statBonus).forEach(([stat, value]) => {
        this.character.stats[stat as StatType] += value;
      });
    }

    return true;
  }

  private findSkill(skillId: string): Skill | undefined {
    for (const tree of SKILL_TREES) {
      const skill = tree.skills.find(s => s.id === skillId);
      if (skill) return skill;
    }
    return undefined;
  }

  public getState(): ProgressionState {
    return { ...this.state };
  }

  public getAvailableSkillTrees(): typeof SKILL_TREES {
    return SKILL_TREES.filter(tree => 
      !tree.requirements ||
      (!tree.requirements.level || this.state.level >= tree.requirements.level) &&
      (!tree.requirements.skills || 
        tree.requirements.skills.every(skill => 
          this.state.masteredSkills.includes(skill)
        ))
    );
  }
}