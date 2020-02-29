import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDriver from './driver.reducer';
import * as DriverSelectors from './driver.selectors';

@Injectable({providedIn: 'root'})
export class DriverFacade {
  loaded$ = this.store.pipe(select(DriverSelectors.getDriversLoaded));
  allDriver$ = this.store.pipe(select(DriverSelectors.getAllDriver));
  error$ = this.store.pipe(select(DriverSelectors.getDriversError));

  constructor(private store: Store<fromDriver.DriverPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
