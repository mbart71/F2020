import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromStanding from './standing.reducer';
import * as StandingActions from './standing.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { PlayerActions } from '../../player/+state';
import { of } from 'rxjs';

@Injectable()
export class StandingEffects {
  loadStanding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StandingActions.loadStanding),
      concatMap(action => this.service.player$.pipe(
        map(({ uid, displayName, photoURL, email }) => {
          if (uid) {
            return PlayerActions.loadPlayerSuccess({ player: { uid, displayName, photoURL, email } });
          }
          return PlayerActions.loadPlayerUnauthorized();
        }),
        catchError(error => of(PlayerActions.loadPlayerFailure({ error }))),
      )),
    )
  );

  constructor(private actions$: Actions) {}
}
