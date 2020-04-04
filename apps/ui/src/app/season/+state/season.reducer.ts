import { Action, createReducer, on } from '@ngrx/store';

import { SeasonActions } from './season.actions';
import { ISeason } from '@f2020/data';

export const SEASON_FEATURE_KEY = 'season';

export interface State {
  season?: ISeason;
  loaded: boolean; // has the Season list been loaded
  error?: string | null; // last none error (if any)
}

export interface SeasonPartialState {
  readonly [SEASON_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
};

const seasonReducer = createReducer(
  initialState,
  on(SeasonActions.loadSeason, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SeasonActions.loadSeasonSuccess, (state, { season }) =>
    ({ ...state, season, loaded: true }),
  ),
  on(SeasonActions.loadSeasonFailure, (state, { type, error }) => {
    console.error(type, error);
    return { ...state, error: error['message'] ?? error, updating: false, loaded: false }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return seasonReducer(state, action);
}
