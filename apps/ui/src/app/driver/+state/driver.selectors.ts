import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DRIVER_FEATURE_KEY, DriverPartialState, State } from './driver.reducer';

// Lookup the 'Driver' feature state managed by NgRx
export const getDriversState = createFeatureSelector<DriverPartialState, State>(
  DRIVER_FEATURE_KEY
);

export const getDriversLoaded = createSelector(
  getDriversState,
  (state: State) => state.loaded
);

export const getDriversError = createSelector(
  getDriversState,
  (state: State) => state.error
);

export const getAllDriver = createSelector(
  getDriversState,
  (state: State) => state.drivers
);
