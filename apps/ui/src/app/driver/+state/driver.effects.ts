import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DriverActions } from './driver.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DriverService } from '../service/driver.service';

@Injectable()
export class DriverEffects {
  loadDrivers = createEffect(() =>
    this.actions$.pipe(
      ofType(DriverActions.loadDrivers),
      concatMap(action => this.service.drivers$.pipe(
        map(drivers => DriverActions.loadDriversSuccess({ drivers })),
        catchError(error => of(DriverActions.loadDriversFailure({ error }))),
      )),
    ),
  );

  constructor(private actions$: Actions, private service: DriverService) {
  }
}
