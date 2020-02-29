import { createAction, props } from '@ngrx/store';
import { IDriver } from '@f2020/data';

const loadDrivers = createAction('[Driver] Load Drivers');

const loadDriversSuccess = createAction(
  '[Driver] Load Drivers Success',
  props<{ drivers: IDriver[] }>()
);

const loadDriversFailure = createAction(
  '[Driver] Load Drivers Failure',
  props<{ error: any }>()
);

export const DriverActions = {
  loadDrivers,
  loadDriversSuccess,
  loadDriversFailure ,
}
