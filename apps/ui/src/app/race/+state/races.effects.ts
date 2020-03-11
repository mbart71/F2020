import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {RacesActions} from './races.actions';
import { RacesService } from '../service/races.service';
import { SeasonFacade } from '../../season/+state/season.facade';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Injectable()
export class RacesEffects {
  loadRaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RacesActions.loadRaces),
      fetch({
        run: action => {
          return this.seasonFacade.season$.pipe(
            takeUntil(this.actions$.pipe(ofType(RacesActions.loadRaces))),
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

  constructor(private actions$: Actions, private service: RacesService, private seasonFacade: SeasonFacade) {
  }
}
