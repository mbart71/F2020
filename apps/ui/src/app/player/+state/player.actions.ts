import { createAction, props } from '@ngrx/store';
import { Player } from './player.models';

const loadPlayer = createAction('[Player] Load Player from player');

const loadPlayerSuccess = createAction(
  '[Player] Load Player Success',
  props<{ player: Player }>()
);

const loadPlayerUnauthorized = createAction(
  '[Player] Load Player uauthorized',
);

const loadPlayerFailure = createAction(
  '[Player] Load Player Failure',
  props<{ error: any }>()
);

export const PlayerActions = {
  loadPlayer,
  loadPlayerSuccess,
  loadPlayerFailure,
  loadPlayerUnauthorized,
}
