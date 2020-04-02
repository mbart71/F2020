import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromRaces from './races.reducer';
import * as RacesSelectors from './races.selectors';

@Injectable()
export class RacesFacade {
  loaded$ = this.store.pipe(select(RacesSelectors.getRacesLoaded));
  updating$ = this.store.pipe(select(RacesSelectors.getUpdating));
  allRaces$ = this.store.pipe(select(RacesSelectors.getAllRaces));
  selectedRace$ = this.store.pipe(select(RacesSelectors.getSelected), filter(race => !!race));
  yourBid$ = this.store.pipe(select(RacesSelectors.getYourBid));
  bids$ = this.store.pipe(select(RacesSelectors.getBids));
  bid$ = this.store.pipe(select(RacesSelectors.getBid));

  constructor(private store: Store<fromRaces.RacesPartialState>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
