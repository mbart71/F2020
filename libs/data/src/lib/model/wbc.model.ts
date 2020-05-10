import { Player } from './player.model';

export type WBC = WBCResult[];

export interface WBCResult {
  raceName: string;
  players: WBCPlayer[]
}

export interface WBCPlayer {
  points: number;
  player: Player;
}
