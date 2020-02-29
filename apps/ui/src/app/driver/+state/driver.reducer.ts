import { Action, createReducer, on } from '@ngrx/store';

import { DriverActions } from './driver.actions';
import { IDriver } from '@f2020/data';

export const DRIVER_FEATURE_KEY = 'driver';

export interface State {
  drivers?: IDriver[],
  selectedId?: string | number; // which Driver record has been selected
  loaded: boolean; // has the Driver list been loaded
  error?: string | null; // last none error (if any)
}

export interface DriverPartialState {
  readonly [DRIVER_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
};

const driverReducer = createReducer(
  initialState,
  on(DriverActions.loadDrivers, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DriverActions.loadDriversSuccess, (state, { drivers }) => ({ ...state, loaded: true, drivers })),
  on(DriverActions.loadDriversFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: State | undefined, action: Action) {
  return driverReducer(state, action);
}
