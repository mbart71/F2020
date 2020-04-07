import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { SeasonFacade } from '../../season/+state/season.facade';
import { StandingService } from '../service/standing.service';
import { StandingActions } from './standing.actions';

@Injectable()
export class StandingEffects {
  loadStanding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StandingActions.loadStandings),
      switchMap(() => this.seasonFacade.season$),
      concatMap(season => season ? this.service.getStandings(season.id).pipe(
        map(standings => StandingActions.loadStandingsSuccess({ standings })),
        catchError(error => of(StandingActions.loadStandingsFailure({ error }))),
      ) : of(StandingActions.loadStandingsSuccess({ standings: null }))),
    ),
  );

  constructor(private actions$: Actions, private service: StandingService, private seasonFacade: SeasonFacade) {
  }
}
