import { Action, createReducer, on } from '@ngrx/store';

import * as StandingActions from './standing.actions';
import { IDriverStanding } from '@f2020/data';

export const STANDING_FEATURE_KEY = 'standing';

export interface State {
  standing?: IDriverStanding[]
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
  on(StandingActions.loadStanding, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(StandingActions.loadStandingSuccess, (state, { standing }) =>
    ({ ...state, standing, loaded: true }),
  ),
  on(StandingActions.loadStandingFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return standingReducer(state, action);
}
