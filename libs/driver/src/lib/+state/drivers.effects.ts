import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DriversActions } from './drivers.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DriverService } from '../service/driver.service';

@Injectable({ providedIn: 'root' })
export class DriversEffects {
  loadDrivers = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActions.loadDrivers),
      concatMap(() => this.service.drivers$.pipe(
        map(drivers => DriversActions.loadDriversSuccess({ drivers })),
        catchError(error => of(DriversActions.loadDriversFailure({ error }))),
      )),
    ),
  );

  constructor(private actions$: Actions, private service: DriverService) {
  }
}
