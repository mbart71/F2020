import { createAction, props } from '@ngrx/store';
import { ISeason } from '@f2020/data';

const loadSeason = createAction('[Season] Load Season');

const loadSeasonSuccess = createAction(
  '[Season] Load Season Success',
  props<{ season: ISeason }>(),
);

const loadSeasonFailure = createAction(
  '[Season] Load Season Failure',
  props<{ error: any }>(),
);

export const SeasonActions = {
  loadSeason,
  loadSeasonSuccess,
  loadSeasonFailure,
};
