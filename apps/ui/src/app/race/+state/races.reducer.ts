import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { RacesActions } from './races.actions';
import { IRace } from '@f2020/data';

export const RACES_FEATURE_KEY = 'races';

export interface State extends EntityState<IRace> {
  currentRace?: IRace;
  previousRace?: IRace;
  selectedId?: string; // which Races record has been selected
  loaded: boolean; // has the Races list been loaded
  error?: string | null; // last none error (if any)
}

export interface RacesPartialState {
  readonly [RACES_FEATURE_KEY]: State;
}

export const racesAdapter: EntityAdapter<IRace> = createEntityAdapter<IRace>({
  sortComparer: (a, b) => a.open.toMillis() - b.open.toMillis(),
  selectId: a => a.location.country.toLowerCase(),
});

export const initialState: State = racesAdapter.getInitialState(<State>{
  // set initial required properties
  currentRace: null,
  previousRace: null,
  selectedId: null,
  loaded: false,
});

const racesReducer = createReducer(
  initialState,
  on(RacesActions.loadRaces, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RacesActions.loadRacesSuccess, (state, { races }) =>
    racesAdapter.addAll(races, { ...state, loaded: true }),
  ),
  on(RacesActions.loadRacesFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: State | undefined, action: Action) {
  return racesReducer(state, action);
}
