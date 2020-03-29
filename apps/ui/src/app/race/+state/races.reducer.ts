import { untilDestroyed } from '@ngneat/until-destroy';
import { IRace, Bid } from '@f2020/data';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { RacesActions } from './races.actions';


export const RACES_FEATURE_KEY = 'races';

export interface State extends EntityState<IRace> {
  currentRace?: IRace;
  previousRace?: IRace;
  selectedId?: string; // which Races record has been selected
  yourBid?: Partial<Bid>;
  bids?: Bid[];
  bid?: Partial<Bid>;
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
  on(
    RacesActions.loadRacesFailure, 
    RacesActions.loadYourBidFailure,
    RacesActions.loadBidsFailure,
    RacesActions.loadBidFailure,
    RacesActions.updateBidFailure,
    (state, { type, error }) => {
      console.error(type, error);
      return { ...state, error: error['message'] ?? error }
    }
  ),
  on(RacesActions.selectRace, (state, { country }) => ({ 
      ...state, 
      selectedId: country,
      bids: null,
      bid: null,
      yourBid: null, 
    })
  ),
  on(RacesActions.loadYourBidSuccess, (state, { bid }) => ({ ...state, yourBid: bid })),
  on(RacesActions.loadBidsSuccess, (state, { bids }) => ({ ...state, bids })),
  on(RacesActions.loadBidSuccess, (state, { bid }) => ({ ...state, bid })),
);

export function reducer(state: State | undefined, action: Action) {
  return racesReducer(state, action);
}
