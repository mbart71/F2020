import { truthy } from '@f2020/tools';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, first, switchMap } from 'rxjs/operators';
import { DriversActions, DriversFacade } from '@f2020/driver';
import { PlayerFacade, PlayerActions } from '@f2020/player';
import { RacesFacade, RacesActions, SeasonFacade, SeasonActions } from '@f2020/api';

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
  }
}
