import { Player } from './player.model';
import { IRace } from './race.model';

export interface WBCPlayers {
  race: IRace;
  players: WBCPlayer[]
}

export interface WBCPlayer {
  points: number;
  player: Player;
}

export interface WBCRace {
  points: number;
  race: IRace;
}
