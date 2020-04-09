import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { PlayerActions } from './player.actions';
import { PlayerService } from '../service/player.service';


@Injectable({
  providedIn: 'root',
})
export class PlayerEffects {

  loadPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayer),
      concatMap(() => this.service.player$.pipe(
        map(player => {
          if (player?.uid) {
            return PlayerActions.loadPlayerSuccess({ player });
          }
          return PlayerActions.loadPlayerUnauthorized();
        }),
        catchError(error => of(PlayerActions.loadPlayerFailure({ error }))),
      )),
    ),
  );
  logoutPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.logoutPlayer),
      concatMap(action => this.service.signOut()
        .then(() => PlayerActions.logoutPlayerSuccess())
        .catch(error => PlayerActions.logoutPlayerFailure({ error })),
      ),
    ),
  );

  constructor(private actions$: Actions, private service: PlayerService) {
  }
}
