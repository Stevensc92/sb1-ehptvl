import { TrainingDummy } from './types';
import { Character, Skill } from '../types';
import { v4 as uuidv4 } from 'uuid';

export interface TrainingCombatState {
  id: string;
  player: Character;
  dummy: TrainingDummy;
  playerHealth: number;
  dummyHealth: number;
  playerChakra: number;
  turn: number;
  logs: string[];
  isFinished: boolean;
  combo: number;
  skillsUsed: Set<string>;
  totalDamageDealt: number;
}

export class TrainingCombatManager {
  private state: TrainingCombatState;

  constructor(player: Character, dummy: TrainingDummy) {
    if (!player || !dummy) {
      throw new Error('Player and dummy are required');
    }

    this.state = {
      id: uuidv4(),
      player,
      dummy,
      playerHealth: player.stats.fortitude,
      dummyHealth: dummy.stats.fortitude,
      playerChakra: player.stats.chakra,
      turn: 1,
      logs: [],
      isFinished: false,
      combo: 0,
      skillsUsed: new Set(),
      totalDamageDealt: 0
    };
  }

  public useSkill(skill: Skill): TrainingCombatState {
    if (this.state.isFinished) return this.state;

    // Vérifier le coût en chakra
    if (this.state.playerChakra < skill.chakraCost) {
      this.state.logs.push("Pas assez de chakra pour utiliser cette technique!");
      return this.state;
    }

    // Consommer le chakra
    this.state.playerChakra -= skill.chakraCost;

    // Calculer et appliquer les dégâts au mannequin
    const damage = this.calculateDamage(skill);
    this.state.dummyHealth -= damage;
    this.state.totalDamageDealt += damage;
    this.state.skillsUsed.add(skill.id);

    // Gérer le combo
    if (skill.comboPoint) {
      this.state.combo++;
      if (this.state.combo >= 3) {
        const bonusDamage = Math.floor(damage * 0.5);
        this.state.dummyHealth -= bonusDamage;
        this.state.totalDamageDealt += bonusDamage;
        this.state.logs.push(`Combo x${this.state.combo}! Dégâts bonus: ${bonusDamage}`);
        this.state.combo = 0;
      }
    } else {
      this.state.combo = 0;
    }

    // Ajouter le log de l'action
    this.state.logs.push(
      `Vous utilisez ${skill.name} et infligez ${damage} dégâts.`
    );

    // Tour du mannequin
    if (this.state.dummyHealth > 0) {
      const dummyDamage = Math.max(
        1,
        Math.floor(this.state.dummy.stats.taijutsu * 1.5)
      );
      this.state.playerHealth -= dummyDamage;
      this.state.logs.push(
        `Le mannequin contre-attaque et inflige ${dummyDamage} dégâts.`
      );
    }

    // Vérifier si le combat est terminé
    if (this.state.dummyHealth <= 0 || this.state.playerHealth <= 0) {
      this.state.isFinished = true;
      if (this.state.dummyHealth <= 0) {
        this.state.logs.push("Victoire! Le mannequin est détruit.");
      } else {
        this.state.logs.push("Défaite! Vous devez vous améliorer.");
      }
    }

    this.state.turn++;
    return { ...this.state };
  }

  private calculateDamage(skill: Skill): number {
    let damage = skill.damage;

    // Ajouter les bonus selon le type de compétence
    switch (skill.type) {
      case "taijutsu":
        damage += this.state.player.stats.taijutsu * 0.5;
        break;
      case "ninjutsu":
        damage += this.state.player.stats.ninjutsu * 0.5;
        break;
      case "genjutsu":
        damage += this.state.player.stats.genjutsu * 0.5;
        break;
    }

    return Math.floor(damage);
  }

  public getState(): TrainingCombatState {
    return { ...this.state };
  }
}