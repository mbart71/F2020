import { createAction, props } from '@ngrx/store';

export const loadStanding = createAction('[Standing] Load Standing');

export const loadStandingSuccess = createAction(
  '[Standing] Load Standing Success',
  props<{ standing: StandingEntity[] }>()
);

export const loadStandingFailure = createAction(
  '[Standing] Load Standing Failure',
  props<{ error: any }>()
);
