import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SeasonActions } from './season.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SeasonService } from '../service/season.service';

@Injectable()
export class SeasonEffects {
  loadSeason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonActions.loadSeason),
      concatMap(action => this.service.current$.pipe(
        map(season => SeasonActions.loadSeasonSuccess({season})),
        catchError(error => of(SeasonActions.loadSeasonFailure({ error }))),
      )),
    ),
  );

  constructor(private actions$: Actions, private service: SeasonService) {
  }
}
