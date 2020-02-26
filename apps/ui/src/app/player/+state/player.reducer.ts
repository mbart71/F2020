import { Action, createReducer, on } from '@ngrx/store';
import { PlayerActions } from './player.actions';
import { Player } from './player.models';


export const PLAYER_FEATURE_KEY = 'player';

export interface State {
  player?: Player;
  unathorized: boolean;
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export interface PlayerPartialState {
  readonly [PLAYER_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
  loading: false,
  unathorized: false,
};

const playerReducer = createReducer(
  initialState,
  on(PlayerActions.loadPlayer, state => ({ ...state, loading: true, loaded: false, error: null })),
  on(PlayerActions.loadPlayerSuccess, (state, { player }) => 
    ({ ...state, loading: false, loaded: true, unathorized: false, player })
  ),
  on(PlayerActions.loadPlayerUnauthorized, state => ({ ...state, unathorized: true, loading: false })),
  on(PlayerActions.loadPlayerFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return playerReducer(state, action);
}
