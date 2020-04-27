import { createAction, props } from '@ngrx/store';
import { IDriverStanding } from '@f2020/data';

const loadStandings = createAction('[Standing] Load Standing');

const loadStandingsSuccess = createAction(
  '[Standing] Load Standing Success',
  props<{ standings: IDriverStanding[] }>(),
);

const loadStandingsFailure = createAction(
  '[Standing] Load Standing Failure',
  props<{ error: any }>(),
);

export const StandingActions = {
  loadStandings,
  loadStandingsSuccess,
  loadStandingsFailure,
};
