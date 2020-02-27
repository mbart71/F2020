import { createAction, props } from '@ngrx/store';
import { Player } from '@f2020/data';

const loadPlayer = createAction('[Player] Load Player from player');

const loadPlayerSuccess = createAction(
  '[Player] Load Player Success',
  props<{ player: Player }>(),
);

const loadPlayerUnauthorized = createAction(
  '[Player] Load Player unauthorized',
);

const loadPlayerFailure = createAction(
  '[Player] Load Player Failure',
  props<{ error: any }>(),
);

export const PlayerActions = {
  loadPlayer,
  loadPlayerSuccess,
  loadPlayerFailure,
  loadPlayerUnauthorized,
};
