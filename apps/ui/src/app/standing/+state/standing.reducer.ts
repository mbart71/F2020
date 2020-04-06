import { Action, createReducer, on } from '@ngrx/store';

import { StandingActions } from './standing.actions';
import { IDriverStanding } from '@f2020/data';

export const STANDING_FEATURE_KEY = 'standing';

export interface State {
  standings?: IDriverStanding[]
  loaded: boolean; // has the Standing list been loaded
  error?: string | null; // last none error (if any)
}

export interface StandingPartialState {
  readonly [STANDING_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
};

const standingReducer = createReducer(
  initialState,
  on(StandingActions.loadStandings, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(StandingActions.loadStandingsSuccess, (state, { standings }) =>
    ({ ...state, standings, loaded: true }),
  ),
  on(StandingActions.loadStandingsFailure, (state, { type, error }) => {
    console.error(type, error);
    return { ...state, error: error['message'] ?? error, updating: false, loaded: false }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return standingReducer(state, action);
}
