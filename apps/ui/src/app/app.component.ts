import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { RacesActions, RacesFacade, SeasonActions, SeasonFacade } from '@f2020/api';
import { DriversActions, DriversFacade } from '@f2020/driver';
import { PlayerActions, PlayerFacade } from '@f2020/player';
import { truthy } from '@f2020/tools';
import { filter, first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'f2020-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor(

    private seasonFacade: SeasonFacade,
    private playerFacade: PlayerFacade,
    private driverFacade: DriversFacade,
    private racesFacade: RacesFacade,
    private updates: SwUpdate,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit() {
    this.playerFacade.dispatch(PlayerActions.loadPlayer());
    this.playerFacade.unauthorized$.pipe(
      truthy(),
    ).subscribe(() => this.router.navigate(['login']));
    this.playerFacade.authorized$.pipe(
      filter(authorized => authorized),
      switchMap(() => this.playerFacade.player$),
      first(),
    ).subscribe(player => {
      if (player.roles && player.roles.includes('player')) {
        this.seasonFacade.dispatch(SeasonActions.loadSeason());
        this.racesFacade.dispatch(RacesActions.loadRaces());
        this.driverFacade.dispatch(DriversActions.loadDrivers());
      } else {
        this.router.navigate(['info', 'roles'])
      }
    });
    this.updates.available.pipe(
      switchMap(() => this.snackBar.open('Ny version klar', "OPDATER", { duration: 5000 }).onAction()),
      switchMap(() => this.updates.activateUpdate()),
      first(),
    ).subscribe(() => location.reload());
  }
}
