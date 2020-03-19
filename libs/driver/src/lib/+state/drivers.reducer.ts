import { Action, createReducer, on } from '@ngrx/store';

import { DriversActions } from './drivers.actions';
import { IDriver } from '@f2020/data';

export const DRIVERS_FEATURE_KEY = 'drivers';

export interface State {
  drivers?: IDriver[],
  loaded: boolean; // has the Driver list been loaded
  error?: string | null; // last none error (if any)
}

export interface DriversPartialState {
  readonly [DRIVERS_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
};

const driversReducer = createReducer(
  initialState,
  on(DriversActions.loadDrivers, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DriversActions.loadDriversSuccess, (state, { drivers }) => ({ ...state, loaded: true, drivers })),
  on(DriversActions.loadDriversFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: State | undefined, action: Action) {
  return driversReducer(state, action);
}
