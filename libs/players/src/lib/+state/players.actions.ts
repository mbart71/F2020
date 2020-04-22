import { Player } from '@f2020/data';
import { createAction, props } from "@ngrx/store";

const loadPlayers = createAction("[Players] Load Players");

const loadPlayersSuccess = createAction(
  "[Players] Load Players Success",
  props<{ players: Player[] }>()
);

const loadPlayersFailure = createAction(
  "[Players] Load Players Failure",
  props<{ error: any }>()
);

export const PlayersActions = {
  loadPlayers,
  loadPlayersSuccess,
  loadPlayersFailure
};
