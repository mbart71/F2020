import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';
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
    this.racesFacade.dispatch(RacesActions.loadRaces());
    this.playerFacade.unauthorized$.pipe(
      filter(unauthorized => unauthorized),
    ).subscribe(() => this.router.navigate(['login']));
    this.playerFacade.authorized$.pipe(
      filter(authorized => authorized),
      first(),
    ).subscribe(() => {
      this.seasonFacade.dispatch(SeasonActions.loadSeason());
      this.driverFacade.dispatch(DriversActions.loadDrivers());
    });
  }
}
