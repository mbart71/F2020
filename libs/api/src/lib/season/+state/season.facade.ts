import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSeason from './season.reducer';
import * as SeasonSelectors from './season.selectors';
import { filter } from 'rxjs/operators';

@Injectable()
export class SeasonFacade {
  loaded$ = this.store.pipe(select(SeasonSelectors.getSeasonLoaded));
  error$ = this.store.pipe(select(SeasonSelectors.getSeasonError));
  season$ = this.store.pipe(select(SeasonSelectors.getSeason), filter(season => !!season));

  constructor(private store: Store<fromSeason.SeasonPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
