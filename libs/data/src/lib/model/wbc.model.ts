import { Player } from './player.model';
import { IRace } from './race.model';

export type WBC = WBCResult[];

export interface WBCResult {
  race: IRace;
  players: WBCPlayer[]
}

export interface WBCPlayer {
  points: number;
  player: Player;
}
