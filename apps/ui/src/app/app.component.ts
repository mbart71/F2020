import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerActions, PlayerFacade } from './player';
import { filter, first } from 'rxjs/operators';
import { DriverFacade } from './driver/+state/driver.facade';
import { DriverActions } from './driver/+state/driver.actions';
import { SeasonFacade } from './season/+state/season.facade';
import { SeasonActions } from './season/+state/season.actions';
import { RacesFacade } from './race/+state/races.facade';
import { RacesActions } from './race/+state/races.actions';

@Component({
  selector: 'f2020-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private seasonFacade: SeasonFacade,
    private playerFacade: PlayerFacade,
    private driverFacade: DriverFacade,
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
      this.driverFacade.dispatch(DriverActions.loadDrivers());
    });
  }
}
