import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromDriver from './drivers.reducer';
import * as DriverSelectors from './drivers.selectors';

@Injectable({ providedIn: 'root' })
export class DriversFacade {
  loaded$ = this.store.pipe(select(DriverSelectors.getDriversLoaded));
  allDriver$ = this.store.pipe(select(DriverSelectors.getAllDriver));
  error$ = this.store.pipe(select(DriverSelectors.getDriversError));

  constructor(private store: Store<fromDriver.DriversPartialState>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
