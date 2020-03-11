import { createAction, props } from '@ngrx/store';
import { IRace } from '@f2020/data';

const loadRaces = createAction('[Races] Load Races');

const loadRacesSuccess = createAction(
  '[Races] Load Races Success',
  props<{ races: IRace[] }>(),
);

const loadRacesFailure = createAction(
  '[Races] Load Races Failure',
  props<{ error: any }>(),
);

export const RacesActions = {
  loadRaces,
  loadRacesSuccess,
  loadRacesFailure,
};

