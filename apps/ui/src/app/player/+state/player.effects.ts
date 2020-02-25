import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AuthenticationService } from '../../firebase';
import { PlayerActions } from './player.actions';


@Injectable({
  providedIn: 'root'
})
export class PlayerEffects {
  
  constructor(private actions$: Actions, private service: AuthenticationService) {}
  
  // loadPlayer$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PlayerActions.loadPlayer),
  //     concatMap(action => this.service.player$.pipe(
  //       map(player => {
  //         if (player) {
  //           return PlayerActions.loadPlayerSuccess({player});
  //         }
  //         return PlayerActions.loadPlayerUnauthorized();
  //       }),
  //       catchError(error => of(PlayerActions.loadPlayerFailure({error})))
  //     ))    
  //   )
  // );
}

// of(PlayerActions.loadPlayerSuccess({player: null}))
