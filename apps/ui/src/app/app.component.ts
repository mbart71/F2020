import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerActions, PlayerFacade } from './player';
import { filter, first } from 'rxjs/operators';
import { DriverFacade } from './driver/+state/driver.facade';
import { DriverActions } from './driver/+state/driver.actions';

@Component({
  selector: 'f2020-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private facade: PlayerFacade, private driverFacade: DriverFacade, private router: Router) {

  }

  ngOnInit() {
    this.facade.dispatch(PlayerActions.loadPlayer());
    this.facade.unauthorized$.pipe(
      filter(unauthorized => unauthorized),
    ).subscribe(() => this.router.navigate(['login']));
    this.facade.authorized$.pipe(
      filter(authorized => authorized),
      first(),
    ).subscribe(() => this.driverFacade.dispatch(DriverActions.loadDrivers()));
  }

  signOut() {
    this.facade.dispatch(PlayerActions.logoutPlayer());
  }

}
