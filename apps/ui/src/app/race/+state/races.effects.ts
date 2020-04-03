import { PlayerActions } from './../../player/+state/player.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { combineLatest, of } from 'rxjs';
import { catchError, concatMap, debounceTime, filter, first, map, startWith, switchMap, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { SeasonFacade } from '../../season/+state/season.facade';
import { RacesService } from '../service/races.service';
import { environment } from './../../../environments/environment';
import { PlayerFacade } from './../../player/+state/player.facade';
import { RacesActions } from './races.actions';
import { RacesFacade } from './races.facade';

@Injectable()
export class RacesEffects {
  loadRaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RacesActions.loadRaces),
      fetch({
        run: action => {
          return this.seasonFacade.season$.pipe(
            takeUntil(this.actions$.pipe(ofType(RacesActions.loadRaces, PlayerActions.logoutPlayer))),
            switchMap(season => this.service.getRaces(season.id)),
            map(races => RacesActions.loadRacesSuccess({ races })),
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RacesActions.loadRacesFailure({ error });
        },
      }),
    ),
  );

  loadYourBid$ = createEffect(() => this.actions$.pipe(
    ofType(RacesActions.loadYourBid),
    concatMap(() => combineLatest([
      this.seasonFacade.season$, 
      this.facade.selectedRace$, 
      this.playerFacade.player$
    ]).pipe(
      switchMap(([season, race, player]) => this.service.getBid(season.id, race.location.country, player.uid)),
      startWith(environment.initialBid),
      map(bid => bid || {}),
      map(bid => RacesActions.loadYourBidSuccess({ bid })),
      catchError(error => of(RacesActions.loadYourBidFailure({ error }))),
      takeUntil(this.actions$.pipe(ofType(RacesActions.loadYourBid, PlayerActions.logoutPlayer))),
      ),
    )
  ));


  loadBids$ = createEffect(() => this.actions$.pipe(
    ofType(RacesActions.loadBids),
    concatMap(() => combineLatest([
      this.seasonFacade.season$, 
      this.facade.selectedRace$, 
      this.facade.yourBid$.pipe(map(bid => bid && !!bid.submitted)),
    ]).pipe(
      debounceTime(200),
      switchMap(([season, race, submitted]) => submitted ? this.service.getBids(season.id, race.location.country) : of([])),
      map(bids => RacesActions.loadBidsSuccess({ bids })),
      catchError(error => {
        const permissionError = error.code === 'permission-denied'
        return of(permissionError ? RacesActions.loadBidsSuccess({ bids: [] }) : RacesActions.loadBidsFailure({ error }));
      }),
      takeUntil(this.actions$.pipe(ofType(RacesActions.loadBids, PlayerActions.logoutPlayer))),
    ))
  ));

  loadBid$ = createEffect(() => this.actions$.pipe(
    ofType(RacesActions.loadBid),
    concatMap(({uid}) => combineLatest([
      this.seasonFacade.season$,
      this.facade.selectedRace$,
    ]).pipe(
      debounceTime(200),
      switchMap(([season, race]) => this.service.getBid(season.id, race.location.country, uid)),
      map(bid => RacesActions.loadBidSuccess({bid})),
      catchError( error => of(RacesActions.loadBidFailure({error}))),
      takeUntil(this.actions$.pipe(ofType(RacesActions.loadBid, PlayerActions.logoutPlayer))),
    ))
  ));
  
  loadResult$ = createEffect(() => this.actions$.pipe(
    ofType(RacesActions.loadResult),
    concatMap(() => combineLatest([
      this.seasonFacade.season$,
      this.facade.selectedRace$,
    ]).pipe(
      debounceTime(200),
      switchMap(([season, race]) => this.service.getResult(season.id, race.round)),
      map(result => RacesActions.loadResultSuccess({result})),
      catchError( error => of(RacesActions.loadResultFailure({error}))),
      takeUntil(this.actions$.pipe(ofType(RacesActions.loadResult, PlayerActions.logoutPlayer))),
    ))
  ));
  
  submitBid$ = createEffect(() => this.actions$.pipe(
    ofType(RacesActions.submitBid),
    concatMap(() => this.service.submitBid()
      .then(() => RacesActions.submitBidSuccess())
      .catch(error => RacesActions.submitBidFailure({error}))
    )
  ));

  submitResult$ = createEffect(() => this.actions$.pipe(
    ofType(RacesActions.submitResult),
    concatMap(() => this.service.submitResult()
      .then(() => RacesActions.submitResultSuccess())
      .catch(error => RacesActions.submitResultFailure({error}))
    )
  ));
  
  updateBid$ = createEffect(() => this.actions$.pipe(
    ofType(RacesActions.updateYourBid),
    concatMap(({bid}) => combineLatest([
      this.seasonFacade.season$, 
      this.facade.selectedRace$, 
      this.playerFacade.player$
    ]).pipe(
      first(),
      switchMap(([season, race, player]) => this.service.updateBid(season.id, race.location.country, player, bid)),
      catchError(error => of(RacesActions.updateYourBidFailure({ error }))),
    ))
  ), {dispatch: false});

  constructor(
    private actions$: Actions, 
    private service: RacesService, 
    private facade: RacesFacade,
    private playerFacade: PlayerFacade,
    private seasonFacade: SeasonFacade) {
  }
}
